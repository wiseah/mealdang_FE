import styled from "styled-components";
import { BsCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const FoodContainer = styled.div`
    width: 151px;
    height: 255px;
    border-radius: 15px;
    background: ${(props) => (props.Certification ? '#F74A25' : '#FFF' )};
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
    font-family: 'Do Hyeon', sans-serif;
    font-size: 20px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

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
`;

const CertificationContainer = styled.div`
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
`;

const CertificationIcon = styled(BsCheck)`
    color:#FF6A4A;
`;

const CertificationText = styled.text`
    color:  #FF6A4A;
    text-align: center;
    font-family: 'Do Hyeon', sans-serif;
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
    font-family: 'Do Hyeon', sans-serif;
    font-size: 13px;
    font-weight: 400;
    padding: 5px;
`;

const CalorieContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    margin-top: 5px;
    font-family: 'Do Hyeon', sans-serif;
    font-size: 12px;
    font-weight: 400;
`;

export function FoodRecommend({ title, Icon, Content, Calories, Certification, dietId }) {
    const navigate = useNavigate();

    const DetailClick = () => {
        navigate(`/aftermain/fooddetail/${dietId}`);
    };

    return (
        <FoodContainer Certification={Certification}>
            <TitleContainer>      
                <IconContainer>{Icon}</IconContainer>
                <TitleTextContainer>{title}</TitleTextContainer>
            </TitleContainer>
            <DetailButton onClick={DetailClick}>상세보기</DetailButton>
            <CertificationContainer>
                {Certification && (
                    <>
                        <CertificationIcon /><CertificationText>식단 인증</CertificationText>
                    </>
                )}
            </CertificationContainer>
            <ContentContainer>
                {Content.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </ContentContainer>           
            <CalorieContainer>{Calories}</CalorieContainer>
        </FoodContainer>
    );
}
