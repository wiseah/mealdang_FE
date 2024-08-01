import styled from "styled-components";
import { BsPersonFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { useState, useEffect } from "react";


// 전체 공간
const Container = styled.div`
    width: 390px;
    height: 373px;
    border-radius: 0px 0px 80px 80px;   
    background: #E6E6FA;
    box-shadow: 0px 6px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
`
// 소개멘트
const Introduce = styled.div`
    width: 292px;
    color: #6A0DAD;
    font-family: "Wavve PADO TTF";
    font-size: 28px;
    font-weight: 400;
    padding-top: 27px;
`
const ExplainText = styled.div`
    width: 100%;
    height: 23px;
    color: #6A0DAD;
    text-align: center;
    font-family: "Wavve PADO TTF";
    font-size: 16px;
    font-weight: 400;
    padding-top: 10px;
`

const ColorWord = styled.span`
    color: #ff6A4A;
`

// 수상대 공간
const RankingContainer = styled.div`
    height: 200px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`



// 1등 
const FirstContainer = styled.div`
    width: 124px;
    height: 180px;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-right: 12px;
`
const FirstTitle = styled.span`
    width: 102px;
    height: 43px;
    color: #000;    
    text-align: center;
    font-family: "Wavve PADO TTF";
    font-size: 21px;
    font-weight: 400;
    margin-top: 28px;
`
const FirstUserInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #6A0DAD;
    font-family: "Wavve PADO TTF";
    font-size: 14px;
    font-weight: 400;
    margin-top: 33px;
`

const FirstUserContainer = styled.div`
    width: 79px;
    display: flex;
    align-items: center;
`

const FirstUserIcon = styled(BsPersonFill)`
    width: 30px;
    height: 30px;
    margin-right: 5px;
`

const FirstLikeIcon = styled(AiFillHeart)`
    width: 30px;
    height: 30px;
    margin-right: 5px;
`
const FirstImage = styled.img`
    position: absolute;
    top: -25px;
    right: -25px;
    width: 50px;
    height: 50px;
    `

// 2,3등 공동 사용
const Title = styled.div`
    width: 102px;
    height: auto;
    color: #000;
    text-align: center;
    font-family: "Wavve PADO TTF";
    font-size: 16px;
    font-weight: 400;
`
const UserInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #6A0DAD;
    font-family: "Wavve PADO TTF";
    font-size: 12px;
    font-weight: 400;
    
`
const UserContainer = styled.div`
    width: 75px;
    height: 25px;
    display: flex;
    align-items: center;
`
const UserIcon = styled(BsPersonFill)`
    width: 20px;
    height: 20px;
    margin-right: 5px;
`
const LikeIcon = styled(AiFillHeart)`
    width: 20px;
    height: 20px;
    margin-right: 5px;
`
// 2등
const SecondContainer = styled.div`
    width: 100px;
    height: 140px;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
    position: relative;
    margin-right: 14px;
`

const SecondTitle = styled.div`
    height: 43px;
    margin: 18px 0px;
`
const SecondImage = styled.img`
    position: absolute;
    top: -15px;
    right: -15px;
    width: 35px;
    height: 35px;
`
const ThirdContainer = styled.div`
    width: 100px;
    height: 120px;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
    position: relative;
`
const ThirdTitle = styled.div` 
    height: 43px;
    margin: 8px 0px 7px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ThirdImage = styled.img`
    position: absolute;
    top: -15px;
    right: -15px;
    width: 27.5px;
    height: 27.5px;
`
const RewardMessage = styled.div`
    margin-top: 20px;
`

// 새로 추가된 로딩 및 데이터 없음 상태를 위한 스타일
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  justify-content: center;
`;

const LoadingMessage = styled.div`
  color: #6A0DAD;
  font-family: "Wavve PADO TTF";
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 20px;
`;

const LoadingSubMessage = styled.div`
  color: #ff6A4A;
  font-family: "Wavve PADO TTF";
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 10px;
`;

export default function Ranking({ first, second, third, isLoading }){
    //로딩 및 데이터 없는 상태에 가운데 부분 if문
    const [dots, setDots] = useState('');

    useEffect(() => {
        if (isLoading || !first || !second || !third) {
            const interval = setInterval(() => {
              setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
            }, 500);
  
        return () => clearInterval(interval);
      }
    }, [isLoading, first, second, third]);
  
    const renderContent = () => {
      if (isLoading || !first || !second || !third) {
        return (
          <LoadingContainer>
            <LoadingMessage>{`순위 결정중${dots}`}</LoadingMessage>
          </LoadingContainer>
        );
      }  

        return (
            <RankingContainer>
                <SecondContainer>
                    <Title>
                        <SecondTitle>{second.diet_name}</SecondTitle>
                    </Title>
                    <UserInfoContainer>
                        <UserContainer>
                            <UserIcon/> {second.second_nickname}
                        </UserContainer>
                        <UserContainer>
                            <LikeIcon/> {second.heart}개
                        </UserContainer>
                    </UserInfoContainer>
                    <SecondImage src='/images/Second.png' alt="secondPlace"/>
                </SecondContainer>
                <FirstContainer>
                    <FirstTitle>
                        {first.diet_name}
                    </FirstTitle>
                    <FirstUserInfoContainer>
                        <FirstUserContainer>
                            <FirstUserIcon/> {first.first_nickname}
                        </FirstUserContainer>
                        <FirstUserContainer>
                            <FirstLikeIcon/> {first.heart}개
                        </FirstUserContainer>
                    </FirstUserInfoContainer>
                    <FirstImage src='/images/First.png' alt="FirstPlace"/>
                </FirstContainer>
                <ThirdContainer>
                    <Title>
                        <ThirdTitle>{third.diet_name}</ThirdTitle>
                    </Title>
                    <UserInfoContainer>
                        <UserContainer>
                            <UserIcon/> {third.third_nickname}
                        </UserContainer>
                        <UserContainer>
                            <LikeIcon/> {third.heart}개
                        </UserContainer>
                    </UserInfoContainer>
                    <ThirdImage src='/images/Third.png' alt="ThirdPlace"/>
                </ThirdContainer>
            </RankingContainer>
        );
    }

    return(
        <Container>
            <Introduce>이번주 식단톤 순위는 ...!</Introduce>
            <ExplainText><ColorWord>하트 수</ColorWord>에 따라 <ColorWord>순위</ColorWord>가 결정돼요</ExplainText>
            {renderContent()}
            <RewardMessage>
                <ExplainText>식단톤 우승자에게는 <ColorWord>포도</ColorWord>가 지급됩니다</ExplainText>
            </RewardMessage>
        </Container>
    )
}