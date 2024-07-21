import React, {useState} from 'react'
import styled from 'styled-components'
import { DashBoard } from '../components/Dashboard'
import { BiSolidPlusCircle } from "react-icons/bi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  .Greeting{
    padding-bottom: 16px;
  }
  .FoodTitle{
    padding: 34px 0px 16px 33px;
    align-self: flex-start;
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
`
const FoodContainer = styled.div`
  width: 350px;
  height: 300px;
  flex-shrink: 0;
  border: 2px dashed var(--Main, #6A0DAD);
  background: #FFF;
  margin: 0px 20px 59px 20px;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  `
const Icon = styled(BiSolidPlusCircle)`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  fill: #6A0DAD;
  justify-content: center;
`

function Main() {

  const [FoodModal, setFoodModal] = useState(false);

  const IconClick = () => {
    setFoodModal(true); 
  };

  const CloseModal = () => {
    setFoodModal(false); 
  };

  return (
    <Container>
      <div className='Greeting'>
        <Greeting>오늘도 반가워요, 승민님</Greeting>
      </div>
      <div className='DashBoardContainer'>
        <DashBoard/>
      </div>
      <div className='FoodTitle'>
        <FoodTitle>오늘의 추천식단</FoodTitle> 
      </div>
      <div className='FoodContainer'>
        <FoodContainer><Icon onClick={IconClick}/></FoodContainer>
      </div>
    </Container>
  )
}

export default Main
