import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import postDailyDataUpdate from '../../APIs/post/postDailyDataUpdate';
import getBloodSugarsState from "../../APIs/get/getBloodSugarsState";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 390px;
  place-items: center;
`

const InfoContainer = styled.div`
  width: 363px;
  height: 285px;
  border: 1.18px solid #6A0DAD;
  border-radius: 11.85px;
  box-shadow: 0px 4.74px 4.74px #B7B7B7;
`

const Title = styled.div`
  font-family: 'WavvePADO-Regular';
  font-size: 28px;
  font-weight: 500;
  margin: 18px 20px;
  width: 323px;
`

const FormSection = styled.div`
  height: 163px;
  margin-left: 0px;
  padding-left: 21px;
`

const FormTitle = styled.div`
  font-size: 21px;
  font-weight: 600;
  margin: 20px 0 5px 0;
`

const FormLabel = styled.label`
  font-size: 21px;
  width: 40px;
  margin-right: 5px;
`

const InputField = styled.input`
  width: 52px;
  height: 26px;
  font-size: 16px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #000000;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 21px;
`

const Button = styled.button`
  width: 78px;
  height: 26px;
  font-family: 'WavvePADO-Regular';
  font-size: 16px;
  font-weight: 600;
  background-color: #E6E6FA;
  color: #6A0DAD;
  border: 0.87px solid #000000 ;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;


const DailyDataUpdate = () => {

  const [date, setDate] = useState('');
  const [bloodsugars, setBloodsugars] = useState({
    fasting_blood_sugar: ['', '', ''],
    post_meal_blood_sugar: ['', '', ''],
  });


// 날짜 형식 변환 함수
const formatDateToServer = (date) => {
  const [month, day] = date.split('/').map(Number);
  const now = new Date();
  const year = now.getFullYear();
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};


  // 혈당 페이지 접속 시 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {

        setDate(getCurrentDate());

        const response = await getBloodSugarsState();
        setBloodsugars({
          fasting_blood_sugar: response.today_data.fasting_blood_sugar,
          post_meal_blood_sugar: response.today_data.post_meal_blood_sugar,
        });

      } catch (error) {
        console.error('DailyDataUpdate 내 getBloodSugarsState에서 에러 발생:', error);
      }
    };
    fetchData();
  }, []);



  const getCurrentDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${month}/${day}`
  }



  // 혈당 데이터 저장하기
  const saveData = async () => {

    try {

      const formattedDate = formatDateToServer(date); // 클라이언트 날짜를 서버 형식으로 변환
      await postDailyDataUpdate(formattedDate, bloodsugars.fasting_blood_sugar, bloodsugars.post_meal_blood_sugar);
      console.log('Blood sugar data saved successfully.');
    } catch (error) {
      console.error('DailyDataUpdate 내 postDailyDataUpdate에서 에러 발생:', error);
    }
  };
  

  // 입력값 변경하기
  const handleBloodSugarChange = (type, index, value) => {
    setBloodsugars(prevState => ({
      ...prevState,
      [type]: prevState[type].map((item, idx) => idx === index ? value : item),
    }));
  };



  return (
    <Container>
      <InfoContainer>
        <Title>{date} 혈당 수치</Title>
        <FormSection>
          <FormTitle>공복 혈당</FormTitle>
          <FormLabel>아침</FormLabel>
          <InputField
            type='number'
            value={bloodsugars.fasting_blood_sugar[0]}
            onChange={(e) => handleBloodSugarChange('fasting_blood_sugar', 0, e.target.value)}
          />
          <FormLabel>점심</FormLabel>
          <InputField
            type='number'
            value={bloodsugars.fasting_blood_sugar[1]}
            onChange={(e) => handleBloodSugarChange('fasting_blood_sugar', 1, e.target.value)}
          />
          <FormLabel>저녁</FormLabel>
          <InputField
            type='number'
            value={bloodsugars.fasting_blood_sugar[2]}
            onChange={(e) => handleBloodSugarChange('fasting_blood_sugar', 2, e.target.value)}
          />
          <FormTitle>식후 2시간 이후 혈당</FormTitle>
          <FormLabel>아침</FormLabel>
          <InputField
            type='number'
            value={bloodsugars.post_meal_blood_sugar[0]}
            onChange={(e) => handleBloodSugarChange('post_meal_blood_sugar', 0, e.target.value)}
          />
          <FormLabel>점심</FormLabel>
          <InputField
            type='number'
            value={bloodsugars.post_meal_blood_sugar[1]}
            onChange={(e) => handleBloodSugarChange('post_meal_blood_sugar', 1, e.target.value)}
          />
          <FormLabel>저녁</FormLabel>
          <InputField
            type='number'
            value={bloodsugars.post_meal_blood_sugar[2]}
            onChange={(e) => handleBloodSugarChange('post_meal_blood_sugar', 2, e.target.value)}
          />
        </FormSection>
        <ButtonContainer><Button onClick={saveData}>저장하기</Button></ButtonContainer>
      </InfoContainer>
    </Container>
  );
};

export default DailyDataUpdate;
