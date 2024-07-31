import styled from "styled-components"
import { FoodRecommend } from "./FoodRecommend"
import { BsSun } from "react-icons/bs";
import { BsSunFill } from "react-icons/bs";
import { FaIceCream } from "react-icons/fa";
import { BiSolidMoon } from "react-icons/bi";
import getMain from "../APIs/get/getMain";
// import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";


export function FoodRecommendBack() {

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


    &::-webkit-scrollbar {
        display: none; /* 크롬, 사파리에서 스크롤바 숨기기 */
    }
    -ms-overflow-style: none;  /* IE 및 Edge에서 스크롤바 숨기기 */
    scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
  `

  const FoodList = styled.div`
    display:flex;
    flex-direction: row;
    gap:10px;
  `


  const [dietSets, setDietSets] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await getMain();
        setDietSets(response.diet_sets || []);

        console.log(response);

      } catch (error) {
        console.error('message:', error.message);
        // alert('추천 식단을 불러오지 못했습니다.');
      }
    };

    fetchData();
  }, []);


  const convertMealTime = (mealTime) => {
    switch (mealTime) {
      case 'breakfast': return '아침';
      case 'lunch': return '점심';
      case 'dinner': return '저녁';
      case 'snack': return '간식';
      default: return '?';
    }
  };

  const convertMealType = (mealType) => {
    switch (mealType) {
      case 'western': return '양식';
      case 'korean': return '한식';
      case 'chinese': return '중식';
      case 'japanese': return '일식';
      default: return '?';
    }
  };

  const getIconForMealTime = (mealTime) => {
    switch (mealTime) {
      case 'breakfast': return <BsSunFill />;
      case 'lunch': return <BsSun />;
      case 'dinner': return <BiSolidMoon />;
      case 'snack': return <FaIceCream />;
      default: return null;
    }
  };


  return (
    <FoodContainer>
       <FoodList>
        {dietSets.map((dietSet) => (
          <FoodRecommend
            key={dietSet.diet_id}
            title={`|${convertMealTime(dietSet.meal_time)} ${convertMealType(dietSet.meal_type)}`}
            Icon={getIconForMealTime(dietSet.meal_time)}
            Content={`
              ${dietSet.main || ''}
              ${dietSet.side1 || ''}
              ${dietSet.side2 || ''}
              ${dietSet.side3 || ''}
            `}
            Calories={`총 ${dietSet.carlorie || '0'} 칼로리`}
            // Certification={isCertified}
          />
        ))}
      </FoodList>
    </FoodContainer>
  )
}