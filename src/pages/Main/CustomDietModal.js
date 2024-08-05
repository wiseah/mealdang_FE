import React, { useState,useRef,useEffect } from 'react';
import styled,{keyframes} from 'styled-components';
import CustomCheckbox from '../../components/CustomDietCheckbox';
import CustomRadio from '../../components/CustomDietRadio';
import { BsGeoFill, BsSunFill, BsSun, BsQuestionCircleFill } from 'react-icons/bs';
import { BiSolidMoon } from 'react-icons/bi';
import postFoodRecommend from '../../APIs/post/postFoodRecommend';
import { useNavigate } from 'react-router-dom';


const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width:390px;
  height: 100vh;
  background-color: rgba(133,133,133,0.25);
  backdrop-filter: blur(6px);
  /* margin-top: 72px; */
  font-family: 'WavvePADO-Regular';
  place-items: center;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  width: 320px;
  height: 707px;
  padding: 20px;
  border-radius: 15px;
  border: none;
  box-shadow: 0px 4px 4px #B7B7B7;
  margin-top: 20px;
  margin-left: 0px;
  padding-left: 19px;
  overflow-y: auto; 
  position: relative;  /* 자식 요소의 절대 위치를 위한 relative */
  &::-webkit-scrollbar {
    width: 2px;
  }
`;

const Title = styled.div`
  font-size: 30px;
  color: #F74A25;
  border-bottom: 3px solid #F74A25;
  margin-bottom: 13px; 
  padding-bottom: 3px;
`

const Title2 = styled.div`
  font-size: 24px;
  color: #F74A25;
  border-bottom: 3px solid #F74A25;
  margin-bottom: 13px; 
  padding-bottom: 3px;
`

const DetailSpan = styled.span`
  font-size: 16px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const FormItem = styled.div`
  margin-bottom: 10px;
`

const Input = styled.input`
  width: 300px;
  height: 40px;
  border: 1px solid #F74A25;
  border-radius: 10px;
  margin: 3.5px 10px;
`

const Warning = styled.div`
  position: absolute;
  margin: 360px 25px 0 25px;
  width: 280px;
  height: 116px;
  background-color: #FFE3C4;
  border-radius: 10px;
  color: #F74A25;
  font-size: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
  pointer-events: none; /* 클릭 방지 */
`;

const CustomButton = styled.button`
  width: 200px;
  height: 50px;
  box-sizing: border-box;
  text-align: center;
  border: none;
  border-radius: 10px;
  background-color: #FF6A4A;
  font-family: 'WavvePADO-Regular';
  font-size: 20px;
  color: #ffffff;
  margin: auto 60px;
  cursor: pointer; 
`

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 390px;
  height: 100vh;
  background-color: rgba(225,225,225,0.8);
  backdrop-filter: blur(6px);
  place-items: center;
  z-index: 2;
`;

const LoaderDiv = styled.div`
  position: fixed;
  top: 240px;
`;

const Loader = styled.div`
  border: 6px solid #ffffff;
  border-top: 6px solid #F74A25;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  animation: ${spin} 0.7s linear infinite;
  margin: 25px auto;
`;

const LoadingText = styled.div`
  margin: 10px;
  font-family: 'WavvePADO-Regular';
  font-size: 30px;
  color: #F74A25;
`;

const CustomDietModal = ({ isOpen, onClose }) => {

  const navigate = useNavigate();
  const [diet_combination, setDiet_combination] = useState('type2');
  const [breakfast, setBreakfast] = useState({});
  const [lunch, setLunch] = useState({});
  const [dinner, setDinner] = useState({});
  const [ingredient1, setIngredient1] = useState('');
  const [ingredient2, setIngredient2] = useState('');
  const [ingredient3, setIngredient3] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const modalContentRef = useRef(null);
  const warningRef = useRef(null);


  useEffect(() => {
    const handleScroll = () => {
      if (modalContentRef.current && warningRef.current) {
        const scrollTop = modalContentRef.current.scrollTop;
        const modalHeight = modalContentRef.current.clientHeight;
        const warningHeight = warningRef.current.offsetHeight;

        warningRef.current.style.top = `${scrollTop + modalHeight - warningHeight}px`;
      }
    };

    const modalContentElement = modalContentRef.current;
    modalContentElement.addEventListener('scroll', handleScroll);

    return () => {
      modalContentElement.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleRadioChange = (e) => {
    setDiet_combination(e.target.value);
  };

  const handleCheckboxChange = (time, type, checked) => {
    const updateValues = (values) => ({
      ...values,
      [type]: checked
    });

    if (time === '아침') {
      setBreakfast(updateValues(breakfast));
    } else if (time === '점심') {
      setLunch(updateValues(lunch));
    } else if (time === '저녁') {
      setDinner(updateValues(dinner));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(false);
    setHasError(false);

    const dietCombinationMap = {
      type1: '식사3',
      type2: '식사3 + 간식1',
      type3: '식사3 + 간식2'
    };

    const diet_combination_formatted = dietCombinationMap[diet_combination] || '';
    const convertSelectedValues = (values) => {
      const selected = [];
      if (values.korean) selected.push('한식');
      if (values.chinese) selected.push('중식');
      if (values.japanese) selected.push('일식');
      if (values.western) selected.push('양식');
      return selected.join(', ');
    };

    const breakfastFormatted = convertSelectedValues(breakfast);
    const lunchFormatted = convertSelectedValues(lunch);
    const dinnerFormatted = convertSelectedValues(dinner);
    const requestData = {
      diet_combination: diet_combination_formatted,
      breakfast: breakfastFormatted,
      lunch: lunchFormatted,
      dinner: dinnerFormatted,
      ingredient1,
      ingredient2,
      ingredient3,
    };
    console.log('Submitting data:', requestData);

    try {
      const response = await postFoodRecommend(requestData);
      console.log('Response:', response);
      if (response) { // Check if response is valid
        setIsLoading(false);
        onClose();
        navigate('/aftermain');
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setHasError(true);
      setIsLoading(true);
    }
  };

  if (!isOpen) return null;

  return (
    <>
    {isLoading && hasError && (
      <LoadingContainer style={{ textAlign: 'center' }}>
        <LoaderDiv>
          <Loader />
          <LoadingText>추천 받는 중</LoadingText>
        </LoaderDiv>
      </LoadingContainer>
    )}
    <ModalContainer>
      <ModalContent ref={modalContentRef}>
        <Title><BsGeoFill size={24} color="#F74A25" /> 식단 조합 선택 </Title>
        <Form>
          <FormItem>
            <CustomRadio value="type1" checked={diet_combination === 'type1'} onChange={handleRadioChange} label="식사 3" />
            <CustomRadio value="type2" checked={diet_combination === 'type2'} onChange={handleRadioChange} label="식사 3 + 간식 1" />
            <CustomRadio value="type3" checked={diet_combination === 'type3'} onChange={handleRadioChange} label="식사 3 + 간식 2" />
          </FormItem>
          <FormItem>
            <CustomCheckbox icon={<BsSunFill size={20} color="#F74A25" />} time="아침" selectedValues={breakfast} onChange={handleCheckboxChange} />
            <CustomCheckbox icon={<BsSun size={20} color="#F74A25" />} time="점심" selectedValues={lunch} onChange={handleCheckboxChange} />
            <CustomCheckbox icon={<BiSolidMoon size={20} color="#F74A25" />} time="저녁" selectedValues={dinner} onChange={handleCheckboxChange} />
          </FormItem>
          <Title2><BsQuestionCircleFill size={20} color="#F74A25" /> 사용하고 싶은 재료 <DetailSpan>(최대 3개)</DetailSpan> </Title2>
          <FormItem>
            <Input value={ingredient1} onChange={(e) => setIngredient1(e.target.value)} disabled />
            <Input value={ingredient2} onChange={(e) => setIngredient2(e.target.value)} disabled />
            <Input value={ingredient3} onChange={(e) => setIngredient3(e.target.value)} disabled />
          </FormItem>
          <Warning ref={warningRef}>
            재료 입력은 프리미엄 구독 시 <br /> 사용할 수 있습니다
          </Warning>
          <FormItem>
            <CustomButton onClick={handleSubmit}>이대로 식단 추천받기!</CustomButton>
          </FormItem>
        </Form>
      </ModalContent>
    </ModalContainer>
  </>
  );
};

export default CustomDietModal;