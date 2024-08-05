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
    fasting_blood_sugar: {morning: '',noon: '',evening: '' },
    post_meal_blood_sugar: {morning: '',noon: '',evening: '' },
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
  
          const response = await getBloodSugarsState(); // 혈당 상태 데이터 가져오기
          console.log('Fetched blood sugar state:', response);
  
          // 응답 데이터 유효성 검사
          if (response && response.today_data && Array.isArray(response.today_data) && response.today_data.length > 0) {
          const todayData = response.today_data;
              
              setBloodsugars({
                  fasting_blood_sugar: {
                      morning: todayData.fasting_blood_sugar.morning || '',
                      noon: todayData.fasting_blood_sugar.noon || '',
                      evening: todayData.fasting_blood_sugar.evening || '',
                  },
                  post_meal_blood_sugar: {
                      morning: todayData.post_meal_blood_sugar.morning || '',
                      noon: todayData.post_meal_blood_sugar.noon || '',
                      evening: todayData.post_meal_blood_sugar.evening || '',
                  },
              });
          }
      } catch (error) {
          console.error('DailyDataUpdate 내 getBloodSugarsState에서 에러 발생:', error);
      }
  };
    // 로컬 스토리지에서 데이터 불러오기
    const localData = localStorage.getItem('bloodsugars');
    if (localData) {
      setBloodsugars(JSON.parse(localData));
    }
    
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
      const formattedDate = formatDateToServer(date);
      const fastingBloodSugar = {
        morning: parseInt(bloodsugars.fasting_blood_sugar.morning, 10),
        noon: parseInt(bloodsugars.fasting_blood_sugar.noon, 10),
        evening: parseInt(bloodsugars.fasting_blood_sugar.evening, 10),
      };
      const postMealBloodSugar = {
        morning: parseInt(bloodsugars.post_meal_blood_sugar.morning, 10),
        noon: parseInt(bloodsugars.post_meal_blood_sugar.noon, 10),
        evening: parseInt(bloodsugars.post_meal_blood_sugar.evening, 10),
      };
  
      // postDailyDataUpdate 호출 시 각각의 인자를 전달
      await postDailyDataUpdate(formattedDate, fastingBloodSugar, postMealBloodSugar);
      console.log('Blood sugar data saved successfully.');
    } catch (error) {
      console.error('DailyDataUpdate 내 postDailyDataUpdate에서 에러 발생:', error);
    }
  };
  
  


  const handleBloodSugarChange = (type, time, value) => {
    setBloodsugars(prevState => {
      const newState = {
        ...prevState,
        [type]: {
          ...prevState[type],
          [time]: value,
        },
      };
      // 변경된 값을 로컬 스토리지에 저장
      localStorage.setItem('bloodsugars', JSON.stringify(newState));
      return newState;
    });
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
            value={bloodsugars.fasting_blood_sugar.morning}
            onChange={(e) => handleBloodSugarChange('fasting_blood_sugar', 'morning', e.target.value)}
          />
          <FormLabel>점심</FormLabel>
          <InputField
            type='number'
            value={bloodsugars.fasting_blood_sugar.noon}
            onChange={(e) => handleBloodSugarChange('fasting_blood_sugar', 'noon', e.target.value)}
          />
          <FormLabel>저녁</FormLabel>
          <InputField
            type='number'
            value={bloodsugars.fasting_blood_sugar.evening}
            onChange={(e) => handleBloodSugarChange('fasting_blood_sugar', 'evening', e.target.value)}
          />

          <FormTitle>식후 2시간 이후 혈당</FormTitle>
          <FormLabel>아침</FormLabel>
          <InputField
            type='number'
            value={bloodsugars.post_meal_blood_sugar.morning}
            onChange={(e) => handleBloodSugarChange('post_meal_blood_sugar', 'morning', e.target.value)}
          />
          <FormLabel>점심</FormLabel>
          <InputField
            type='number'
            value={bloodsugars.post_meal_blood_sugar.noon}
            onChange={(e) => handleBloodSugarChange('post_meal_blood_sugar', 'noon', e.target.value)}
          />
          <FormLabel>저녁</FormLabel>
          <InputField
            type='number'
            value={bloodsugars.post_meal_blood_sugar.evening}
            onChange={(e) => handleBloodSugarChange('post_meal_blood_sugar', 'evening', e.target.value)}
          />
        </FormSection>
        <ButtonContainer><Button onClick={saveData}>저장하기</Button></ButtonContainer>
      </InfoContainer>
    </Container>
  );
};

export default DailyDataUpdate;
