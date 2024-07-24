import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width:390px;
  min-height:100vh;
  background-color: rgba(0,0,0,0.7);
  backdrop-filter: blur(6px);
  color: black;
  font-size: 30px;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  width: 320px;
  height: 460px;
  padding: 20px;
  border-radius: 15px 15px 0 0;
  border: none;
  margin-top: 150px;
`;


const AgreeAllLabel = styled.label`
  font-family: 'WavvePADO-Regular';
  font-size: 24px;
  color: #000000;
`;

const AgreeAllCheckbox = styled.input`
  margin-right: 10px;
  width: 23px;
  height: 23px;
  appearance: none;
  border: 3px solid #000000;
  border-radius: 4px;
  vertical-align: middle;
  margin: 0 10px 2px 0;

  &:checked {
    background-color: #000000;

    &::before {
      content: '\u2713';
      display: block;
      text-align: center;
      line-height: 18px;
      color: #ffffff;
      font-size: 25px;
    }
  }
`;

const Details = styled.div`
  height: 300px;
  overflow: auto;

    &::-webkit-scrollbar{
      width: 2px;
    }
`

const TermsList = styled.div`
  margin-top: 20px;
`;

const TermItem = styled.div`
  margin-bottom: 10px;
  font-family: 'NotoSansKR-Regular';
  font-size: 13px;
  color: #737373;
`;

const AgreeButton = styled.button`
  width: 360px;
  height: 58px;
  align-items: center;
  justify-content: center;
  background-color: #E6E6FF;
  color: #6A0DAD;
  border: none;
  border-radius: 0 0 10px 10px;
  font-family: 'WavvePADO-Regular';
  font-size: 20px;
  z-index: 1;
`;

const DisagreeButton = styled.button`
  background-color: transparent;
  border: none;
  font-family: 'WavvePADO-Regular';
  font-size: 20px;
  margin-top: 20px;
  background-color: #ffffff ;
  border: none;
  border-radius: 10px;
  color: #6A0DAD ;
  width: 70px;
  height: 30px;
`;


const AgreeAllSection = () => (
  <div>
    <AgreeAllLabel>
      <AgreeAllCheckbox type="checkbox"/> 전체 동의하기
    </AgreeAllLabel>
    <TermsList>
      <TermItem>
        전체동의는 선택목적에 대한 동의를 포함하고 있으며, <br />
        선택목적에 대한 동의를 거부해도 서비스 이용이 가능합니다.
      </TermItem>
      <TermItem>
        밀당 서비스 제공을 위해 회원번호와 함께 개인 정보가 제공됩니다.
        보다 자세한 개인정보 제공항목은 동의 내용에서 확인하실 수 있습니다.
        해당 정보는 동의 철회 또는 서비스 탈퇴 시 지체없이 파기됩니다.
      </TermItem>
    </TermsList>
  </div>
)

const TermDetail = () => (
  <div>
    <Details>
      <TermItem>{'\u2713'} 개인정보처리방침 동의 [필수]</TermItem>
      <TermItem>
        1. 개인정보 수집목적 및 이용목적 <br/>
        가. 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금 정산 <br/>
        콘텐츠 제공 , 구매 및 요금 결제 , 물품배송 또는 청구지 등 발송 <br/>
        , 금융거래 본인 인증 및 금융 서비스 <br/>
        나. 회원 관리 <br/>
        회원제 서비스 이용에 따른 본인확인 , 개인 식별 , 불량회원의 부정 이용 방지와 비인가 사용 방지 , 가입 의사 확인 , 연령확인 , 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인, 불만처리 등 민원처리 , 고지사항 전달 <br/>
        2. 수집하는 개인정보 항목 : 이름 , 생년월일 , 성별 , 로그인ID , 비밀번호 , 자택 전화번호 , 휴대전화번호 , 이메일 , 14세미만 가입자의 경우 법정대리인의 정보 <br/>
        3. 개인정보의 보유기간 및 이용기간 <br/>
        원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다. <br/>
        가. 회사 내부 방침에 의한 정보 보유 사유 <br/>
        o 부정거래 방지 및 쇼핑몰 운영방침에 따른 보관 : OO년 <br/>
        나. 관련 법령에 의한 정보보유 사유 <br/>
        o 계약 또는 청약철회 등에 관한 기록 <br/>
        -보존이유 : 전자상거래등에서의소비자보호에관한법률 <br/>
        -보존기간 : 5년 <br/>
        o 대금 결제 및 재화 등의 공급에 관한 기록 <br/>
        -보존이유: 전자상거래등에서의소비자보호에관한법률 <br/>
        -보존기간 : 5년 <br/>
        o 소비자 불만 또는 분쟁처리에 관한 기록 <br/>
        -보존이유 : 전자상거래등에서의소비자보호에관한법률 <br/>
        -보존기간 : 3년 <br/>
        o 로그 기록 <br/>
        -보존이유: 통신비밀보호법 <br/>
        -보존기간 : 3개월 <br/>
        ※ 동의를 거부할 수 있으나 거부시 회원 가입이 불가능합니다. <br/>
      </TermItem>
    </Details>
  </div>
);


const PrivacyTermsModal = ({ isOpen, onClose, onAgree }) => {
  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <AgreeAllSection/>
        <TermDetail />
      </ModalContent>
      <AgreeButton onClick={onAgree}>완료</AgreeButton>
      <DisagreeButton onClick={onClose}>취소</DisagreeButton>
    </ModalContainer>

  );
};

export default PrivacyTermsModal;
