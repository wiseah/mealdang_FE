import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLink } from 'react-icons/bi';
import FoodExchangeListModal from '../Landing/FoodExchangeListModal';
import getFoodExchangeList from '../../APIs/get/getFoodExchangeList';


const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
  place-items: center;
`

const Words = styled.div`
font-family: 'Do Hyeon', sans-serif;
`

const Words1 = styled.div`
  color: #6A0DAD;
  font-size: 27px;
  font-weight: 400;
  margin: 42px 18px;
`

const PointWords = styled.span`
  color: #FF6A4A;
`

const Words2 = styled.div`
  font-size: 22px;
  font-weight: 400;
  margin: 21px 18px;
`

const ExchangeList = styled.div`
  background-color: #E6E6FA;
  width: 354px;
  height: 354px;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 4px 4px #B7B7B7;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 30px;
`

const ListItems = styled.li`
  list-style: none;
  margin: 13px;
`

const Start = styled.button`
  width: 350px;
  height: 56px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 4px 4px #B7B7B7;
  box-sizing: border-box;
  background-color: #6A0DAD;
  margin: 26.5px 35px 18px 35px;
  font-size: 30px;
  font-weight: 400;
  font-family: 'Do Hyeon', sans-serif;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
`

const FoodExchangeList = () => {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const [content, setContent] = useState({
    "nickname": "닉네임",
    "food_exchange": {
      "energy_calorie": "?",
      "grain": "?",
      "fish_meat_low_fat": "?",
      "fish_meat_medium_fat": "?",
      "vegetable": "?",
      "fat": "?",
      "dairy": "?",
      "fruit": "?",
    }

  })



  useEffect(() => {
    const fetchFoodExchangeListData = async () => {
      try {

        const response = await getFoodExchangeList();
        setContent(response);

        console.log(content);

      } catch (error) {
        console.error('message:', error.message);
        alert('매칭되는 식품교환표를 찾지 못했습니다.');
      }
    };

    fetchFoodExchangeListData();
  }, []);


  return (
    <Container>
      <Words>
        <Words1>{content.nickname}님의 하루 권장 섭취량은  <PointWords>{content.food_exchange.energy_calorie}Kcal</PointWords>입니다</Words1>
        <Words2>
          식품교환표<BiLink size={19} color="black" onClick={() => setModalOpen(true)} cursor="pointer" />에 따른 식품군 당
          <br /> 섭취량은..
        </Words2>
      </Words>

      <ExchangeList>
        <ListItems>곡류군 {'\u00A0'}{'\u00A0'} {content.food_exchange.grain}</ListItems>
        <ListItems>어육류군(저지방군) {'\u00A0'}{'\u00A0'} {content.food_exchange.fish_meat_low_fat}</ListItems>
        <ListItems>어육류군(중지방군) {'\u00A0'}{'\u00A0'} {content.food_exchange.fish_meat_medium_fat}</ListItems>
        <ListItems>채소군 {'\u00A0'}{'\u00A0'} {content.food_exchange.vegetable}</ListItems>
        <ListItems>지방군 {'\u00A0'}{'\u00A0'} {content.food_exchange.fat}</ListItems>
        <ListItems>우유군 {'\u00A0'}{'\u00A0'} {content.food_exchange.dairy}</ListItems>
        <ListItems>과일군 {'\u00A0'}{'\u00A0'} {content.food_exchange.fruit}</ListItems>
      </ExchangeList>


      <Words>
        <Words2>
          몸무게가 변화할 경우, 권장 섭취량도 <br/> 변경됩니다.
        </Words2>
      </Words>

      {modalOpen && <FoodExchangeListModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />}

    </Container >
  )
}

export default FoodExchangeList;
