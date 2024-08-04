import styled from "styled-components";
import { LuGrape } from "react-icons/lu";
import getGrapeUse from "../../APIs/get/getGrapeUse";
import { useEffect, useState } from "react";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
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
`;
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
`;
const FillGrapeIcon = styled(LuGrape)`
    width: 30px;
    height: 30px;
    color: #6A0DAD;
    fill: #6A0DAD;
    padding-left: 7px;
    padding-right: 12px;
`;
const GrapeIcon = styled(LuGrape)`
    width: 30px;
    height: 30px;
    color: #6A0DAD;
    padding-left: 7px;
    padding-right: 12px;
`;
const GrapeText = styled.div`
    width: 109px;
    color: #6A0DAD;
    font-family: "Wavve PADO TTF";
    font-size: 21.875px;
    font-weight: 400;
`;
const Accumulate = styled.div`
    display: flex;
    align-items: center;
    padding-top: 14px;
`;
const Use = styled.div`
    display: flex;
    align-items: center;
`;
const Present = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 17px;
`;
const Amount = styled.div`
    width: 109px;
    color: #6A0DAD;
    text-align: right;
    font-family: "Wavve PADO TTF";
    font-size: 22px;
    font-weight: 400;
    padding-left: 39px;
`;
const History = styled.div`
    width: 335px;
    height: auto;
    display: flex;
    flex-direction: column;
`;
const BreakDown = styled.div`
    width: 335px;
    height: auto;
    border-top: 1px solid #6A0DAD;
    border-bottom: 1px solid #6A0DAD;
    padding-bottom: 10px;
`;
const UseDate = styled.div`
    color: #000;
    font-family: "Wavve PADO TTF";
    font-size: 26.25px;
    font-weight: 400;
    padding-top: 10px;
`;
const UsedTitle = styled.div`
    width: 250px;
    color: #000;
    font-family: "Wavve PADO TTF";
    font-size: 21.875px;
    font-weight: 400;
    padding-top: 10px;
    display: block;
`;
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
`;
const UsedGrape = styled.div`
    color: #000;
    font-weight: 400;
`;
const PresentGrape = styled.div`
    color: rgba(0, 0, 0, 0.55);
`;

export default function GrapeUse() {
    const [Podo, setPodo] = useState({
        cumulative_podo: 0,
        used_podo: 0,
        remained_podo: 0,
        purchased_list: [
            {
                date: '',
                items: '',
                item_price: 0,
                remaining_points: 0
            }
        ],
        received_list: [
            {
                date: '',
                items: '',
                received_points: 0,
                remaining_points: 0
            }
        ]
    });

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        if (!dateString) return '';
        let [date, time] = dateString.split('T');
        time = time.split(':').slice(0, 2).join(':');
        return `${date} ${time}`;
    };

    // 결합된 리스트 생성 및 날짜 기준으로 정렬
    const combinedList = [
        ...Podo.purchased_list.map(item => ({
            date: formatDate(item.date),
            title: item.items,
            amount: -item.item_price,
            remaining: item.remaining_points
        })),
        ...Podo.received_list.map(item => ({
            date: formatDate(item.date),
            title: item.items,
            amount: item.received_points,
            remaining: item.remaining_points
        }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));  // 날짜 내림차순 정렬

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getGrapeUse();
                setPodo(response);
            } catch (error) {
                console.error('message:', error.message);
                alert('포도 사용 내역 데이터를 찾지 못했습니다.');
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <Introduce>포도 교환 내역을 확인할 수 있어요 </Introduce>
            <GrapeContainer>
                <Accumulate>
                    <FillGrapeIcon />
                    <GrapeText>누적 포도</GrapeText>
                    <Amount>{Podo.cumulative_podo}개</Amount>
                </Accumulate>
                <Use>
                    <GrapeIcon />
                    <GrapeText>사용한 포도</GrapeText>
                    <Amount>{Podo.used_podo}개</Amount>
                </Use>
                <Present>
                    <FillGrapeIcon />
                    <GrapeText>현재 포도</GrapeText>
                    <Amount>{Podo.remained_podo}개</Amount>
                </Present>
            </GrapeContainer>
            <History>
                {combinedList.map((item, index) => (
                    <BreakDown key={index}>
                        <UseDate>{item.date}</UseDate>
                        <UsedTitle>{item.title}</UsedTitle>
                        <TotalGrape>
                            <UsedGrape>{item.amount} 포도</UsedGrape>
                            <PresentGrape>{item.remaining} 포도</PresentGrape>
                        </TotalGrape>
                    </BreakDown>
                ))}
            </History>
        </Container>
    );
}
