import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DashBoard } from '../../components/Dashboard';
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { FoodRecommendBack } from '../../components/FoodRecommendBack';
import { IoIosArrowRoundForward } from "react-icons/io";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import getMain from '../../APIs/get/getMain';
import patchMainHeart from '../../APIs/patch/patchMainHeart';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Greeting = styled.div`
  color: #000;
  font-family: "Wavve PADO TTF";
  font-size: 30px;
  font-weight: 400;
  align-self: flex-start;
  padding-bottom: 16px;
  padding-left: 33px;
`;

const FoodTitle = styled.div`
  color: #000;
  font-family: "Wavve PADO TTF";
  font-size: 30px;
  font-weight: 400;
  display: flex;
  align-items: center;
  align-self: flex-start;
  padding: 34px 0px 10px 33px;
`;

const StarIcon = styled(({ filled, ...props }) => 
  filled ? <BsFillStarFill {...props} /> : <BsStar {...props} />
)`
  padding-left: 7px;
  padding-bottom: 3px;
  color: #F74A25;
  cursor: pointer;
`;

const RecommendButton = styled.div`
  width: 100%;
  color: ${props => (props.disabled ? '#B0B0B0' : '#000')};
  font-family: "Wavve PADO TTF";
  font-size: 18px;
  font-weight: 400;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  padding: 3px 50px 15px 0px;
`;

const TurnContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TurnButton = styled.div`
  display: flex;
  align-items: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${props => (props.disabled ? '#B0B0B0' : '#F74A25')};
`;

const TurnText = styled.div`
  color: #F74A25;
  text-align: center;
  font-family: "Wavve PADO TTF";
  font-size: 17px;
  font-weight: 400;
  padding: ${props => props.direction === 'previous' ? '0 16px 0 0' : '0 0 0 16px'};
`;

function AfterMain() {
  const [userData, setUserData] = useState({
    nickname: '',
    recommendCount: 0,
    dailyCalorie: '',
    dailyBloodSugar: '?',
    targetBloodSugar: '',
    dietSets: []
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await getMain();
      setUserData({
        nickname: response.nickname,
        recommendCount: response.recommend_count,
        dailyCalorie: response.daily_calorie,
        dailyBloodSugar: response.daily_blood_sugar,
        targetBloodSugar: response.target_blood_sugar,
        dietSets: response.diet_sets
      });
    } catch (error) {
      console.error('AfterMain 내 getMain에서 에러 발생:', error.message);
    }
  };

  const handleLikeClick = async () => {
    const currentDietSet = userData.dietSets[currentIndex];
    if (currentDietSet) {
      try {
        await patchMainHeart(currentDietSet.diet_set_id, !currentDietSet.is_liked);
        const updatedDietSets = userData.dietSets.map((dietSet, index) => 
          index === currentIndex ? { ...dietSet, is_liked: !dietSet.is_liked } : dietSet
        );
        setUserData(prevState => ({ ...prevState, dietSets: updatedDietSets }));
      } catch (error) {
        console.error('AfterMain 내 patchMainHeart에서 에러 발생:', error);
      }
    }
  };

  const handleRecommendClick = async () => {
    if (userData.recommendCount >= 3) {
      alert('식단 추천은 세 번까지 받을 수 있습니다.');
      return;
    }
    try {
      await fetchUserData();
      setCurrentIndex(0);
    } catch (error) {
      console.error('AfterMain 내 getMain에서 에러 발생:', error);
    }
  };

  const handleTurn = (direction) => {
    if (direction === 'previous' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'next' && currentIndex < userData.dietSets.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <Container>
      <Greeting>오늘도 반가워요, {userData.nickname}님</Greeting>
      <DashBoard 
        dailyCalorie={userData.dailyCalorie}
        dailyBloodSugar={userData.dailyBloodSugar}
        targetBloodSugar={userData.targetBloodSugar}
      />
      <FoodTitle>
        오늘의 추천식단
        <StarIcon 
          filled={userData.dietSets[currentIndex]?.is_liked} 
          onClick={handleLikeClick} 
        />
      </FoodTitle>
      <RecommendButton
        onClick={handleRecommendClick}
        disabled={userData.recommendCount >= 3}>
        다시 추천받기<IoIosArrowRoundForward />
      </RecommendButton>
      <FoodRecommendBack dietSet={userData.dietSets[currentIndex]} />
      <TurnContainer>
        <TurnButton onClick={() => handleTurn('previous')} disabled={currentIndex <= 0}>
          <BiChevronLeft />
          <TurnText direction="previous">이전</TurnText>
        </TurnButton>
        <TurnButton onClick={() => handleTurn('next')} disabled={currentIndex >= userData.dietSets.length - 1}>
          <TurnText direction="next">다음</TurnText>
          <BiChevronRight />
        </TurnButton>
      </TurnContainer>
    </Container>
  );
}

export default AfterMain;