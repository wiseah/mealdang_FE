import styled from "styled-components";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiWinkSmile } from 'react-icons/bi';

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
  margin-bottom: 57px;
`

const IconWrapper = styled(BiWinkSmile)`
  margin-bottom: 70px;
  font-size: 150px;
  color: #6A0DAD;
`

const Words = styled.div`
  font-family: 'WavvePADO-Regular';
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 57px;
`

const Login = styled.button`
  width: 280px;
  height: 56px;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #6A0DAD;
  margin: 26.5px 35px 18px 35px;
  font-size: 30px;
  font-weight: 400;
  font-family: 'WavvePADO-Regular';
  color: #ffffff;
  text-align: center;
`

const JoinSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <LogoContainer src='/images/mealdangLogo.png' alt="mealdang" />
      <IconWrapper><BiWinkSmile/></IconWrapper>
      <Words>회원가입 완료!</Words>
      <Login onClick={() => navigate('/login')}>로그인하러 가기</Login>
    </Container >
  )
}

export default JoinSuccess;