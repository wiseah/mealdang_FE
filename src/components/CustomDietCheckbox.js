import styled from 'styled-components';
import React, { useState } from 'react';
import { BiCheckbox, BiSolidCheckboxChecked } from 'react-icons/bi';

const CheckboxContainer = styled.div`
  font-family: 'WavvePADO-Regular';
  font-size: 20px;
  color: #F74A25;
  margin:0 0 15px 10px;
`

const Title = styled.div`
  margin-bottom: 10px;
  display: flex;
  vertical-align: middle;
`

const TitleItem = styled.div`
  margin-right: 5px;
`

const CheckboxItems = styled.div`
  display: flex;
`

const CheckboxLabel = styled.label`
  display: flex;
  flex-direction: row;
  margin: 4.5px 4px 4.5px 12px;
  cursor: pointer; 
`

const CheckboxInput = styled.input`
  display: none;
`

const Text = styled.span`
  margin-left: 1.5px;
`

const CustomCheckbox = ({ icon, time }) => {
  const [customMeal, setCustomMeal] = useState({
    korean: false,
    chinese: false,
    japanese: false,
    western: false
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCustomMeal(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <CheckboxContainer>
      <Title> <TitleItem>{icon}</TitleItem><TitleItem>{time}</TitleItem></Title>
      <CheckboxItems>
      <CheckboxLabel>
        <CheckboxInput
          type="checkbox"
          name="korean"
          checked={customMeal.korean}
          onChange={handleCheckboxChange} />
        {customMeal.korean ? <BiSolidCheckboxChecked /> : <BiCheckbox />}
        <Text>한식</Text>
      </CheckboxLabel>

      <CheckboxLabel>
        <CheckboxInput
          type="checkbox"
          name="chinese"
          checked={customMeal.chinese}
          onChange={handleCheckboxChange} />
        {customMeal.chinese ? <BiSolidCheckboxChecked /> : <BiCheckbox />}
        <Text>중식</Text>
      </CheckboxLabel>

      <CheckboxLabel>
        <CheckboxInput
          type="checkbox"
          name="japanese"
          checked={customMeal.japanese}
          onChange={handleCheckboxChange} />
        {customMeal.japanese ? <BiSolidCheckboxChecked /> : <BiCheckbox />}
        <Text>일식</Text>
      </CheckboxLabel>

      <CheckboxLabel>
        <CheckboxInput
          type="checkbox"
          name="western"
          checked={customMeal.western}
          onChange={handleCheckboxChange} />
        {customMeal.western ? <BiSolidCheckboxChecked /> : <BiCheckbox />}
        <Text>양식</Text>
      </CheckboxLabel>
      </CheckboxItems>
    </CheckboxContainer>
  );
};

export default CustomCheckbox;
