import styled from "styled-components";
import { IoMdArrowForward } from "react-icons/io";
import { useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import postGrapeUse from "../../APIs/post/postGrapeUse";
import getGrapeExchange from "../../APIs/get/getGrapeExchange";


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
    font-family: 'Do Hyeon', sans-serif;
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
    font-family: 'Do Hyeon', sans-serif;
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
    font-family: 'Do Hyeon', sans-serif;
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
    font-family: 'Do Hyeon', sans-serif;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    margin-bottom: 8px;
    cursor: pointer;
`

export default function GrapeExchange() {
    const navigate = useNavigate();
    
    const handleNavigate = () => {
        navigate('/grapeuse'); 
        };


    const [Exchanged, setExchanged] = useState({
        nickname: '',
        remained_podo: 0,
        items: [
        {
		    podo_store_id: 0,
            item_name: '',
            price: 0
        },
    ]
    })    


    useEffect(() => {
        const fetchGrapeExchangeData = async () => {
          try {
    
            const response = await getGrapeExchange();
            setExchanged(response);
            console.log(response);
          } catch (error) {
            console.error('message:', error.message);
            alert('매칭되는 포도 사용처 정보를 찾지 못했습니다.');
          }
        };
    
        fetchGrapeExchangeData();
      }, []);


      const handleExchange = async (podoStoreId, cost) => {
        if (Exchanged.remained_podo >= cost) {
            try {
                const response = await postGrapeUse(podoStoreId);
                if (response.message === "Podo history data saved successfully.") {
                    setExchanged(prevState => ({
                        ...prevState,
                        remained_podo: response.remained_podo
                    }));
                    alert("쿠폰이 교환되었습니다.");
                } else {
                    alert("쿠폰 교환에 실패했습니다.");
                }
            } catch (error) {
                console.error('Exchange error:', error);
                alert("쿠폰 교환 중 오류가 발생했습니다.");
            }
        } else {
            alert("포도가 부족합니다.");
        }
    };

    
    return (
        <Container>
            <UserContainer>
                <UserText>
                    {Exchanged.nickname}님은{' '}<ColorWord>총 {Exchanged.remained_podo}개의 포도</ColorWord>를
                    사용할 수 있어요.
                </UserText>
                <GrapeUse onClick={handleNavigate}>
                    <GrapeUseText>포도 교환 내역 확인하기</GrapeUseText><GrapeUseIcon />
                </GrapeUse>
            </UserContainer>
            <ExchangeContainer>
                {Exchanged.items.map((item) => (
                    <CouponContainer key={item.podo_store_id}>
                        <ExchangeTitle>
                            {item.item_name}
                        </ExchangeTitle>
                        <RightSection>
                            <Grape>{item.price}포도</Grape>
                            <ExchangeBtn onClick={() => handleExchange(item.podo_store_id,item.price)}>교환</ExchangeBtn>
                        </RightSection>
                    </CouponContainer>
                ))}
            </ExchangeContainer>
        </Container>
    );
}