import styled from "styled-components";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from "../../components/SubmitButton";
import login from '../../APIs/post/login.js';
import Cookies from 'js-cookie';
import getUserInfo from '../../APIs/get/getUserInfo.js';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  height: 100vh;
`

const LogoContainer = styled.img`
  width: 304.12px;
  height: 91.78px;
  margin: 50px 0 70px 0;
`

const InputField = styled.input`
  width: 350px;
  height: 56px;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #E6E6FA;
  margin-bottom: 12px;
  font-size: 30px;
  font-weight: 400;
  font-family: 'WavvePADO-Regular';
  text-align: center;
`

const Join = styled.span`
  font-family: 'WavvePADO-Regular';
  font-size: 20px;
  font-weight: 400;
  color: #737373;
`

const Login = () => {

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState(''); 

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("accessToken")
    if (!isLoggedIn) {
      return;
    }

    navigate("/main");
  }, [])



  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
    if (!id) {
      alert('ID를 입력해야 합니다.')
      return;
    } else if (!password) {
      alert('비밀번호를 입력해야 합니다.')
      return;
    } else if (id !== 'id') {
      alert('회원이 아닙니다.')
      return;
    } else if (password !== 'password') {
      alert('비밀번호가 틀렸습니다.')
      return;
    } 
    
    // 리코일에 최초 로그인 시 진단테스트로 가는 거 추가해야 함
    // else {
    //   navigate('/diagnosis');
    // }


      const response = await login(id, password);
      const accessToken = response.accessToken;
      const refreshToken = response.refreshToken;

      sessionStorage.setItem('accessToken', `Coffee ${accessToken}`, { expires: 7 });
      Cookies.set('refreshToken', `Coffee ${refreshToken}`, { expires: 7 });

      const userInfo = await getUserInfo();
      sessionStorage.setItem("userName", userInfo.userName);

      navigate('/main'); // 로그인 성공 시 메인 페이지로 이동
    } catch {
      console.error('message: ', response.message)
      setErrorText('아이디 또는 비밀번호가 잘못되었습니다.');
      alert('로그인에 실패했습니다.');
    }
  }

  const handleIdChange = (e) => {
    setMember_id(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }


  return (
    <Container className='LoginContainer'>
      <div className='LogoContainer'>
        <LogoContainer src='/images/mealdangLogo.png' alt="mealdang" />
      </div>
      <form>
        <div>
          <label htmlFor='id' />
          <InputField
            type='text'
            id='id'
            value={id}
            onChange={handleIdChange}
            placeholder='아이디'
            required />
        </div>
        <div>
          <label htmlFor='password' />
          <InputField className='LoginItem'
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            placeholder='비밀번호'
            required />
        </div>
        <SubmitButton type='submit' onClick={handleLogin}>로그인하기</SubmitButton>

      </form>
      <Join onClick={() => navigate('/join')}>회원가입</Join>
    </Container >
  )
}

export default Login;