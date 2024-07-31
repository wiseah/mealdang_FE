import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FoodRecommend } from "./FoodRecommend";
import { BsSun, BsSunFill } from "react-icons/bs";
import { FaIceCream } from "react-icons/fa";
import { BiSolidMoon } from "react-icons/bi";
import getMain from "../APIs/get/getMain";

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
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FoodList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
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

export function FoodRecommendBack() {
  const [dietSets, setDietSets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMain();
        setDietSets(response.diet_sets || []);
      } catch (error) {
        console.error('식단 추천을 불러오는 데 실패했습니다:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <FoodContainer>
      <FoodList>
        {dietSets.map((dietSet) => (
          <FoodRecommend
            key={dietSet.diet_id}
            title={`|${mealTimeMap[dietSet.meal_time]?.text || '?'} ${mealTypeMap[dietSet.meal_type] || '?'}`}
            Icon={mealTimeMap[dietSet.meal_time]?.icon}
            Content={`
              ${dietSet.main || ''}
              ${dietSet.side1 || ''}
              ${dietSet.side2 || ''}
              ${dietSet.side3 || ''}
            `.trim()}
            Calories={`총 ${dietSet.carlorie || '0'} 칼로리`}
          />
        ))}
      </FoodList>
    </FoodContainer>
  );
}