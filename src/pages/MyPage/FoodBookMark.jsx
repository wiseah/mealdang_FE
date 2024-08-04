import styled from "styled-components";
import React, {useState, useEffect} from "react";
import { FoodRecommendBack } from "../../components/FoodRecommendBack";
import getFoodBookMark from "../../APIs/get/getFoodBookMark";

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
    const [bookmarkedDiets, setBookmarkedDiets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFoodBookMark();
                setBookmarkedDiets(response); // 'liked_diets' 배열을 setBookmarkedDiets에 저장
            } catch (error) {
                console.error("즐겨찾기한 식단을 불러오는데 실패했습니다:", error);
                setBookmarkedDiets([]); 
            }
        };

        fetchData();
    }, []);

    return(
        <Container>
            <Introduction>
                여러분들이 맛있게 먹었던<br />식단을 두고두고 볼 수 있어요
            </Introduction>
            {bookmarkedDiets.length > 0 ? (
                bookmarkedDiets.map((dietSet, index) => (
                    <React.Fragment key={index}>
                        <Date>{dietSet.date}</Date>
                        <FoodRecommendBack dietSets={dietSet.diets} />
                    </React.Fragment>
                ))
            ) : (
                <p>즐겨찾기한 식단이 없습니다.</p> // 데이터가 없을 때 표시할 메시지
            )}
        </Container>
    )
}