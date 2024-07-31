import styled from "styled-components";
import { BsPersonFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";


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
    margin: 20px 0px;
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

export default function Ranking(){

    return(
        <Container>
            <Introduce>이번주 식단톤 순위는 ...!</Introduce>
            <ExplainText><ColorWord>하트 수</ColorWord>에 따라 <ColorWord>순위</ColorWord>가 결정돼요</ExplainText>
            <RankingContainer>
                <SecondContainer>
                    <Title>
                        <SecondTitle>행복한 포크와 나이프</SecondTitle>
                    </Title>
                    <UserInfoContainer>
                        <UserContainer>
                            <UserIcon/> 요리사 귤
                        </UserContainer>
                        <UserContainer>
                            <LikeIcon/> 35개
                        </UserContainer>
                    </UserInfoContainer>
                    <SecondImage src='/images/Second.png' alt="secondPlace"/>
                </SecondContainer>
                <FirstContainer>
                    <FirstTitle>
                        칼로리 모험가의 식탁
                    </FirstTitle>
                    <FirstUserInfoContainer>
                        <FirstUserContainer>
                            <FirstUserIcon/> 승민
                        </FirstUserContainer>
                        <FirstUserContainer>
                            <FirstLikeIcon/> 52개
                        </FirstUserContainer>
                    </FirstUserInfoContainer>
                    <FirstImage src='/images/First.png' alt="FirstPlace"/>
                </FirstContainer>
                <ThirdContainer>
                    <Title>
                        <ThirdTitle>마법의 식단</ThirdTitle>
                    </Title>
                    <UserInfoContainer>
                        <UserContainer>
                            <UserIcon/> 홍규티비
                        </UserContainer>
                        <UserContainer>
                            <LikeIcon/> 23개
                        </UserContainer>
                    </UserInfoContainer>
                    <ThirdImage src='/images/Third.png' alt="ThirdPlace"/>
                </ThirdContainer>
            </RankingContainer>
            <RewardMessage>
                <ExplainText>식단톤 우승자에게는 <ColorWord>포도</ColorWord>가 지급됩니다</ExplainText>
            </RewardMessage>
            
        </Container>
    )

}