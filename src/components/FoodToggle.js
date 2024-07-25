import { BsCaretDownFill } from "react-icons/bs";
import { BsCaretUpFill } from "react-icons/bs";
import { useState } from "react";
import styled from "styled-components";


export function FoodToggle(){

    const [MainToggled, setMainToggled] = useState(false);
    const [SubToggled,setSubToggled] = useState(false);
    const [SideToggled,setSideToggled] = useState(false);

    
    const handleMainToggle = () => {
        setMainToggled(prevState => !prevState);
    }
    const handleSubToggle = () => {
        setSubToggled(prevState => !prevState);
    }
    const handleSideToggle = () => {
        setSideToggled(prevState => !prevState);
    }

   
    const MainData = {
        foodGroup: '잡곡밥 1/2공기',
        details: '곡류군 2, 채소군 1',
        calories: 600,
    };
    const SubData = {
        foodGroup: '된장국',
        details: '곡류군 2, 채소군 1',
        calories: 600,
    };
    const SideData = {
        foodGroup: '김치',
        details: '채소군 1',
        calories: 200,
    };

    const RecipeData=[
        {content: '밥 씻기'},
        {content: '또 씻기'},
        {content: '쿠쿠~'},
    ];
    const SubRecipeData=[
        {content: '물을 붓는다'},
        {content: '된장을 넣는다'},
        {content: '야채를 넣고 끓인다'},
    ];
    const SideRecipeData=[
        {content: '부모님 김치 최고'},
        {content: '된장을 넣는다'},
        {content: '야채를 넣고 끓인다'},
    ]
    

    // 음식 헤더 
    const FoodHeader= styled.div`
        width: 300px;
        height: 57px;
        border-radius: 25px;
        background: #FFF;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
        color: #FF6A4A;
        display: flex;
        align-items: center;
        margin-top: 19px;
    `

    // 음식 제목 
    const FoodTitle = styled.span`
        font-family: "Wavve PADO TTF";
        font-size: 20px;
        font-weight: 400;
        padding-left: 15px; 
    `
    // 토글버튼
    const FoodIcon = styled.div`
        width: 20px;
        height: 24px;
        margin:auto 14px auto auto;
        cursor: pointer;
    `

    // 토글 내리면 나오는 컨테이너 공간 
    const FoodContainer = styled.div`
        width: 300px;
        height: auto;
        border-radius: 15px;
        background:  #FFE3C4;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        margin-top: 4px;
        padding-bottom: 17px;
    `

    // 음식 정보
    const FoodInfo = styled.span`
        color:  #FF6A4A;
        font-family: "Wavve PADO TTF";
        font-size: 24px;
        font-weight: 400;
        padding-top: 14px;
        padding-left: 16px;
    `
    // 디테일한 음식 정보
    const FoodText = styled.ul`
        color: #FF6A4A;
        font-family: Inter;
        font-size: 18px;
        font-weight: 600;
        padding-left: 37px;
        margin-top: 10px;
        margin-bottom: 5px;
    `
    const FoodDetails = styled.li`
        margin-bottom: 3px;
    `

    // 레시피 제목 
    const RecipeTitle = styled.span`
        color:  #FF6A4A;
        font-family: "Wavve PADO TTF";
        font-size: 24px;
        font-weight: 400;
        padding-left: 16px;
        padding-bottom: 5px;
    `
    // 레시피 정보 
    const RecipeText = styled.span`
        color: #FF6A4A;
        font-family: Inter;
        font-size: 18px;
        font-weight: 600;
        padding-left: 20px;
        margin-bottom: 5px;
    `


    return(
        <>
            <FoodHeader>
                <FoodTitle>{MainData.foodGroup}</FoodTitle>
                <FoodIcon onClick={handleMainToggle}>{MainToggled?
                <BsCaretUpFill/> : <BsCaretDownFill/>}</FoodIcon>
            </FoodHeader>
            {MainToggled &&(<FoodContainer>
                <FoodInfo>
                    음식 정보
                </FoodInfo>
                <FoodText>
                    <FoodDetails>해당 식품군: {MainData.details}</FoodDetails>
                    <FoodDetails>칼로리: {MainData.calories}kcal</FoodDetails>
                </FoodText>
                <RecipeTitle>레시피</RecipeTitle>
                {RecipeData.map((recipe,index) => (
                    <RecipeText key ={index}>{index+1}. {recipe.content}</RecipeText>
                ))}
            </FoodContainer>)}
            <FoodHeader>
                <FoodTitle>{SubData.foodGroup}</FoodTitle>
                <FoodIcon onClick={handleSubToggle}>{SubToggled?
                <BsCaretUpFill/> : <BsCaretDownFill/>}</FoodIcon>
            </FoodHeader>
            {SubToggled &&(<FoodContainer>
                <FoodInfo>
                    음식 정보
                </FoodInfo>
                <FoodText>
                    <FoodDetails>해당 식품군: {SubData.details}</FoodDetails>
                    <FoodDetails>칼로리: {SubData.calories}kcal</FoodDetails>
                </FoodText>
                <RecipeTitle>레시피</RecipeTitle>
                {SubRecipeData.map((recipe,index) => (
                    <RecipeText key ={index}>{index+1}. {recipe.content}</RecipeText>
                ))}
            </FoodContainer>)}
            <FoodHeader>
                <FoodTitle>{SideData.foodGroup}</FoodTitle>
                <FoodIcon onClick={handleSideToggle}>{SideToggled?
                <BsCaretUpFill/> : <BsCaretDownFill/>}</FoodIcon>
            </FoodHeader>
            {SideToggled &&(<FoodContainer>
                <FoodInfo>
                    음식 정보
                </FoodInfo>
                <FoodText>
                    <FoodDetails>해당 식품군: {SideData.details}</FoodDetails>
                    <FoodDetails>칼로리: {SideData.calories}kcal</FoodDetails>
                </FoodText>
                <RecipeTitle>레시피</RecipeTitle>
                {SideRecipeData.map((recipe,index) => (
                    <RecipeText key ={index}>{index+1}. {recipe.content}</RecipeText>
                ))}
            </FoodContainer>)} 
   
    </>
  
)}