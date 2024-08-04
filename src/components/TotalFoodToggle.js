import { BsCaretDownFill } from "react-icons/bs";
import { BsCaretUpFill } from "react-icons/bs";
import { useState } from "react";
import styled from "styled-components";
//default 추가 후에 import 부분 다 수정필요
//api 수정후에 필요한 부분 수정 필요
export function TotalFoodToggle(data){
    const [TotalToggled, setTotalToggled] = useState(false);
    const handleTotalToggle=()=>{
        setTotalToggled(prevState=>!prevState);
    }
    
    const Data = [
        { name: '곡류군', quantity: 3 },
        { name: '채소군', quantity: 2 },
        { name: '어육류군', quantity: 3 },
    ];


    // 총 식품군
    const TotalFood = styled.div`
    width: 300px;
    height: 57px;
    border-radius: 25px;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
    padding-top: 19px;
    color: #3F006C;
    display: flex;
    align-items: center;
    `
    const TotalFoodTitle = styled.span`
    font-family: "Wavve PADO TTF";
    font-size: 20px;
    font-weight: 400;
    padding-left: 15px;
    `
    const TotalFoodIcon = styled.div`
    width: 20px;
    height: 24px;
    margin:auto 14px auto auto;
    cursor: pointer;
    
    `

    const TotalFoodContainer = styled.div`
    width: 300px;
    height: auto;
    display: flex;
    flex-direction: column;
    background-color: #E6E6FA;
    border-radius: 17.772px;
    margin-top: 3px;
    padding-bottom: 9px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    `

    const TotalFoodCalories = styled.span`
    color: #3F006C;
    font-family: "Wavve PADO TTF";
    font-size: 20px;
    font-weight: 400;
    padding: 13px 0px 8px 16px;
    `
    const TotalFoodText = styled.ul`
    color: #3F006C;
    font-family: "Wavve PADO TTF";
    font-size: 20px;
    font-weight: 400;
    margin: 0px;
    `
    const FoodGroups = styled.li`
    margin-bottom: 5px;
    `

    return(
        <>
            <TotalFood>
                <TotalFoodTitle>총 식품군</TotalFoodTitle>
                <TotalFoodIcon onClick={handleTotalToggle}>
                {TotalToggled?
                <BsCaretUpFill/> : <BsCaretDownFill/>}
                </TotalFoodIcon>
            </TotalFood>
            {TotalToggled && (<TotalFoodContainer>
                <TotalFoodCalories>
                    총 칼로리: 1900kcal
                </TotalFoodCalories>
                <TotalFoodText>
                    {Data.map((food, index) => (
                            <FoodGroups key={index}>{food.name}: {food.quantity}개</FoodGroups>
                    ))}
                </TotalFoodText>
            </TotalFoodContainer>)}
    </>
)}