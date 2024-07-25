import styled from "styled-components";
import { FoodRecommendBack } from "../../components/FoodRecommendBack";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Introduction = styled.div`
    width: 365px;
    height: 66px;
    color: #000;
    font-family: "Wavve PADO TTF";
    font-size: 25px;
    font-weight: 400;
    text-align: center;
`
const Date = styled.div`
    width: 160px;
    color: #000;
    font-family: "Wavve PADO TTF";
    font-size: 30px;
    font-weight: 400;
    align-self: flex-start;
    padding: 18px 0px 10px 30px;
`


export default function FoodBookMark(){

    const foodRecommendDates = ['2024.7.13','2024.7.12','2024.7.10'];

    return(
        <Container>
            <Introduction>
                여러분들이 맛있게 먹었던<br/>식단을 두고두고 볼 수 있어요
            </Introduction>
            {foodRecommendDates.map((date,index) => (
                <>
                    <Date key = {index}>{date}</Date>
                    <FoodRecommendBack key={index} />
                </> ))}
        </Container>
    )
}