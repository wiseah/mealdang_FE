import styled from "styled-components";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLink } from 'react-icons/bi';
import FoodExchangeListModal from './FoodExchangeListModal';

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
  place-items: center;
`

const Words = styled.div`
  font-family: 'WavvePADO-Regular';
`

const Words1 = styled.div`
  color: #6A0DAD;
  font-size: 30px;
  font-weight: 400;
  margin: 42px auto;
`

const PointWords = styled.span`
  color: #FF6A4A;
`

const Words2 = styled.div`
  font-size: 22px;
  font-weight: 400;
  margin: 21px auto;
`

const ExchangeList = styled.div`
  background-color: #E6E6FA;
  width: 354px;
  height: 354px;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 4px 4px #B7B7B7;
  font-family: 'WavvePADO-Regular';
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
  font-family: 'WavvePADO-Regular';
  color: #ffffff;
  text-align: center;
  cursor: pointer;
`

const FoodExchangeList = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('')
  const [daily_calorie, setDaily_calorie] = useState('');
  const [grain, setGrain] = useState('');
  const [fish_meat_low_fat, setFish_meat_low_fat] = useState('')
  const [fish_meat_medium_fat, setFish_meat_medium_fat] = useState('');
  const [vegetable, setVegetable] = useState('');
  const [fat, setFat] = useState('')
  const [dairy, setDairy] = useState('');
  const [fruit, setFruit] = useState('');

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Container>
      <Words>
        <Words1>{nickname}님의 하루 권장 섭취량은 <br /> <PointWords>{daily_calorie}Kcal</PointWords>입니다</Words1>
        <Words2>
          식품교환표<BiLink size={19} color="black" onClick={() => setModalOpen(true)} cursor="pointer" />에 따른 식품군 당
          <br /> 섭취량은..
        </Words2>
      </Words>

      <ExchangeList>
        <ListItems>곡류군 {'\u00A0'}{'\u00A0'} {grain}</ListItems>
        <ListItems>어육류군(저지방군) {'\u00A0'}{'\u00A0'} {fish_meat_low_fat}</ListItems>
        <ListItems>어육류군(중지방군) {'\u00A0'}{'\u00A0'} {fish_meat_medium_fat}</ListItems>
        <ListItems>채소군 {'\u00A0'}{'\u00A0'} {vegetable}</ListItems>
        <ListItems>지방군 {'\u00A0'}{'\u00A0'} {fat}</ListItems>
        <ListItems>우유군 {'\u00A0'}{'\u00A0'} {dairy}</ListItems>
        <ListItems>과일군 {'\u00A0'}{'\u00A0'} {fruit}</ListItems>
      </ExchangeList>

      <Start onClick={() => navigate('/main')}>밀당 시작하기</Start>

      {modalOpen && <FoodExchangeListModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />}

    </Container >
  )
}

export default FoodExchangeList;
