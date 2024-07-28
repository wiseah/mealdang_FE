import styled from "styled-components"
import { FaAppleAlt } from "react-icons/fa";
import { useState } from "react";
import { MdMenuBook } from "react-icons/md";
import { BsCaretDownFill } from "react-icons/bs";
import { BsCaretUpFill } from "react-icons/bs";

// 토글 내리면 나오는 컨테이너 공간 
const FoodContainer = styled.div`
    width: 300px;
    height: auto;
    border-radius: 15px;
    background:  #FFE3C4;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4px;
    padding-bottom: 17px;
`

// 메뉴명
const ContextTitle = styled.div`
    width: 100%;
    color: #FF6A4A;
    font-family: "Wavve PADO TTF";
    font-size: 24px;
    font-weight: 400;
    padding: 14px 0px 8px 30px;
    padding-left: 30px;
    padding-top: 14px;
`

// 메인 음식 입력칸
const MainTitle = styled.input`
    width: 270px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid #FF6A4A;
    background: #FFF;
    font-family: "Wavve PADO TTF";
    font-size: 17px;
    font-weight: 400;
    color:  #FF6A4A;
    text-align: center;
    &::placeholder {
        color: rgba(247, 74, 37, 0.50);
        opacity: 1;
        padding-left: 8px;
    }
    &:focus {
        outline: none; 
        border: 1px solid #FF6A4A; 
        background: #FFF; 
        color:  #FF6A4A;
    }
`

// 해당 식품군 
const FoodGroup = styled.div`
    width: 100%;
    height: 27px;
    display: flex;
    align-items: flex-start;
    padding-left: 30px;
    padding-top: 10px;
    color: #000;
    font-family: "Wavve PADO TTF";
    font-size: 16px;
    font-weight: 400;
`
const FoodGroupIcon = styled(FaAppleAlt)`
    padding-right: 3px;
`

// 음식 정보 식품군 공간
const GroupContainer = styled.div`
    width: 100%;
    height: 34px;
    padding-left: 35px;
    display: flex;
    align-items: center;
`
const GroupTitle = styled.div`
    width: 153px;
    color:  #FF6A4A;
    font-family: "Wavve PADO TTF";
    font-size: 18px;
    font-weight: 400;
`

const GroupCountContainer = () => {

    const [count,setCount] = useState(0);

    const CountContainer = styled.div`
        width: 66px;
        height: 30px;
        border-radius: 10px;
        border: 1px solid #FF6A4A;
        background: #FFF;
        margin-left: 50px;
        margin-right: 16px;
        display: flex;
        align-items: center;
`
    const GroupCount = styled.div`
        width: 17px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FF6A4A;
        text-align: center;
        font-family: "Wavve PADO TTF";
        font-size: 18px;
        font-weight: 400;
        padding-left: 22px;
    `
    const GroupCountIcon = styled.div`
        width: 24px;
        height: 30px;
        display: flex;
        flex-direction: column;
        color: #FF6A4A;
        padding-left: 5px;
        cursor: pointer;
    `

    const increaseCount = () => {
        setCount(prevCount => prevCount + 1);
    };

    const decreaseCount = () => {
        if (count > 0) {setCount(prevCount => prevCount - 1);
        }
    };

    return(
            <CountContainer>
                <GroupCount>{count}</GroupCount>
                <GroupCountIcon>
                    <BsCaretUpFill onClick={increaseCount}/>
                    <BsCaretDownFill onClick={decreaseCount}/>
                </GroupCountIcon>
            </CountContainer>
    )
}

const RecipeTitle = styled.div`
    width: 100%;
    height: 27px;
    display: flex;
    align-items: flex-start;
    padding-left: 30px;
    padding-top: 10px;
    color: #000;
    font-family: "Wavve PADO TTF";
    font-size: 16px;
    font-weight: 400;
`
const RecipeIcon = styled(MdMenuBook)`
    padding-right: 3px;
`
const RecipeContainer = styled.textarea`
    width: 280px;
    height: 144px;
    border-radius: 10px;
    border: 1px solid #FF6A4A;
    background: #FFF;
    color:  #FF6A4A;
    font-family: "Wavve PADO TTF";
    font-size: 17px;
    font-weight: 400;
    padding: 5px;
    &::placeholder {
        color: rgba(255, 106, 74, 0.50); 
        opacity: 1; 
        padding: 14px 10px;
        line-height: 1.5;
    }
    &:focus {
        outline: none; 
        border: 1px solid #FF6A4A; 
        background: #FFF; 
        color:  #FF6A4A;
    }
    
`

export default function DietToggle(){

    return(
        
        <FoodContainer>
            <ContextTitle>메뉴명</ContextTitle>
            <MainTitle placeholder = 'ex) 잡곡밥 1/2공기'/>
            <ContextTitle>음식 정보</ContextTitle>
            <FoodGroup><FoodGroupIcon/>해당 식품군</FoodGroup>
            <>
                <GroupContainer>
                    <GroupTitle>곡류군</GroupTitle>
                    <GroupCountContainer/>
                </GroupContainer>
                <GroupContainer>
                    <GroupTitle>어육류군(저지방군)</GroupTitle>
                    <GroupCountContainer/>
                </GroupContainer>
                <GroupContainer>
                    <GroupTitle>어육류군(중지방군)</GroupTitle>
                    <GroupCountContainer/>
                </GroupContainer>
                <GroupContainer>
                    <GroupTitle>채소군</GroupTitle>
                    <GroupCountContainer/>
                </GroupContainer>
                <GroupContainer>
                    <GroupTitle>지방군</GroupTitle>
                    <GroupCountContainer/>
                </GroupContainer>
                <GroupContainer>
                    <GroupTitle>우유군</GroupTitle>
                    <GroupCountContainer/>
                </GroupContainer>
                <GroupContainer>
                    <GroupTitle>과일군</GroupTitle>
                    <GroupCountContainer/>
                </GroupContainer>
            </>
            <RecipeTitle><RecipeIcon/>레시피</RecipeTitle>
            <RecipeContainer placeholder="자신만의 레시피를 공유해주세요!&#13;&#10;예시)&#13;&#10;1. 잡곡과 쌀을 3:1 비율로 0g 씻는다.&#13;&#10;2. 밥을 짓는다."/>
        </FoodContainer>)
     
    
}