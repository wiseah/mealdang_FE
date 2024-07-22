import styled from "styled-components";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmButton from '../../components/ConfirmButton';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 390px;
  min-height: 100vh;
`

const Words = styled.div`
  font-size: 22px;
  font-weight: 400;
  margin: 42px auto;
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
  font-family: 'WavvePADO-Regular';
  font-size: 25px;
  color: #FF6A4A;
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
  color: #FF6A4A;
  padding: 0 50px 0 0;
  cursor: pointer;
  display: flex;
  flex-direction: row;
`

const RadioInput = styled.input`
  width: 22px;
  height: 22px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 2px solid #FF6A4A;
  outline: none;
  border-radius: 50%;
  margin: 10px 10px 0 0;
  cursor: pointer;

  &:checked {
    background-color: #FF6A4A;
    border: 3.9px solid #ffffff;
    box-shadow: 0 0 0 1.3px #FF6A4A;
  }
`

const Text = styled.div`
  display: flex;
  margin-top: 7px;
`


const InputField = styled.input`
  width: 350px;
  height: 56px;
  border: 1px solid #FF6A4A;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px #B7B7B7;
  margin: 8px auto;
  font-size: 20px;
  font-weight: 400;
  color: #FF6A4A;
  font-family: 'WavvePADO-Regular';
  text-align: center;
`

const NumberInput = styled.input`
  width: 350px;
  height: 56px;
  border: 1px solid #FF6A4A;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px #B7B7B7;
  margin: 8px auto;
  font-size: 20px;
  font-weight: 400;
  color: #FF6A4A;
  font-family: 'WavvePADO-Regular';
  text-align: center;
`


const MyInfo = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [diabetes, setDiabetes] = useState('no');


  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  }

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

  const handleDiabetesChange = (e) => {
    setDiabetes(e.target.value);
  };

    // 데이터 불러오기


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nickname || !gender || !age || !height || !weight || !diabetes) {
      alert('필수 항목을 모두 입력하세요.');
    } else {
      
      // 로컬 저장소에 데이터 저장

      console.log('Updated successfully.');
      navigate('/my');
    }
  }

  return (
    <Container>
      <Form>
        <FormItem>
          <ItemLabel htmlFor='nickname'>닉네임<RequireSpan>*</RequireSpan></ItemLabel>
          <InputField
            type='text'
            id='nickname'
            value={nickname}
            onChange={handleNicknameChange}
            required />
        </FormItem>
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
              /><Text>남성</Text>
            </RadioLabel>
            <RadioLabel>
              <RadioInput
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={handleGenderChange}
              /> <Text>여성</Text>
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
              required />
          </div>
        </FormItem>

        <FormItem>
          <ItemLabel>당뇨 여부<RequireSpan>*</RequireSpan></ItemLabel>
          <RadioContainer>
            <RadioLabel>
              <RadioInput
                type="radio"
                name="diabetes"
                value="yes"
                checked={diabetes === 'yes'}
                onChange={handleDiabetesChange}
              /> <Text>예</Text>
            </RadioLabel>
            <RadioLabel>
              <RadioInput
                type="radio"
                name="diabetes"
                value="no"
                checked={diabetes === 'no'}
                onChange={handleDiabetesChange}
              /> <Text>아니요</Text>
            </RadioLabel>
          </RadioContainer>
        </FormItem>

        <ConfirmButton type='submit' onClick={handleSubmit} text="수정하기" color="#ffffff" backgroundColor="#FF6A4A"/>
      </Form>
    </Container>
  )
}

export default MyInfo;