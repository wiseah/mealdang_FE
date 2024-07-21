import styled from "styled-components";
import 'typeface-inter'
import { AiFillAlert } from "react-icons/ai";
import { useState } from "react";

export function DashBoard(){

    const DashBoardBack = styled.div`
    width: 350px;
    height: 170px;
    border-radius: 17.772px;
    background: var(--Sub, #E6E6FA);
    display: flex;
    justify-content: space-between;
    align-items: center;
    `
// 왼쪽영역
    const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    `

    const CalorieTitle = styled.text`
    width: 187.575px;
    height: 15px; 
    color: #3F006C;
    font-size: 15px;
    font-family: 'Inter',sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 20px 0px 8px 27.25px;
    `

    const Calorie = styled.text`
    width: 187.575px;
    height: 31px;
    color: #3F006C;
    font-family: 'Inter',sans-serif;
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding: 0px 0px 19px 27.25px;
    `
    
    const DayInfoTitle = styled.text`
    width: 187.575px;
    height: 18px;
    color: #3F006C;
    font-family: 'Inter',sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 0px 0px 8px 27.25px;`

    const DayInfo = styled.text`
    width: 187.575px;
    height: 34px;
    color: #3F006C;
    font-family: Inter;
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding: 0px 0px 15px 27.25px;
    `

// 오른쪽 영역 
    const RightSection = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    `

    const AlertBackGround = styled.div`
    width: 114px;
    height: 130px;
    border-radius: 17px;
    background: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `
// 혈당 수치에 따른 색상 변경

// 일단 초기 혈당 수치/ 백엔드와 조율 후 변경예정
// 혈당 수치 받아오는 함수 필요 
    const [bloodSugar, setBloodSugar] = useState(120);

    const AlertIcon = styled(AiFillAlert)`
    width: 75px;
    height: 75px;
    flex-shrink: 0;
    color: ${bloodSugar > 150 ? '#FF4A4A': bloodSugar > 100 ? '#FFAC4A' : '#2ADEA1'};
    `
    const AlertText = styled.text`
    width: 94px;
    height: 31px;
    justify-content: center;
    color: #000;
    text-align: center;
    font-family: "Wavve PADO TTF";
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;`



    const AlertMessage = () => {
        if(bloodSugar>150){
            return '위험해요!';
        } else if (bloodSugar>100){
            return '조심해요!';
        } else{
            return '정상입니다!';
        }
    }

    return(
        <DashBoardBack>
            <LeftSection>
                <CalorieTitle> 하루 권장 섭취 열량 </CalorieTitle>
                <Calorie> 1900Kcal </Calorie>
                <DayInfoTitle>하루 혈당 수치 / 목표 수치</DayInfoTitle>
                <DayInfo> 000 / 000 </DayInfo>
            </LeftSection>
            <RightSection>
                <AlertBackGround>
                    <AlertIcon/>
                    <AlertText>{AlertMessage()}</AlertText>
                </AlertBackGround>
            </RightSection>
        </DashBoardBack>
    )

}