import React from "react";
import styled from "styled-components";
import { BsSunFill, BsSun, BsCheck } from "react-icons/bs";
import { FaIceCream } from "react-icons/fa";
import { BiSolidMoon } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const FoodContainer = styled.div`
    width: 151px;
    height: 255px;
    border-radius: 15px;
    background: ${(props) => (props.Certification ? '#F74A25' : '#FFF')};
    color: ${(props) => (props.Certification ? '#FFF' : '#F74A25')};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    padding-left: 10px;
`;

const IconContainer = styled.div`
    width: 20px;
    height: 20px;
`;

const TitleTextContainer = styled.div`
    width: 91px;
    height: 38px;
    font-family: "Wavve PADO TTF";
    font-size: 20px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const DetailButton = styled.div`
    text-align: center;
    font-family: "Wavve PADO TTF";
    font-size: 15px;
    font-weight: 400;
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
    padding-top: 5px;
`;

const CertificationContainer = styled.div`
    width: 54px;
    height: 15px;
    border-radius: 3px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: "Wavve PADO TTF";
    font-size: 15px;
    font-weight: 400;
    margin-top: 4px;
    margin-left: 88px;
`;

const CertificationIcon = styled(BsCheck)`
    color: #FF6A4A;
`;

const CertificationText = styled.span`
    color: #FF6A4A;
    text-align: center;
    font-family: "Wavve PADO TTF";
    font-size: 10px;
    font-weight: 400;
`;

const ContentContainer = styled.div`
    width: 119px;
    height: 118px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    font-family: "Wavve PADO TTF";
    font-size: 20px;
    font-weight: 400;
    padding-left: 16px;
    padding-top: 10px;
`;

const CalorieContainer = styled.div`
    font-size: 16px;
    font-weight: 400;
    font-family: "Wavve PADO TTF";
    padding: 20px 0 16px 16px;
    height: 23px;
`;

const mealTimeMap = {
  breakfast: { text: '아침', icon: <BsSunFill /> },
  lunch: { text: '점심', icon: <BsSun /> },
  dinner: { text: '저녁', icon: <BiSolidMoon /> },
  snack1: { text: '간식', icon: <FaIceCream /> },
  snack2: { text: '간식', icon: <FaIceCream /> },
};

const mealTypeMap = {
  western: '양식',
  korean: '한식',
  chinese: '중식',
  japanese: '일식',
};

export default function FoodBookmarkContent({ diet, dietSetId }) {
  const navigate = useNavigate();
  const { meal_time, meal_type, carlorie, main, side1, side2, side3, is_certified } = diet;
  const mealInfo = mealTimeMap[meal_time] || { text: "?", icon: null };
  const mealTypeText = mealTypeMap[meal_type] || "?";

  const DetailClick = () => {
    navigate(`/favoritefooddetail/${diet.diet_id}`, { state: { dietId: diet.diet_id } });
  };

  return (
    <FoodContainer Certification={is_certified}>
      <TitleContainer>
        <IconContainer>{mealInfo.icon}</IconContainer>
        <TitleTextContainer>{`${mealInfo.text} | ${mealTypeText}`}</TitleTextContainer>
      </TitleContainer>
      <DetailButton onClick={DetailClick}>상세보기</DetailButton>
      <CertificationContainer>
        {is_certified && (
          <>
            <CertificationIcon />
            <CertificationText>식단 인증</CertificationText>
          </>
        )}
      </CertificationContainer>
      <ContentContainer>
        {main && <div>{main}</div>}
        {side1 && <div>{side1}</div>}
        {side2 && <div>{side2}</div>}
        {side3 && <div>{side3}</div>}
      </ContentContainer>
      <CalorieContainer>{`총 ${carlorie} 칼로리`}</CalorieContainer>
    </FoodContainer>
  );
}
