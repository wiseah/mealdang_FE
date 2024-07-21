import styled from "styled-components";
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 100vh;
  margin-top: 376px;
  justify-content: center;
`

const LogoContainer = styled.img`
  width: 304.12px;
  height: 91.78px;
`

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLogginIn = async () => {
      try {
        // 백엔드에 리프레시 토큰을 이용하여 로그인 정보 확인하는 요청
        const response = await fetch('/api/accounts/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh_token: localStorage.getItem('refreshToken') }),
        });

        if (response.ok) {
          // 로그인 상태 확인 성공
          const data = await response.json();
          if (data.isLoggedIn) {
            // 이미 로그인한 경우 메인 페이지로 이동
            navigate('/main');
          } else {
            // 로그인한 적 없는 경우 로그인 페이지로 이동
            navigate('/login');
          }
        } else {
          // 응답이 실패한 경우
          console.error('Failed to check login status');
          navigate('/login'); // 실패 시 로그인 페이지로 이동
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        navigate('/login'); // 에러 발생 시 로그인 페이지로 이동
      }
    };

    const timer = setTimeout(isLogginIn, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container>
      <LogoContainer src='/images/mealdangLogo.png' alt="mealdang" />
    </Container>
  );
};

export default LandingPage;
