import { BsCaretDownFill } from "react-icons/bs";
import { BsCaretUpFill } from "react-icons/bs";
import { useState } from "react";
import styled from "styled-components";

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

export function FoodToggle(data){
    const [mainToggled, setMainToggled] = useState(false);
    const [side1Toggled, setSide1Toggled] = useState(false);
    const [side2Toggled, setSide2Toggled] = useState(false);
    const [side3Toggled, setSide3Toggled] = useState(false);

    const handleToggle = (setter) => {
        setter(prevState => !prevState);
    }

    // const [MainToggled, setMainToggled] = useState(false);
    // const [SubToggled,setSubToggled] = useState(false);
    // const [SideToggled,setSideToggled] = useState(false);

    // const handleMainToggle = () => {
    //     setMainToggled(prevState => !prevState);
    // }
    // const handleSubToggle = () => {
    //     setSubToggled(prevState => !prevState);
    // }
    // const handleSideToggle = () => {
    //     setSideToggled(prevState => !prevState);
    // }
    
    const renderFoodItem = (item, toggled, setToggled) => {
        if (!item) return null;

    //더미데이터
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

    return (
        <>
            <FoodHeader>
                <FoodTitle>{item.food_name}</FoodTitle>
                <FoodIcon onClick={() => handleToggle(setToggled)}>
                    {toggled ? <BsCaretUpFill /> : <BsCaretDownFill />}
                </FoodIcon>
            </FoodHeader>
            {toggled && (
                <FoodContainer>
                    <FoodInfo>음식 정보</FoodInfo>
                    <FoodText>
                        <FoodDetails>
                            해당 식품군: 
                            {Object.entries(item.nutrients)
                                .filter(([_, value]) => value > 0)
                                .map(([key, value]) => `${key} ${value}`)
                                .join(', ')}
                        </FoodDetails>
                    </FoodText>
                    <RecipeTitle>레시피</RecipeTitle>
                    <RecipeText>{item.recipe}</RecipeText>
                </FoodContainer>
            )}
        </>
    );
}

return (
    <>
        {renderFoodItem(data.main, mainToggled, setMainToggled)}
        {renderFoodItem(data.side1, side1Toggled, setSide1Toggled)}
        {renderFoodItem(data.side2, side2Toggled, setSide2Toggled)}
        {renderFoodItem(data.side3, side3Toggled, setSide3Toggled)}
    </>
);
}