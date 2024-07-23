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



export function FoodBookMark(){

    return(
        <Container>
            <Introduction>
                여러분들이 맛있게 먹었던 <br/>식단을 두고두고 볼 수 있어요
            </Introduction>
            <FoodRecommendBack/>
        </Container>
    )
}