import React from 'react';
import styled from 'styled-components';
import { RxExternalLink } from 'react-icons/rx';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  width: 100vw;
  max-width:390px;
  min-height:100vh;
  background-color: rgba(0,0,0,0.7);
  backdrop-filter: blur(6px);
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  width: 320px;
  padding: 20px;
  border-radius: 15px;
  border: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  background-color: transparent;
  border: none;
  font-size: 23px;
`;

const Title = styled.h2`
font-family: 'Do Hyeon', sans-serif;
  text-align: center;
  font-size: 26px;
`

const Explanation = styled.div`
font-family: 'Do Hyeon', sans-serif;
  font-size: 17px;
  line-height: 1.5;
  margin-top: 30px;
`;


const Paragraph = styled.p`
  margin: 20px auto;
`;

const Important = styled.span`
  color: #6A0DAD;
  font-weight: bold;
`

const P = styled.div`
  display: flex;
  align-items: center;
  color: #6A0DAD;
`;

const ExternalLink = styled.a`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;



const FoodExchangeListModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <Title>식품교환표란?</Title>
        <Explanation>
          <Paragraph>
            {'\u00A0'} 식품들을 영양소 구성이 비슷한 것끼리 6가지 식품군으로 나누어 묶은 표입니다. <br />
            {'\u00A0'} 6가지 식품군은 곡류군, 어육류군, 채소군, 지방군, 우유군, 과일군을 말하며,
            같은 군 내에서는 자유롭게 바꿔 먹을 수 있도록 설정되어 있습니다. <br />
            {'\u00A0'} 식품교환표는 <Important>제2형 당뇨인</Important>을 기준으로 제공됩니다.
          </Paragraph>
          <Paragraph>
            더 많은 정보를 알고 싶다면? <br />
            <P>
              <ExternalLink href="https://www.diabetes.or.kr/general/dietary/dietary_03.php?con=3" target="_blank">
              대한당뇨병학회 바로가기</ExternalLink> <RxExternalLink size={17} />
            </P>
          </Paragraph>
        </Explanation>
      </ModalContent>
    </ModalContainer>
  );
};

export default FoodExchangeListModal;