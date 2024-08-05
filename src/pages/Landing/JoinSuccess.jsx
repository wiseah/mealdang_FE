import styled from "styled-components";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiWinkSmile } from 'react-icons/bi';
import SubmitButton from "../../components/SubmitButton";

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
  margin-bottom: 77px;
`

const IconWrapper = styled(BiWinkSmile)`
  margin-bottom: 30px;
  font-size: 150px;
  color: #6A0DAD;
`

const Words = styled.div`
font-family: 'Do Hyeon', sans-serif;
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 57px;
`

const JoinSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <LogoContainer src='/images/mealdangLogo.png' alt="mealdang" />
      <IconWrapper><BiWinkSmile/></IconWrapper>
      <Words>회원가입 완료!</Words>
      <SubmitButton onClick={() => navigate('/login')}>로그인하러 가기</SubmitButton>
    </Container >
  )
}

export default JoinSuccess;