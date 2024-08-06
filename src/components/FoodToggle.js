import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { useState } from "react";
import styled from "styled-components";

export default function FoodToggle({ main = {}, side1 = {}, side2 = {}, side3 = {} }) {
    console.log("main: ", main);
    console.log("side1: ", side1);
    console.log("side2: ", side2);
    console.log("side3: ", side3);

    const [MainToggled, setMainToggled] = useState(false);
    const [Side1Toggled, setSide1Toggled] = useState(false);
    const [Side2Toggled, setSide2Toggled] = useState(false);
    const [Side3Toggled, setSide3Toggled] = useState(false);

    const handleMainToggle = () => {
        setMainToggled(prevState => !prevState);
    }
    const handleSide1Toggle = () => {
        setSide1Toggled(prevState => !prevState);
    }
    const handleSide2Toggle = () => {
        setSide2Toggled(prevState => !prevState);
    }
    const handleSide3Toggle = () => {
        setSide3Toggled(prevState => !prevState);
    }

    const FoodHeader = styled.div`
        width: 300px;
        height: 57px;
        border-radius: 25px;
        background: #FFF;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
        color: #FF6A4A;
        display: flex;
        align-items: center;
        margin-top: 19px;
    `;

    const FoodTitle = styled.span`
font-family: 'Do Hyeon', sans-serif;
        font-size: 23px;
        font-weight: 400;
        padding-left: 15px; 
    `;

    const FoodIcon = styled.div`
        width: 20px;
        height: 24px;
        margin: auto 14px auto auto;
        cursor: pointer;
    `;

    const FoodContainer = styled.div`
        width: 285px;
        height: auto;
        border-radius: 15px;
        background:  #FFE3C4;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        margin-top: 4px;
        padding-bottom: 17px;
        padding-right: 15px;
    `;

    const FoodInfo = styled.span`
        color:  #FF6A4A;
        font-family: 'Do Hyeon', sans-serif;
        font-size: 24px;
        font-weight: 400;
        padding-top: 14px;
        padding-left: 16px;
    `;

    const FoodText = styled.ul`
        color: #FF6A4A;
        font-size: 18px;
        font-weight: 600;
        padding-left: 37px;
        margin-top: 10px;
        margin-bottom: 5px;
    `;

    const FoodDetails = styled.li`
        margin-bottom: 3px;
    `;

    const RecipeTitle = styled.span`
        color:  #FF6A4A;
        font-family: 'Do Hyeon', sans-serif;
        font-size: 24px;
        font-weight: 400;
        padding-left: 16px;
        padding-bottom: 5px;
    `;

    const RecipeText = styled.span`
        color: #FF6A4A;
        font-size: 18px;
        font-weight: 600;
        padding-left: 20px;
        margin-bottom: 5px;
        margin-top: 10px;
    `;

    const getNonZeroNutrients = (nutrients) => {
        const nutrientNames = {
            grain: "곡류군",
            fish_meat_low_fat: "저지방 어육류군",
            fish_meat_medium_fat: "중지방 어육류군",
            vegetable: "채소군",
            fat: "지방군",
            dairy: "유제품군",
            fruit: "과일군"
        };

        return Object.entries(nutrients)
            .filter(([_, value]) => value !== 0)
            .map(([key, value]) => `${nutrientNames[key]} ${value}`)
            .join(', ');
    };

    const recipes = (recipe) => {
        return recipe.split(',');
    }

    return (
        <>
            {main.food_name && (
                <>
                    <FoodHeader>
                        <FoodTitle>{main.food_name}</FoodTitle>
                        <FoodIcon onClick={handleMainToggle}>{MainToggled ?
                            <BsCaretUpFill /> : <BsCaretDownFill />}</FoodIcon>
                    </FoodHeader>
                    {MainToggled && (
                        <FoodContainer>
                            <FoodInfo>음식 정보</FoodInfo>
                            <FoodText>
                                <FoodDetails>해당 식품군: <br />
                                    {getNonZeroNutrients(main.nutrients || {})}</FoodDetails>
                                <FoodDetails>칼로리: {main.food_calorie || '정보 없음'}kcal</FoodDetails>
                            </FoodText>
                            <FoodInfo>레시피</FoodInfo>
                            {main.recipe ? (
                                recipes(main.recipe).map((recipe, index) => (
                                    <RecipeText key={index}>{index + 1}. {recipe.trim()}</RecipeText>
                                ))) : (
                                <RecipeText>레시피 정보가 없습니다.</RecipeText>
                            )}
                        </FoodContainer>
                    )}
                </>
            )}

            {side1.food_name && (
                <>
                    <FoodHeader>
                        <FoodTitle>{side1.food_name}</FoodTitle>
                        <FoodIcon onClick={handleSide1Toggle}>{Side1Toggled ?
                            <BsCaretUpFill /> : <BsCaretDownFill />}</FoodIcon>
                    </FoodHeader>
                    {Side1Toggled && (
                        <FoodContainer>
                            <FoodInfo>음식 정보</FoodInfo>
                            <FoodText>
                                <FoodDetails>해당 식품군: <br />
                                    {getNonZeroNutrients(side1.nutrients || {})}</FoodDetails>
                                <FoodDetails>칼로리: {side1.food_calorie || '정보 없음'}kcal</FoodDetails>
                            </FoodText>
                            <RecipeTitle>레시피</RecipeTitle>
                            {side1.recipe ? (
                                recipes(side1.recipe).map((recipe, index) => (
                                    <RecipeText key={index}>{index + 1}. {recipe.trim()}</RecipeText>
                                ))) : (
                                <RecipeText>레시피 정보가 없습니다.</RecipeText>
                            )}
                        </FoodContainer>
                    )}
                </>
            )}

            {side2.food_name && (
                <>
                    <FoodHeader>
                        <FoodTitle>{side2.food_name}</FoodTitle>
                        <FoodIcon onClick={handleSide2Toggle}>{Side2Toggled ?
                            <BsCaretUpFill /> : <BsCaretDownFill />}</FoodIcon>
                    </FoodHeader>
                    {Side2Toggled && (
                        <FoodContainer>
                            <FoodInfo>음식 정보</FoodInfo>
                            <FoodText>
                                <FoodDetails>해당 식품군: <br />
                                    {getNonZeroNutrients(side2.nutrients || {})}</FoodDetails>
                                <FoodDetails>칼로리: {side2.food_calorie || '정보 없음'}kcal</FoodDetails>
                            </FoodText>
                            <RecipeTitle>레시피</RecipeTitle>
                            {side2.recipe ? (
                                recipes(side2.recipe).map((recipe, index) => (
                                    <RecipeText key={index}>{index + 1}. {recipe.trim()}</RecipeText>
                                ))) : (
                                <RecipeText>레시피 정보가 없습니다.</RecipeText>
                            )}
                        </FoodContainer>
                    )}
                </>
            )}

            {side3.food_name && (
                <>
                    <FoodHeader>
                        <FoodTitle>{side3.food_name}</FoodTitle>
                        <FoodIcon onClick={handleSide3Toggle}>{Side3Toggled ?
                            <BsCaretUpFill /> : <BsCaretDownFill />}</FoodIcon>
                    </FoodHeader>
                    {Side3Toggled && (
                        <FoodContainer>
                            <FoodInfo>음식 정보</FoodInfo>
                            <FoodText>
                                <FoodDetails>해당 식품군: <br />
                                    {getNonZeroNutrients(side3.nutrients || {})}</FoodDetails>
                                <FoodDetails>칼로리: {side3.food_calorie || '정보 없음'}kcal</FoodDetails>
                            </FoodText>
                            <RecipeTitle>레시피</RecipeTitle>
                            {side3.recipe ? (
                                recipes(side3.recipe).map((recipe, index) => (
                                    <RecipeText key={index}>{index + 1}. {recipe.trim()}</RecipeText>
                                ))) : (
                                <RecipeText>레시피 정보가 없습니다.</RecipeText>
                            )}
                        </FoodContainer>
                    )}
                </>
            )}
        </>
    );
}
