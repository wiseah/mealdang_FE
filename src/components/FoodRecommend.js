
/**
 * 식단 인증 체크 -> 식단 인증 있을 때 띄울 수 있도록
 * 받아오는 내용 생각해볼 것 
 * 상세보기 페이지 작성 후에 진행  
 * 식단 인증시 색상 변경 함수 
 * 상세보기 클릭버튼 
 */

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
    color: #F74A25;
`
// 타이틀 내용 
const TitleTextContainer = styled.div`
    width: 91px;
    height: 38px;
    color: #F74A25;
    font-family: "Wavve PADO TTF";
    font-size: 20px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

// 상세보기 버튼 
const DetailButton = styled.text`
    color: #F74A25;
    text-align: center;
    font-family: "Wavve PADO TTF";
    font-size: 10px;
    font-weight: 400;
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    padding-right:10px;
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
    font-family: "Wavve PADO TTF";
    font-size: 10px;
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
    font-family: "Wavve PADO TTF";
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
    color: #F74A25;
    font-family: "Wavve PADO TTF";
    font-size: 15px;
    font-weight: 400;
    padding-left: 16px;
    padding-top: 10px;
`

// 칼로리 내용
const CalorieContainer = styled.div`
    color: #F74A25 ;
    font-size: 16px;
    font-weight: 400;
    font-family: "Wavve PADO TTF";
    padding: 20px 40px 16px 16px;
    height: 23px;
`


export function FoodRecommend({title, Icon, Content, Calories}){
    const navigate = useNavigate();

    const DetailClick = () => {
        navigate('/FoodDetail');
    }

    return(
        <FoodContainer>
            <TitleContainer>      
                <IconContainer>{Icon}</IconContainer>
                <TitleTextContainer>{title}</TitleTextContainer>
            </TitleContainer>
            <DetailButton onClick={DetailClick}>상세보기</DetailButton>
            <CertificationContainer>
                <CertificationIcon/><CertificationText>식단 인증</CertificationText>
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