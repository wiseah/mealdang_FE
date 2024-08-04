import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DashBoard } from '../../components/Dashboard';
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { FoodRecommendBack } from '../../components/FoodRecommendBack';
import { IoIosArrowRoundForward } from "react-icons/io";
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

function AfterMain() {
  const [nickname, setNickname] = useState('');
  const [userData, setUserData] = useState({
    recommendCount: 0,
    dietSets: []
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMain();
        setNickname(data.nickname);
        setUserData({
          recommendCount: data.recommend_count,
          dietSets: data.diet_sets
        });
      } catch (error) {
        console.error('에러 발생: ', error);
      }
    }
    fetchData();
  }, []);

  const handleLikeClick = async () => {
    const currentDietSet = userData.dietSets[currentIndex];
    if (currentDietSet) {
      try {
        // Toggle the like state
        await patchMainHeart(currentDietSet.diet_set_id, !currentDietSet.is_liked);

        // Fetch the updated data and log it
        const updatedData = await fetchUserData();
        console.log('Updated Data:', updatedData);
        
        // Update the local state with the fetched data
        const updatedDietSets = updatedData.diet_sets.map(dietSet =>
          dietSet.diet_set_id === currentDietSet.diet_set_id
            ? { ...dietSet, is_liked: !currentDietSet.is_liked }
            : dietSet
        );
        setUserData(prevState => ({
          ...prevState,
          dietSets: updatedDietSets
        }));
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
      const updatedData = await fetchUserData();
      setCurrentIndex(0);
      console.log('Updated Data after recommendation:', updatedData);
    } catch (error) {
      console.error('AfterMain 내 getMain에서 에러 발생:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await getMain();
      setUserData({
        recommendCount: response.recommend_count,
        dietSets: response.diet_sets
      });
      return response; // Return response for logging
    } catch (error) {
      console.error('AfterMain 내 getMain에서 에러 발생:', error.message);
    }
  };

  return (
    <Container>
      <Greeting>오늘도 반가워요, {nickname}님</Greeting>
      <DashBoard />
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
      <FoodRecommendBack 
        dietSet={userData.dietSets[currentIndex]} 
        setCurrentIndex={setCurrentIndex}
      />
    </Container>
  );
}

export default AfterMain;
