import styled from "styled-components";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmButton from '../../components/ConfirmButton';
import diagnosis from "../../APIs/patch/diagnosis";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 390px;
  min-height: 100vh;
  font-family: 'WavvePADO-Regular';
`

const Words = styled.div`
  font-family: 'WavvePADO-Regular';
  font-size: 22px;
  font-weight: 400;
  margin: 41px auto;
  margin-left: 0px;
  padding-left: 19px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 0 20px;
`

const FormItem = styled.div`
  margin-bottom: 41px;
`

const ItemLabel = styled.label`
  font-size: 25px;
  color: #737373;
`

const RequireSpan = styled.span`
  color: red;
`

const RadioContainer = styled.div`
  display: flex;
  margin-top: 10px;
`

const RadioLabel = styled.label`
  font-family: 'WavvePADO-Regular';
  font-size: 25px;
  font-weight: 400;
  color: #000000;
  padding: 0 50px 0 0;
`

const RadioInput = styled.input`
  width: 22px;
  height: 22px;
  appearance: none;
  -webkit-appearance: none;
  border: 2px solid #000000;
  outline: none;
  border-radius: 50%;
  margin: 10px 10px 0 0;

  &:checked {
    background-color: #000000;
    border: 3.9px solid #ffffff;
    box-shadow: 0 0 0 1.6px #000000;
  }
`

const NumberInput = styled.input`
  width: 350px;
  height: 56px;
  border: 1px solid #737373;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px #B7B7B7;
  margin: 8px auto;
  font-size: 20px;
  font-weight: 400;
  font-family: 'WavvePADO-Regular';
  text-align: center;

  &::placeholder {
      font-size: 20px;
      color: #B8B8B8;
    }

`


const Diagnosis = () => {
  const navigate = useNavigate();

  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [is_diabetes, setIs_diabetes] = useState('no');
  const [fasting_blood_sugar, setFasting_blood_sugar] = useState('');
  const [post_meal_blood_sugar, setPost_meal_blood_sugar] = useState('');


  const handleGenderChange = (e) => {
    setGender(e.target.value);
  }

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  }

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  }

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  }

  const handleIs_diabetesChange = (e) => {
    setIs_diabetes(e.target.value);
    if (e.target.value === 'no') {
      setFasting_blood_sugar('');
      setPost_meal_blood_sugar('');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!gender || !age || !height || !weight || (is_diabetes === 'yes' && !fasting_blood_sugar)) {
        alert('필수 항목을 모두 입력하세요.');
      } else {
        console.log('data save success');
        navigate('/foodExchangeList');
      }

      const response = await diagnosis(gender, age, height, weight, is_diabetes, fasting_blood_sugar, post_meal_blood_sugar)
      console.log(response)
      console.log('진단테스트가 완료되었습니다.');
      navigate('/joinSuccess');
    } catch {
      console.error('messages: ', response.messages)
      alert('진단테스트 저장에 실패했습니다.')
    }

  }

  return (
    <Container>
      <Words>
        맞춤형 식단을 제공해드릴 수 있도록 <br /> 정확한 정보를 입력해주세요
      </Words>
      <Form>
        <FormItem>
          <ItemLabel>성별<RequireSpan>*</RequireSpan></ItemLabel>
          <RadioContainer>
            <RadioLabel>
              <RadioInput
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={handleGenderChange}
              /> 남성
            </RadioLabel>
            <RadioLabel>
              <RadioInput
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={handleGenderChange}
              /> 여성
            </RadioLabel>
          </RadioContainer>
        </FormItem>

        <FormItem>
          <ItemLabel>나이<RequireSpan>*</RequireSpan></ItemLabel>
          <div>
            <NumberInput
              type="number"
              value={age}
              onChange={handleAgeChange}
              placeholder="나이"
              required />
          </div>
        </FormItem>

        <FormItem>
          <ItemLabel>키<RequireSpan>*</RequireSpan></ItemLabel>
          <div>
            <NumberInput
              type="number"
              value={height}
              onChange={handleHeightChange}
              placeholder="키"
              required />
          </div>
        </FormItem>

        <FormItem>
          <ItemLabel>몸무게<RequireSpan>*</RequireSpan></ItemLabel>
          <div>
            <NumberInput
              type="number"
              value={weight}
              onChange={handleWeightChange}
              placeholder="몸무게"
              required />
          </div>
        </FormItem>

        <FormItem>
          <ItemLabel>당뇨 여부<RequireSpan>*</RequireSpan></ItemLabel>
          <RadioContainer>
            <RadioLabel>
              <RadioInput
                type="radio"
                name="is_diabetes"
                value="yes"
                checked={is_diabetes === 'yes'}
                onChange={handleIs_diabetesChange}
              /> 예
            </RadioLabel>
            <RadioLabel>
              <RadioInput
                type="radio"
                name="is_diabetes"
                value="no"
                checked={is_diabetes === 'no'}
                onChange={handleIs_diabetesChange}
              /> 아니요
            </RadioLabel>
          </RadioContainer>
        </FormItem>

        {is_diabetes === 'yes' && (
          <>
            <FormItem>
              <ItemLabel>공복 혈당<RequireSpan>*</RequireSpan></ItemLabel>
              <div>
                <NumberInput
                  type="number"
                  value={fasting_blood_sugar}
                  onChange={(e) => setFasting_blood_sugar(e.target.value)}
                  placeholder="공복 혈당"
                  required />
              </div>
            </FormItem>

            <FormItem>
              <ItemLabel>식후 2시간 이후 혈당</ItemLabel>
              <div>
                <NumberInput
                  type="number"
                  value={post_meal_blood_sugar}
                  onChange={(e) => setPost_meal_blood_sugar(e.target.value)}
                  placeholder="식후 2시간 이후 혈당" />
              </div>
            </FormItem>
          </>
        )}

        <ConfirmButton type='submit' onClick={handleSubmit} text="분석 결과 확인하기" textAlign="center" paddingLeft="0" color="#ffffff" backgroundColor="#6A0DAD" />
      </Form>
    </Container>
  )
}

export default Diagnosis;