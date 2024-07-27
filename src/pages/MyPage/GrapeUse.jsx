import styled from "styled-components";
import { LuGrape } from "react-icons/lu";
import { useLocation } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Introduce = styled.div`
    width: 300px;
    height: 23px;
    color: #000;
    font-family: "Wavve PADO TTF";
    font-size: 21px;
    font-weight: 400;
    align-self: flex-start;
    margin-left: 27px;
    margin-bottom: 18px;
    
`

// 포도 사용 현황 
const GrapeContainer = styled.div`
    width: 336px;
    height: 160px;
    border-radius: 10px;
    background:  #E6E6FA;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    gap: 22px;
    margin-bottom: 22px;
`

const FillGrapeIcon = styled(LuGrape)`
    width: 30px;
    height: 30px;
    color: #6A0DAD;
    fill: #6A0DAD;
    padding-left: 7px;
    padding-right: 12px;

`
const GrapeIcon = styled(LuGrape)`
    width: 30px;
    height: 30px;
    color: #6A0DAD;
    padding-left: 7px;
    padding-right: 12px;
`

const GrapeText = styled.div`
    width: 109px;
    color: #6A0DAD;
    font-family: "Wavve PADO TTF";
    font-size: 21.875px;
    font-weight: 400;
`

// 누적 포도 
const Accumulate = styled.div`
    display: flex;
    align-items: center;
    padding-top: 14px;

`
// 사용한 포도 
const Use = styled.div`
    display: flex;
    align-items: center;
`

// 현재 포도 
const Present = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 17px;
`

// 포도 갯수 
const Amount = styled.div`
    width: 109px;
    color: #6A0DAD;
    text-align: right;
    font-family: "Wavve PADO TTF";
    font-size: 22px;
    font-weight: 400;
    padding-left: 39px;
`
const History = styled.div`
    width: 335px;
    height: auto;
    display: flex;
    flex-direction: column;
`

const BreakDown = styled.div`
    width: 335px;
    height: auto;
    border-top: 1px solid #6A0DAD;
    border-bottom: 1px solid #6A0DAD;
    padding-bottom: 10px;
`

const UseDate = styled.div`
    color: #000;
    font-family: "Wavve PADO TTF";
    font-size: 26.25px;
    font-weight: 400;
    padding-top: 10px;
`
const UsedTitle = styled.div`
    width: 250px;
    color: #000;
    font-family: "Wavve PADO TTF";
    font-size: 21.875px;
    font-weight: 400;
    padding-top: 10px;
    display: block;
`

const TotalGrape = styled.div`
    width: 100%;
    height: 42px; 
    display: flex;
    flex-direction: column;
    text-align: right; 
    font-family: Inter;
    font-size: 17.5px;
    justify-content: flex-end;
    position: sticky;
    bottom: 10;
`
const UsedGrape = styled.div`
    color: #000;;
    font-weight: 400;
`

const PresentGrape = styled.div`
    color: rgba(0, 0, 0, 0.55);
`

export default function GraepUse(){
    const location = useLocation();
    const exchangeHistory = location.state?.history || [];
    const CurrentAmount = location.state?.currentAmount || 0;
    const totalUsed = location.state?.totalUsed || 0;
    

    
    return(
        <Container>
            <Introduce>포도 교환 내역을 확인할 수 있어요 </Introduce>
            <GrapeContainer>
                <Accumulate>
                    <FillGrapeIcon/>
                    <GrapeText>누적 포도</GrapeText>
                    <Amount>{totalUsed+CurrentAmount}개</Amount>
                </Accumulate>
                <Use>
                    <GrapeIcon/>
                    <GrapeText>사용한 포도</GrapeText>
                    <Amount>{totalUsed}개</Amount>
                </Use>
                <Present>
                    <FillGrapeIcon/>
                    <GrapeText>현재 포도</GrapeText>
                    <Amount>{CurrentAmount}개</Amount>
                </Present>
            </GrapeContainer>
            <History>
            {exchangeHistory.slice().reverse().map((coupon, index) => {
                    return (
                        <BreakDown key={index}>
                            <UseDate>{coupon.date}</UseDate>
                            <UsedTitle>{coupon.title}</UsedTitle>
                            <TotalGrape>
                                <UsedGrape>-{coupon.cost} 포도</UsedGrape>
                                <PresentGrape>{coupon.present}포도</PresentGrape>
                            </TotalGrape>
                        </BreakDown>
                    );
                })}
            </History>
        </Container>
    )

}