import React, {useState} from 'react'
import styled from 'styled-components'
import { DashBoard } from '../../components/Dashboard'
import { BsFillStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { FoodRecommendBack } from '../../components/FoodRecommendBack';
import { IoIosArrowRoundForward } from "react-icons/io";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`

const Greeting = styled.div`
  color: #000;
  font-family: "Wavve PADO TTF";
  font-size: 30px;
  font-weight: 400;
  display: flex;
  align-self: flex-start;
  padding-bottom: 16px;
  padding-left: 33px;
`
const FoodTitle = styled.div`
  color: #000;
  font-family: "Wavve PADO TTF";
  font-size: 30px;
  font-weight: 400;
  display: flex;
  align-self: flex-start;
  padding: 34px 0px 10px 33px;
`
const FillStarIcon = styled(BsFillStarFill)`
    padding-left: 7px;
    padding-bottom: 3px;
    color: #F74A25;
    cursor: pointer;
`
const EmptyStarIcon = styled(BsStar)`
  padding-left: 7px;
  padding-bottom: 3px;
  color: #F74A25;
  cursor: pointer;
`
const RecommendButton = styled.div`
  width: 100%;
  color: #000;
  font-family: "Wavve PADO TTF";
  font-size: 18px;
  font-weight: 400;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  padding: 3px 50px 15px 0px;
`

// 이전, 다음 버튼 관련 내용

const TurnContainer = styled.div`
  display: flex;
  align-items: center;
`

const Previous = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  
`
const Next = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const PreviousBtn = styled.div`
  color: #F74A25;
  text-align: center;
  font-family: "Wavve PADO TTF";
  font-size: 17px;
  font-weight: 400;
  padding-right: 16px;
`

const PreviousIcon = styled(BiChevronLeft)`
  color:#F74A25;
  width: 25px;
  height: 25px;
`


const NextBtn = styled.div`
  color:  #F74A25;
  text-align: center;
  font-family: "Wavve PADO TTF";
  font-size: 17px;
  font-weight: 400;
  padding-left: 16px;
`

const NextIcon = styled(BiChevronRight)`
  color:#F74A25;
  width: 25px;
  height: 25px;
`


function AfterMain() {

  // 즐겨찾기 버튼 관련 함수

  const [StarActive, setStarActive] = useState(false);

  const StarClick = () =>{
    setStarActive(!StarActive);
  }

  // 다시 추천받기 버튼 관련 함수 

  const [RecommendBtnActive, setRecommendBtnActive]= useState(false);

  const RecommendBtnClick = () =>{
    setRecommendBtnActive(true);
  }

  // 이전, 다음 버튼 관련 함수 

  const [currentIndex, setCurrentIndex] = useState(0); 

  const PreviousClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); 
    }
  };
  
  const NextClick = () => {
    if(currentIndex<4){
      setCurrentIndex(currentIndex +1);
    }
  }

  return (
    <Container>
        <Greeting>
          오늘도 반가워요, 승민님
        </Greeting>
        <DashBoard/>
        <FoodTitle>
          오늘의 추천식단{StarActive ?(<FillStarIcon active = {true} onClick = {StarClick}/>) : (<EmptyStarIcon onClick={StarClick}/>)}
        </FoodTitle> 
        <RecommendButton onClick={RecommendBtnClick}>
          다시 추천받기<IoIosArrowRoundForward/>
        </RecommendButton>
        <FoodRecommendBack/>
        <TurnContainer>
          <Previous onClick={PreviousClick} >
            <PreviousIcon/><PreviousBtn>이전</PreviousBtn>
          </Previous>
          <Next onClick={NextClick}>
            <NextBtn>다음</NextBtn><NextIcon/>
          </Next>
      </TurnContainer>
    </Container>
  )
}

export default AfterMain
