import React from "react";
import styled from "styled-components";
import FoodBookmarkContent from "./FoodBookmarkContent";

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

export default function FoodBookmarkBack({ dietSet, dietSetId }) {
  return (
    <FoodContainer>
      <FoodList>
        {dietSet.diets.map((diet) => (
          <FoodBookmarkContent key={diet.diet_id} diet={diet} dietSetId={dietSetId} />
        ))}
      </FoodList>
    </FoodContainer>
  );
}