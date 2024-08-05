import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FoodRecommend } from "./FoodRecommend";
import { BsSun, BsSunFill } from "react-icons/bs";
import { FaIceCream } from "react-icons/fa";
import { BiSolidMoon } from "react-icons/bi";
import getMain from "../APIs/get/getMain";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const FoodContainer = styled.div`
  width: 340px;
  height: 290px;
  margin: 0px 20px 14px 20px;
  border-radius: 15px;
  background-color: #FFE3C4;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;
  padding-left: 10px;
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
  -ms-overflow-style: none; /* Internet Explorer와 Edge에서 스크롤바 숨기기 */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge에서 스크롤바 숨기기 */
  }
`;

const FoodList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const TurnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const TurnButton = styled.div`
  display: flex;
  align-items: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${props => (props.disabled ? '#B0B0B0' : '#F74A25')};
  padding: 0 10px;
`;

const TurnText = styled.div`
  color: #F74A25;
  text-align: center;
  font-family: "Wavve PADO TTF";
  font-size: 17px;
  font-weight: 400;
  padding: ${props => props.direction === 'previous' ? '0 16px 0 0' : '0 0 0 16px'};
`;

const mealTimeMap = {
  breakfast: { text: '아침', icon: <BsSunFill /> },
  lunch: { text: '점심', icon: <BsSun /> },
  dinner: { text: '저녁', icon: <BiSolidMoon /> },
  snack: { text: '간식', icon: <FaIceCream /> },
};

const mealTypeMap = {
  western: '양식',
  korean: '한식',
  chinese: '중식',
  japanese: '일식',
};

export function FoodRecommendBack({ currentDietSetId, onLikeChange }) {
  const [dietSets, setDietSets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMain();
        if (response.diet_sets && response.diet_sets.length > 0) {
          const updatedDietSets = response.diet_sets.map(set => {
            const updatedDiets = set.diets.map(diet => {
              if (diet.meal_time === 'snack1' || diet.meal_time === 'snack2') {
                return { ...diet, meal_time: 'snack' };
              }
              return diet;
            });
            return { ...set, diets: updatedDiets };
          });
          updatedDietSets.sort((a, b) => b.diet_set_id - a.diet_set_id);
          setDietSets(updatedDietSets);
          if (!currentDietSetId) {
            onLikeChange(updatedDietSets[0].diet_set_id);
          }
        }
      } catch (error) {
        console.error('식단 추천을 불러오는 데 실패했습니다:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleTurn = (direction) => {
    const currentIndex = dietSets.findIndex(set => set.diet_set_id === currentDietSetId);
    if (direction === 'previous' && currentIndex < dietSets.length - 1) {
      console.log('Previous diet_set_id:', dietSets[currentIndex + 1].diet_set_id);
      onLikeChange(dietSets[currentIndex + 1].diet_set_id);
    } else if (direction === 'next' && currentIndex > 0) {
      console.log('Next diet_set_id:', dietSets[currentIndex - 1].diet_set_id);
      onLikeChange(dietSets[currentIndex - 1].diet_set_id);
      
    }
  };

  const getCurrentDietSet = () => {
    return dietSets.find(set => set.diet_set_id === currentDietSetId) || null;
  };

  const currentDietSet = getCurrentDietSet();

  return (
    <>
      <FoodContainer>
        {currentDietSet && (
          <FoodList>
            {currentDietSet.diets.map(diet => (
              <FoodRecommend
                key={diet.diet_id}
                title={`${mealTimeMap[diet.meal_time]?.text || '?'}${diet.meal_time !== 'snack' ? ` | ${mealTypeMap[diet.meal_type] || '?'}` : ''}`}
                Icon={mealTimeMap[diet.meal_time]?.icon}
                Content={`
                  ${diet.main || ''}
                  ${diet.side1 || ''}
                  ${diet.side2 || ''}
                  ${diet.side3 || ''}
                `.trim()}
                Calories={`총 ${diet.carlorie || '0'} 칼로리`}
              />
            ))}
          </FoodList>
        )}
      </FoodContainer>
      <TurnContainer>
        <TurnButton onClick={() => handleTurn('previous')} disabled={dietSets.findIndex(set => set.diet_set_id === currentDietSetId) >= dietSets.length - 1}>
          <BiChevronLeft />
          <TurnText direction="previous">이전</TurnText>
        </TurnButton>
        <TurnButton onClick={() => handleTurn('next')} disabled={dietSets.findIndex(set => set.diet_set_id === currentDietSetId) <= 0}>
          <TurnText direction="next">다음</TurnText>
          <BiChevronRight />
        </TurnButton>
      </TurnContainer>
    </>
  );
}