import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DashBoard } from '../../components/Dashboard'
import { BsFillStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { FoodRecommendBack } from '../../components/FoodRecommendBack';
import { IoIosArrowRoundForward } from "react-icons/io";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import getMain from '../../APIs/get/getMain';
import patchMainHeart from '../../APIs/patch/patchMainHeart';


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
  color: ${props => (props.disabled ? '#B0B0B0' : '#000')};
  font-family: "Wavve PADO TTF";
  font-size: 18px;
  font-weight: 400;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
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
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${props => (props.disabled ? '#B0B0B0' : '#F74A25')};
`

const Next = styled.div`
  display: flex;
  align-items: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${props => (props.disabled ? '#B0B0B0' : '#F74A25')};
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

  const [nickname, setNickname] = useState('닉네임');
  const [recommendCount, setRecommendCount] = useState(0);
  const [dietSets, setDietSets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [is_like, setIs_like] = useState(false);

  const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await getMain();
        setNickname(response.nickname);
        setRecommendCount(response.recommend_count);
        setDietSets(response.diet_sets);
        setCurrentIndex(0); // 인덱스 초기화, 새로 추천 받은 식단이 인데스 0이게 만들기

        console.log(response);

      } catch (error) {
        console.error('에러 발생:', error.message);
      }
    };

    fetchData();
  }, []);



const is_likeClick = async () => {
    try {

      setIs_like(!is_like);

      const response = await patchMainHeart(response.diet_sets.diet_set_id, !is_like);

      console.log(response.message);
    } catch (error) {
      console.error('즐겨찾기 업데이트 실패:', error);
    }
  }
  


  const RecommendBtnClick = async () => {
    try {
      if (recommendCount >= 3) {
        alert('식단 추천은 세 번까지 받을 수 있습니다.');
        return;
      }

      const response = await getMain();
      setRecommendCount(response.recommend_count);
      setDietSets(response.diet_sets);
      setCurrentIndex(0);
    } catch (error) {
      console.error('추천 받기 실패:', error);
    }
  };



  useEffect(() => {
    setIsPreviousDisabled(currentIndex <= 0);
    setIsNextDisabled(currentIndex >= dietSets.length - 1);
  }, [currentIndex, dietSets.length]);


  const PreviousClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const NextClick = () => {
    if (currentIndex < dietSets.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <Container>
      <Greeting>
        오늘도 반가워요, {nickname}님
      </Greeting>
      <DashBoard />
      {/* <FoodTitle>
        오늘의 추천식단{is_like ? (<FillStarIcon active={true} onClick={is_likeClick} />) : (<EmptyStarIcon onClick={is_likeClick} />)}
      </FoodTitle> */}
       <FoodTitle>
        오늘의 추천식단
        {is_like ? (
          <FillStarIcon onClick={is_likeClick} />
        ) : (
          <EmptyStarIcon onClick={is_likeClick} />
        )}
      </FoodTitle>
      <RecommendButton
        onClick={RecommendBtnClick}
        disabled={recommendCount >= 3}>
        다시 추천받기<IoIosArrowRoundForward />
      </RecommendButton>
      <FoodRecommendBack dietSet={dietSets[currentIndex]} />
      <TurnContainer>
        <Previous onClick={PreviousClick} disabled={isPreviousDisabled}>
          <PreviousIcon /><PreviousBtn>이전</PreviousBtn>
        </Previous>
        <Next onClick={NextClick} disabled={isNextDisabled}>
          <NextBtn>다음</NextBtn><NextIcon />
        </Next>

      </TurnContainer>
    </Container>
  )
}

export default AfterMain