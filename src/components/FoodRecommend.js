

import styled from "styled-components"
import { BsCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

// 전체 설정
const FoodContainer = styled.div`
    width: 151px;
    height: 255px;
    border-radius: 15px;
    background: ${(props) => (props.Certification ? '#F74A25' : '#FFF' )};
    color: ${(props) => (props.Certification ? '#FFF' : '#F74A25')};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
`

// 타이틀 관련 내용 

const TitleContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    padding-left: 10px;
`

// 타이틀 아이콘 
const IconContainer = styled.div`
    width: 20px;
    height: 20px;
`
// 타이틀 내용 
const TitleTextContainer = styled.div`
    width: 91px;
    height: 38px;
    font-family: 'Do Hyeon', sans-serif;
    font-size: 20px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

// 상세보기 버튼 
const DetailButton = styled.text`
    text-align: center;
    font-family: 'Do Hyeon', sans-serif;
    font-size: 15px;
    font-weight: 400;
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    padding-right:10px;
    padding-top: 5px;
`

// 식단 인증 버튼 
const CertificationContainer  = styled.div`
    width: 54px;
    height: 15px;
    border-radius: 3px;
    color: #FFF;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: 'Do Hyeon', sans-serif;
    font-size: 15px;
    font-weight: 400;
    margin-top: 4px;
    margin-left: 88px;
`
const CertificationIcon = styled(BsCheck)`
    color:#FF6A4A;
`
const CertificationText = styled.text`
    color:  #FF6A4A;
    text-align: center;
    font-family: 'Do Hyeon', sans-serif;
    font-size: 10px;
    font-weight: 400;
`

// 식단 내용 
const ContentContainer = styled.div`
    width: 119px;
    height: 118px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    font-family: 'Do Hyeon', sans-serif;
    font-size: 20px;
    font-weight: 400;
    padding-left: 16px;
    padding-top: 10px;
`

// 칼로리 내용
const CalorieContainer = styled.div`
    font-size: 16px;
    font-weight: 400;
    font-family: 'Do Hyeon', sans-serif;
    padding: 20px 0 16px 16px;
    height: 23px;
`


export function FoodRecommend({title, Icon, Content, Calories, Certification}){
    const navigate = useNavigate();

    const DetailClick = (dietId) => {
        navigate(`/aftermain/fooddetail/${dietId}`);
    }

    return(
        <FoodContainer Certification={Certification}>
            <TitleContainer>      
                <IconContainer>{Icon}</IconContainer>
                <TitleTextContainer>{title}</TitleTextContainer>
            </TitleContainer>
            <DetailButton onClick={DetailClick}>상세보기</DetailButton>
            <CertificationContainer>
                {Certification && (
                    <>
                    <CertificationIcon/><CertificationText>식단 인증</CertificationText>
                    </>)}
            </CertificationContainer>
            <ContentContainer>
                {Content.split('\n').map((line, index) => (
                        <div key={index}>{line}</div> 
                    ))}
            </ContentContainer>           
            <CalorieContainer>{Calories}</CalorieContainer>
        </FoodContainer>
    )
}