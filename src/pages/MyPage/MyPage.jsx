import styled from "styled-components";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiWinkSmile } from 'react-icons/bi';
import ConfirmButton from "../../components/ConfirmButton";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 390px;
  min-height: 100vh;
  place-items: center;
`

const InfoContainer = styled.div`
  display: flex;
  width: 347.11px;
  height: 135.05px;
  border: 1.18px solid #6A0DAD;
  border-radius: 11.85px;
  box-shadow: 0px 4.74px 4.74px #B7B7B7;
`

const Info = styled.div`
  font-family: 'WavvePADO-Regular';
  font-size: 23.68px;
  text-align: center;
  margin: 14px 5px;
`

const IconWrapper = styled(BiWinkSmile)`
  width: 105.27px;
  height: 106.32px;
  color: #6A0DAD;
  align-items: center;
  justify-items: center;
  margin: 14px 5px 0 14px;
`

const PointSpan = styled.span`
  color: #6A0DAD;            
`

const LinkContainer = styled.div`
  color: #000000;
  display: flex;
  flex-direction: column;
  place-items: center;
  margin-top: 48px;
`


const LinkItem = styled.div`
  margin-bottom: 20px;
  text-align: left;
`


const MyPage = ( onClick, text, color, backgroundColor) => {

  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [subscribe, setSubscribe] = useState('미구독');
  const [remained_podo, setRemained_podo] = useState('없음');

  const handleNavigateToNowhere = () => {
    alert ('해당 기능은 아직 사용할 수 없어요!')

  }

  return (

    <Container>
      <InfoContainer>
        <IconWrapper><BiWinkSmile /></IconWrapper>
        <Info>
          오늘도 반가워요 <br />
          <PointSpan>{nickname}님</PointSpan> <br />
          현재 등급: <PointSpan>{subscribe}</PointSpan> <br />
          사용 가능 포도: <PointSpan>{remained_podo}</PointSpan>
        </Info>
      </InfoContainer>
      <LinkContainer>
        <LinkItem><ConfirmButton onClick={() => navigate('/myinfo')} text="내 정보" textAlign="left" paddingLeft="25px" color="#000000" backgroundColor="#E6E6FA" /></LinkItem>
        <LinkItem><ConfirmButton onClick={() => navigate('/myfoodexchangelist')} text="내 식품교환표" textAlign="left" paddingLeft="25px" color="#000000" backgroundColor="#E6E6FA" /></LinkItem>
        <LinkItem><ConfirmButton onClick={() => navigate('')} text="추천 식단 즐겨찾기" textAlign="left" paddingLeft="25px" color="#000000" backgroundColor="#E6E6FA" /></LinkItem> 
        {/* 이동주소로 변경필요 */}
        <LinkItem><ConfirmButton onClick={() => navigate('')} text="포도 쓰러 가기" textAlign="left" paddingLeft="25px" color="#000000" backgroundColor="#E6E6FA" /></LinkItem> 
        {/* 이동주소로 변경필요 */}
        <LinkItem><ConfirmButton onClick={handleNavigateToNowhere} text="프리미엄 구독하기" textAlign="left" paddingLeft="25px" color="#ffffff" backgroundColor="#6A0DAD" /></LinkItem>
        <LinkItem><ConfirmButton onClick={handleNavigateToNowhere} text="캐릭터 커스텀하러 가기" textAlign="left" paddingLeft="25px" color="#ffffff" backgroundColor="#6A0DAD" /></LinkItem>
      </LinkContainer>
    </Container>

  );

}

export default MyPage;