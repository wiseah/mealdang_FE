import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmButton from '../../components/ConfirmButton';
import postNicknameCheck from '../../APIs/post/postNicknameCheck';
import getMyInfo from '../../APIs/get/getMyInfo';
import patchMyInfo from '../../APIs/patch/patchMyInfo';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 390px;
  min-height: 100vh;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 0 20px;
`

const FormItem = styled.div`
  margin-bottom: 25px;
`

const ItemLabel = styled.label`
font-family: 'Do Hyeon', sans-serif;
  font-size: 25px;
  color: #FF6A4A;
`

const RequireSpan = styled.span`
  color: red;
`

const InputDiv = styled.div`
  position: relative;
  align-items: center;
`

const CheckButton = styled.button`
  position: absolute;
  top: 22px;
  right: 32px;
  width: 60px;
  height: 28px;
  border: none;
  background-color: #FF6A4A;
  color: white;
  font-size: 12px;
  border-radius: 8px;
  cursor: pointer;
`;

const Message = styled.div`
  width: 330px;
  font-size: 12px;
  margin: 5px 0 0 10px;
  color: #FF6A4A;
`;


const RadioContainer = styled.div`
  display: flex;
  margin-top: 10px;
`

const RadioLabel = styled.label`
font-family: 'Do Hyeon', sans-serif;
  font-size: 25px;
  font-weight: 400;
  color: #FF6A4A;
  padding: 0 50px 0 0;
  cursor: pointer;
  display: flex;
  flex-direction: row;
`

const RadioInput = styled.input`
  width: 22px;
  height: 22px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 2px solid #FF6A4A;
  outline: none;
  border-radius: 50%;
  margin: 10px 10px 0 0;
  cursor: pointer;

  &:checked {
    background-color: #FF6A4A;
    border: 3.9px solid #ffffff;
    box-shadow: 0 0 0 1.3px #FF6A4A;
  }
`

const Text = styled.div`
  display: flex;
  margin-top: 7px;
`

const InputField = styled.input`
  width: 350px;
  height: 56px;
  border: 1px solid #FF6A4A;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px #B7B7B7;
  margin: 8px auto;
  font-size: 20px;
  font-weight: 400;
  color: #FF6A4A;
  font-family: 'Do Hyeon', sans-serif;
  text-align: center;
`

const NumberInput = styled.input`
  width: 350px;
  height: 56px;
  border: 1px solid #FF6A4A;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px #B7B7B7;
  margin: 8px auto;
  font-size: 25px;
  font-weight: 400;
  color: #FF6A4A;
  font-family: 'Do Hyeon', sans-serif;
  text-align: center;
`


const MyInfo = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [is_diabetes, setIs_diabetes] = useState(false);

  const [nicknameError, setNicknameError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMyInfo();
        setNickname(data.nickname);
        setGender(data.gender);
        setAge(data.age);
        setHeight(data.height);
        setWeight(data.weight);
        setIs_diabetes(data.is_diabetes);

        console.log(data)
      } catch (error) {
        console.error('정보 가져오기 실패:', error);
      }
    }

    fetchData();
  }, []);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  }

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

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  }

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  }

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  }

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  }

  const handleIs_diabetesChange = (e) => {
    setIs_diabetes(e.target.value);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nickname || !gender || !age || !height || !weight) {
      alert('필수 항목을 모두 입력하세요.');
      return;
    }

    try {
      await patchMyInfo(nickname, gender, age, height, weight, is_diabetes);
      console.log('정보 수정에 성공했습니다.');
      navigate('/mypage');
    } catch (error) {
      console.error('정보 수정 실패:', error);
      alert('정보 수정에 실패했습니다.');
    }
  };

  return (
    <Container>
      <Form>
      <FormItem>
          <ItemLabel htmlFor='nickname'>닉네임<RequireSpan>*</RequireSpan></ItemLabel>
          <InputDiv>
            <InputField
              type='text'
              id='nickname'
              value={nickname}
              onChange={handleNicknameChange}
              required />
            <CheckButton onClick={handleNicknameCheck}>중복 확인</CheckButton>
            {nicknameError && <Message>{nicknameError}</Message>}
          </InputDiv>
        </FormItem>
        <FormItem>
          <ItemLabel>성별<RequireSpan>*</RequireSpan></ItemLabel>
          <RadioContainer>
            <RadioLabel>
              <RadioInput
                type="radio"
                name="gender"
                value="남성"
                checked={gender === '남성'}
                onChange={handleGenderChange}
              /><Text>남성</Text>
            </RadioLabel>
            <RadioLabel>
              <RadioInput
                type="radio"
                name="gender"
                value="여성"
                checked={gender === '여성'}
                onChange={handleGenderChange}
              /> <Text>여성</Text>
            </RadioLabel>
          </RadioContainer>
        </FormItem>

        <FormItem>
          <ItemLabel>나이<RequireSpan>*</RequireSpan></ItemLabel>
          <div>
            <NumberInput
              type="number"
              value={age}
              onChange={handleAgeChange}
              required />
          </div>
        </FormItem>

        <FormItem>
          <ItemLabel>키<RequireSpan>*</RequireSpan></ItemLabel>
          <div>
            <NumberInput
              type="number"
              value={height}
              onChange={handleHeightChange}
              required />
          </div>
        </FormItem>

        <FormItem>
          <ItemLabel>몸무게<RequireSpan>*</RequireSpan></ItemLabel>
          <div>
            <NumberInput
              type="number"
              value={weight}
              onChange={handleWeightChange}
              required />
          </div>
        </FormItem>

        <FormItem>
          <ItemLabel>당뇨 여부<RequireSpan>*</RequireSpan></ItemLabel>
          <RadioContainer>
            <RadioLabel>
              <RadioInput
                type="radio"
                name="is_diabetes"
                value="true"
                checked={is_diabetes}
                onChange={handleIs_diabetesChange}
              /> <Text>예</Text>
            </RadioLabel>
            <RadioLabel>
              <RadioInput
                type="radio"
                name="is_diabetes"
                value="false"
                checked={!is_diabetes}
                onChange={handleIs_diabetesChange}
              /> <Text>아니요</Text>
            </RadioLabel>
          </RadioContainer>
        </FormItem>

        <ConfirmButton type='submit' onClick={handleSubmit} text="수정하기" color="#ffffff" backgroundColor="#FF6A4A"/>
      </Form>
    </Container>
  )
}

export default MyInfo;