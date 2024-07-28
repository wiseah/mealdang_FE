import styled from "styled-components";
import { IoMdArrowForward } from "react-icons/io";
import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const UserContainer = styled.div`
    width: 335px;
    height: 122px;
    border-radius: 10px;
    border: 1px solid #6A0DAD;
    font-family: "Wavve PADO TTF";
    font-size: 24.594px;
    font-weight: 400;
    margin-bottom: 33px;
`

const UserText = styled.span`
    padding-top: 21px;
    padding-left: 12px;
    display: block;
`

const ColorWord = styled.span`
    color: #6A0DAD;
 `

const GrapeUse = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 12px;
    color: rgba(0, 0, 0, 0.55);
`
const GrapeUseText = styled.span`
    text-align: center;
    font-family: Inter;
    font-size: 17px;
    font-weight: 400;
    cursor: pointer;
`
const GrapeUseIcon = styled(IoMdArrowForward)`
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 8px;
`
const ExchangeContainer = styled.div`
    width: 337px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 17px;
` 
const CouponContainer = styled.div`
    width: 335px;
    height: 85px;
    border-radius: 10px;
    border: 1px solid #9370DB;
    display: flex;
`
const ExchangeTitle = styled.div`
    width: 225px;
    font-family: "Wavve PADO TTF";
    font-size: 20.5px;
    font-weight: 400;
    padding: 11px 8px 18px 16px;
    display: block;
`
const RightSection = styled.div`
    width: 94px;
    height: 75px;
    display: flex;
    flex-direction: column;
    flex: 1;
`
const Grape = styled.div`
    width: 78px;
    height: 17px;
    color: #6A0DAD;
    font-family: "Wavve PADO TTF";
    font-size: 17px;
    font-weight: 400;
    margin: 11px 8px 10px 0px;
`
const ExchangeBtn = styled.div`
    width: 69px;
    height: 29px;
    border-radius: 10px;
    background: #E6E6FA;
    color: #000;
    font-family: "Wavve PADO TTF";
    font-size: 16px;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    margin-bottom: 8px;
    cursor: pointer;
`

export default function GrapeExchange({ name, initialAmount }) {
    const navigate = useNavigate();
    
    // 포도 갯수
    const [amount, setAmount] = useState(10000);
    const [exchangeHistory, setExchangeHistory] = useState([]);
    const [totalUsed, setTotalUsed] = useState(0);

    const handleNavigate = () => {
        navigate('/grapeuse', { 
            state: { 
                history: exchangeHistory, 
                currentAmount : amount, 
                totalUsed: totalUsed 
            } }); 
        };

    const coupons = [        
        { title: "밀당 프리미엄 구독권 30% 할인권", cost: 3000 },
        { title: "밀당 프리미엄 구독권 10% 할인권", cost: 1000 },
        { title: "당슐랭 제휴식당 3000원 할인쿠폰", cost: 3000 },
        { title: "당슐랭 제휴식당 2000원 할인쿠폰", cost: 2000 },        
        { title: "맞춤식단에 재료 5개 추가", cost: 500 },        
        { title: "맞춤 식단에 재료 3개 추가", cost: 300 },    
        ];

// 일단 교환 기능 alert로 구현
    const Exchange = (cost,title) => {
        if (amount >= cost) { 
            const newAmount = amount - cost;
            setAmount(newAmount);
            setTotalUsed(prevTotal => prevTotal + cost);
            setExchangeHistory(prevHistory =>{ 
                const updatedHistory = [
                ...prevHistory,
                {title, cost, present: newAmount, date: new Date().toLocaleDateString()}
            ];
            console.log('Updated History:', updatedHistory)
            return updatedHistory;
            
        });
            alert("쿠폰이 교환되었습니다.");
        } else {
            alert("포도가 부족합니다.");
        }
    };

    return (
        <Container>
            <UserContainer>
                <UserText>
                    {name}님은{' '}<ColorWord>총 {amount}개의 포도</ColorWord>를
                    <br/>
                    사용할 수 있습니다.
                </UserText>
                <GrapeUse onClick={handleNavigate}>
                    <GrapeUseText>포도 교환 내역 확인하기</GrapeUseText><GrapeUseIcon />
                </GrapeUse>
            </UserContainer>
            <ExchangeContainer>
                {coupons.map((coupon, index) => (
                    <CouponContainer key={index}>
                        <ExchangeTitle>
                            {coupon.title}
                        </ExchangeTitle>
                        <RightSection>
                            <Grape>{coupon.cost}포도</Grape>
                            <ExchangeBtn onClick={() => Exchange(coupon.cost, coupon.title)}>교환</ExchangeBtn>
                        </RightSection>
                    </CouponContainer>
                ))}
            </ExchangeContainer>
        </Container>
    );
}