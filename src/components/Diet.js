import styled from "styled-components";
import { AiFillHeart } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const DietContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    height: auto;
    border-radius: 17.772px;
    border: 1px solid #6A0DAD;
    background: #FFF;
    margin-bottom: 14px;
    padding-bottom: 6px;
`


const TitleContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: 11px;
    align-items: center;
    justify-content: space-between;
`
const Dietitle = styled.div`
    width: 260px;   
    height: 32px;
    color: #6A0DAD;
    font-family: 'Inter';
    font-size: 23px;
    font-weight: 600;
    padding-left: 14px;
`

const LikeContainer = styled.div`
    width: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: flex-end;
    color: #6A0DAD;
    cursor: pointer;
    margin-right: 14px;
`
const LikeIcon = styled(AiFillHeart)`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const LikeText = styled.div`
    width: 20px;
    height: 10px;
    text-align: center;
    font-family: "Inter";
    font-size: 10px;
    font-weight: 600;
`

const UserContainer = styled.div`
    width: auto;
    height: auto;
    border-radius: 10px;
    background: #6A0DAD;
    padding: 5px;
    margin: 5px 0px 8px 24px;
    align-self: flex-start;
    color: #FFF;
    text-align: center;
    font-family: "Inter";
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
`
const FoodInfoContainer = styled.div`
    width: 100%;
    display: flex;
`

const FoodContainer = styled.div`
    width: 197px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: flex-start;
    gap: 1px;
    color: #6A0DAD;
    font-family: "Wavve PADO TTF";
    font-size: 15px;
    font-weight: 400;
    margin-left: 24px;
`
const FoodName = styled.div`
    display: flex;
    height: 25px;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;
`
const Detail = styled.div`
    width: 100px;
    height: 25px;
    display: flex;
    flex: 1;
    align-self: flex-end;
    align-items: center;
    justify-content: flex-end;
    color: #9370DB;
    text-align: right;
    font-family: "Wavve PADO TTF";
    font-size: 15px;
    font-weight: 400;
    margin-right: 14px;
    cursor: pointer;
`
const DetailIcon = styled(BsArrowRight)`
    width: 15px;
    height: 15px;
`

export default function Diet(){
    const [LikeCount, setLikeCount] = useState(0);
    const [Liked, setLiked] = useState(false);
    const navigate = useNavigate();

    const handleLikeClick = () => {
        if (Liked) {
            setLikeCount(LikeCount - 1); 
        } else {
            setLikeCount(LikeCount + 1); 
        }
        setLiked(!Liked); 
        };


    const handleDetailClick = () => {
        navigate();
    }

    const diets = [
        { id: 1, title: "칼로리 모험가의 식탁", user: "승민", foods: ["채소 볶음밥 1/2공기", "두부 마파두부 80g", "청경채 볶음 1컵", "피망 볶음 1/2컵"]},
        { id: 2, title: "행복한 포크와 나이프", user: "요리사 귤", foods: ["채소 볶음밥 1/2공기", "두부 마파두부 80g", "청경채 볶음 1컵", "피망 볶음 1/2컵"]}
    ];

    return(
        <Container>
        {diets.map((diet, index) => (
            <DietContainer key={diet.id}>
                <TitleContainer>
                    <Dietitle>{diet.title}</Dietitle>
                    <LikeContainer onClick={() => handleLikeClick(index)}>
                        <LikeIcon />
                        <LikeText>{diet.likeCount}</LikeText>
                    </LikeContainer>
                </TitleContainer>
                <UserContainer>{diet.user}</UserContainer>
                <FoodInfoContainer>
                    <FoodContainer>
                        {diet.foods.map((food, foodIndex) => (
                            <FoodName key={foodIndex}>{food}</FoodName>
                        ))}
                    </FoodContainer>
                    <Detail onClick={() => handleDetailClick(index)}>
                        더 읽어보기<DetailIcon />
                    </Detail>
                </FoodInfoContainer>
            </DietContainer>
        ))}
    </Container>
    )

}