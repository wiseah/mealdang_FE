import { useState } from "react";
import styled from "styled-components";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

const TotalFood = styled.div`
  width: 300px;
  height: 57px;
  border-radius: 25px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  padding-top: 19px;
  color: #3f006c;
  display: flex;
  align-items: center;
`;

const TotalFoodTitle = styled.span`
font-family: 'Do Hyeon', sans-serif;
  font-size: 23px;
  font-weight: 400;
  padding-left: 15px;
`;

const TotalFoodIcon = styled.div`
  width: 20px;
  height: 24px;
  margin: auto 14px auto auto;
  cursor: pointer;
`;

const TotalFoodContainer = styled.div`
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: #e6e6fa;
  border-radius: 17.772px;
  margin-top: 3px;
  padding-bottom: 9px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const TotalFoodCalories = styled.span`
  color: #3f006c;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 20px;
  font-weight: 400;
  padding: 13px 0px 8px 16px;
`;

const TotalFoodText = styled.ul`
  color: #3f006c;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 20px;
  font-weight: 400;
  margin: 0px;
`;

const FoodGroups = styled.li`
  margin-bottom: 5px;
`;

export default function TotalFoodToggle({ calorie, data }) {
  const [TotalToggled, setTotalToggled] = useState(false);
  const handleTotalToggle = () => {
    setTotalToggled((prevState) => !prevState);
  };

  const getNonZeroNutrients = (nutrients) => {
    if (!nutrients) return [];
    const nutrientNames = {
      grain: "곡류군",
      fish_meat_low_fat: "저지방 어육류군",
      fish_meat_medium_fat: "중지방 어육류군",
      vegetable: "채소군",
      fat: "지방군",
      dairy: "유제품군",
      fruit: "과일군",
    };

    return Object.entries(nutrients)
      .filter(([_, value]) => value !== 0)
      .map(([key, value]) => `${nutrientNames[key]} ${value}`);
  };

  return (
    <>
      <TotalFood>
        <TotalFoodTitle>총 식품군</TotalFoodTitle>
        <TotalFoodIcon onClick={handleTotalToggle}>
          {TotalToggled ? <BsCaretUpFill /> : <BsCaretDownFill />}
        </TotalFoodIcon>
      </TotalFood>
      {TotalToggled && (
        <TotalFoodContainer>
          <TotalFoodCalories>총 칼로리: {calorie}kcal</TotalFoodCalories>
          <TotalFoodText>
            {data.main && data.main.nutrients ? (
              getNonZeroNutrients(data.main.nutrients).map(
                (nutrient, index) => (
                  <FoodGroups key={index}>{nutrient}</FoodGroups>
                )
              )
            ) : (
              <FoodGroups>영양소 정보가 없습니다.</FoodGroups>
            )}
          </TotalFoodText>
        </TotalFoodContainer>
      )}
    </>
  );
}
