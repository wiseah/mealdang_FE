import styled from "styled-components";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrivacyTermsModal from './PrivacyTermsModal';
import SubmitButton from "../../components/SubmitButton";
import join from '../../APIs/post/join';
import postNicknameCheck from '../../APIs/post/postNicknameCheck';
import postIdCheck from '../../APIs/post/postIdCheck';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
`

const Title = styled.h2`
  font-family: 'WavvePADO-Regular';
  font-size: 30px;
  text-align: center;
  margin: 11px 0 25px 0;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const FormItem = styled.div`
  margin-bottom: 41px;
`

const ItemLabel = styled.label`
  font-family: 'WavvePADO-Regular';
  font-size: 25px;
  color: #737373;
`

const RequireSpan = styled.span`
  color: red;
`

const InputDiv = styled.div`
  position: relative;
  align-items: center;
`

const InputField = styled.input`
  width: 350px;
  height: 56px;
  border: 1px solid #737373;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px #B7B7B7;
  margin: 8px 0;
  font-size: 20px;
  font-weight: 400;
  font-family: 'WavvePADO-Regular';
  padding-left: 20px;

  &::placeholder {
      font-size: 20px;
      color: #B8B8B8;
      margin-left: 150px;
    }
`

const Explanation = styled.div`
  font-size: 13px;
  font-family: 'WavvePADO-Regular';
  color: #737373;
`

const CheckButton = styled.button`
  position: absolute;
  top: 22px;
  right: 12px;
  width: 60px;
  height: 28px;
  border: none;
  background-color: #6A0DAD;
  color: white;
  font-size: 12px;
  border-radius: 8px;
  cursor: pointer;
`;

const Message = styled.div`
  width: 330px;
  font-size: 12px;
  margin: 5px 0 0 10px;
  color: #6A0DAD;
`;

const AgreeLabel = styled.label`
  font-family: 'WavvePADO-Regular';
  font-size: 20px;
  font-weight: 400;
  color: #737373;
  cursor: pointer;
`

const AgreeInfo = styled.input`
  align-items: center;
  justify-content: center;
  font-size: 18px;
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #737373;
  border-radius: 4px;
  vertical-align: middle;
  margin: 0 10px 2px 0;
  cursor: pointer;

  &:checked {
    background-color: #737373;

    &::before {
      content: '\u2713';
      display: block;
      text-align: center;
      line-height: 20px;
      color: white;
      font-size: 25px;
    }
  }
`;


const Join = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [nicknameError, setNicknameError] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [passwordValid, setPasswordValid] = useState(false);

  const [agree, setAgree] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);


  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  }

  const handleNicknameBlur = () => {
    if (!nickname) {
      setNicknameError('닉네임을 입력해주세요.');
    } else {
      setNicknameError('');
    }
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  }

  const handleIdBlur = () => {
    if (!id) {
      setIdError('아이디를 입력해주세요.');
    } else {
      setIdError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const regex = /^(?=.*[a-zA-Z\d])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecialChar = /[@$!%*?&]/.test(value);

    if ((hasUpperCase + hasLowerCase + hasDigit + hasSpecialChar >= 2) && value.length >= 10) {
      setPasswordValid(true);
      setPasswordError('');
    } else {
      setPasswordValid(false);
      setPasswordError('대/소문자, 숫자, 특수문자 중 2가지 이상의 조합으로 10자 이상 입력하세요.');
    }
  }

  const handlePasswordBlur = () => {
    if (password && !passwordValid) {
      setPasswordError('비밀번호를 조건에 맞게 다시 설정해주세요.');
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailBlur = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('올바른 이메일 형식을 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  const handleAgree = (e) => {
    setAgree(e.target.checked);
  };


  const handleJoin = async (e) => {
    e.preventDefault();


    try {

      const response = await join(nickname, id, password, email)
      console.log(response)
      console.log('회원가입이 완료되었습니다.');
      navigate('/joinsuccess');

      if (!nickname) {
        setNicknameError('닉네임을 입력해주세요.');
        return;
      }
      if (!id) {
        setIdError('아이디를 입력해주세요.');
        return;
      }
      if (!password || !passwordValid) {
        setPasswordError('대문자/소문자, 특수기호, 숫자 중 최소 두 가지를 포함하여 10자 이상 입력해주세요.');
        return;
      }
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        setEmailError('올바른 이메일 형식을 입력해주세요.');
        return;
      }
      if (!agree) {
        alert('개인정보 수집 및 이용에 동의해주세요.');
        setModalOpen(true); // 개인정보 수집 동의 안되어있으면 모달 열기
        return;
      }

      // const response = await join(nickname, member_id, password, email)
      // console.log(response)
      // console.log('회원가입이 완료되었습니다.');
      // navigate('/joinsuccess');

    } catch {
        alert('회원가입에 실패했습니다.')
      }
  };


  // 닉네임 중복 체크 
  const handleNicknameCheck = async () => {
    try {
      const response = await postNicknameCheck(nickname)
      console.log(response)

      if (response.message === "사용할 수 있는 닉네임입니다.") {
        setNicknameError('사용할 수 있는 닉네임입니다.');
      } else {
        setNicknameError('이 닉네임은 사용하실 수 없어요. 다른 닉네임을 입력해주세요.');
      }
    } catch (error) {
      console.error('닉네임 중복 체크 요청 실패:', error);
      setNicknameError('닉네임 중복 체크를 할 수 없습니다.');
    }
  };


  // 아이디 중복 체크
  const handleIdCheck = async () => {
    try {
      const response = await postIdCheck(id)
      console.log(response)

      if (response.message === "사용할 수 있는 아이디입니다.") {
        setIdError('사용할 수 있는 아이디입니다.');
      } else {
        setIdError('이 아이디는 사용하실 수 없어요. 다른 아이디를 입력해주세요.');
      }
    } catch (error) {
      console.error('아이디 중복 체크 요청 실패:', error);
      setIdError('아이디 중복 체크를 할 수 없습니다.');
    }
  };



  const handlePrivacyAgree = () => {
    setAgree(true);
    setModalOpen(false);
  };

  const handleModalClose = () => {
    setAgree(false);
    setModalOpen(false); // 동의 안하고 모달 닫기
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };


  return (
    <Container>
      <Title>회원가입</Title>
      <Form >
        <FormItem>
          <ItemLabel htmlFor='nickname'>닉네임<RequireSpan>*</RequireSpan></ItemLabel>
          <InputDiv>
            <InputField
              type='text'
              id='nickname'
              value={nickname}
              onChange={handleNicknameChange}
              onBlur={handleNicknameBlur}
              placeholder="닉네임"
              required />
            <CheckButton onClick={handleNicknameCheck}>중복 확인</CheckButton>
            {nicknameError && <Message>{nicknameError}</Message>}
          </InputDiv>
        </FormItem>
        <FormItem>
          <ItemLabel htmlFor='id'>아이디<RequireSpan>*</RequireSpan></ItemLabel>
          <InputDiv>
            <InputField
              type='text'
              id='id'
              value={id}
              onChange={handleIdChange}
              onBlur={handleIdBlur}
              placeholder="아이디"
              required />
            <CheckButton onClick={handleIdCheck}>중복 확인</CheckButton>
            {idError && <Message>{idError}</Message>}
          </InputDiv>
        </FormItem>
        <FormItem>
          <ItemLabel htmlFor='password'>비밀번호<RequireSpan>*</RequireSpan></ItemLabel>
          <Explanation>대/소문자, 숫자, 특수문자 중 2가지 이상의 조합으로 10자 이상</Explanation>
          <InputDiv>
            <InputField
              type='text'
              id='password'
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              placeholder="비밀번호"
              required />
            {passwordError && <Message>{passwordError}</Message>}
          </InputDiv>
        </FormItem>
        <FormItem>
          <ItemLabel htmlFor='email'>이메일<RequireSpan>*</RequireSpan></ItemLabel>
          <Explanation />
          <InputField
            type='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            placeholder="이메일"
            required />
          {emailError && <Message>{emailError}</Message>}
        </FormItem>
        <SubmitButton type='submit' disabled={!nickname || !id || !password || !email || !agree} onClick={handleJoin}>회원가입하기</SubmitButton>

        <FormItem>
          <AgreeLabel>
            <AgreeInfo
              type="checkbox"
              checked={agree}
              onChange={handleModalOpen}
              required />개인정보 수집 동의하기
          </AgreeLabel>
        </FormItem>
      </Form>

      {modalOpen && <PrivacyTermsModal isOpen={modalOpen} onClose={handleModalClose} onAgree={handlePrivacyAgree} />}

    </Container>
  )
}

export default Join;
