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

  .Greeting{
    padding-bottom: 16px;
  }
  .FoodTitle{
    padding: 34px 0px 10px 33px;
    align-self: flex-start;
  }
  .RecommendBtn{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 0px 50px 8px 0px;
  }
`

const Greeting = styled.text`
  color: #000;
  font-family: "Wavve PADO TTF";
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 16px;
`
const FoodTitle = styled.text`
  color: #000;
  font-family: "Wavve PADO TTF";
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
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
  color: #000;
  text-align: center;
  font-family: "Wavve PADO TTF";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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

const PreviousBtn = styled.text`
  color: var(--unnamed, #F74A25);
  text-align: center;
  font-family: "Wavve PADO TTF";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-right: 16px;
`

const PreviousIcon = styled(BiChevronLeft)`
  color:#F74A25;
  width: 20px;
  height: 20px;
`


const NextBtn = styled.text`
  color: var(--unnamed, #F74A25);
  text-align: center;
  font-family: "Wavve PADO TTF";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-left: 16px;
`

const NextIcon = styled(BiChevronRight)`
  color:#F74A25;
  width: 20px;
  height: 20px;
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
      <div className='Greeting'>
        <Greeting>오늘도 반가워요, 승민님</Greeting>
      </div>
      <div className='DashBoardContainer'>
        <DashBoard/>
      </div>
      <div className='FoodTitle'>
        <FoodTitle>오늘의 추천식단{StarActive ?(<FillStarIcon active = {true} onClick = {StarClick}/>) : (<EmptyStarIcon onClick={StarClick}/>)}</FoodTitle> 
      </div>
      <div className='RecommendBtn' onClick={RecommendBtnClick}>
        <RecommendButton>다시 추천받기<IoIosArrowRoundForward/></RecommendButton>
        </div>
      <div className='FoodContainer'>
        <FoodRecommendBack></FoodRecommendBack>
      </div>
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

export default AfterMain;
