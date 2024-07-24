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
    font-size: 30px;
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
    padding-left: 30px;
    padding-top: 20px;
    padding-bottom: 10px;
`


export function FoodBookMark(){

    return(
        <Container>
            <Introduction>
                여러분들이 맛있게 먹었던 <br/>식단을 두고두고 볼 수 있어요
            </Introduction>
            <Date>2024.07.13</Date>
            <FoodRecommendBack/>
        </Container>
    )
}