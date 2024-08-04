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
    /* width: 260px;    */
    height: 32px;
    color: #6A0DAD;
    font-family: 'Inter';
    font-size: 28px;
    font-weight: 700;
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
    font-size: 12px;
    font-weight: 600;
`

const UserContainer = styled.div`
    width: auto;
    height: auto;
    border-radius: 10px;
    background: #6A0DAD;
    padding: 8px;
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
    flex-direction: column;
    gap: 1vh;
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
const LastContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const NoDataMessage = styled.div`
    width: 100%;
    height: auto;
    color: #6A0DAD;
    font-family: 'Inter';
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin-top: 20px;
`;
export default function Diet(){
// export default function Diet({ diets }){
    // const [LikeCount, setLikeCount] = useState(0);
    // const [Liked, setLiked] = useState(false);

    // const handleLikeClick = () => {
    //     if (Liked) {
    //         setLikeCount(LikeCount - 1); 
    //     } else {
    //         setLikeCount(LikeCount + 1); 
    //     }
    //     setLiked(!Liked); 
    //     };

    const diets = [
        { diet_id: 1, diet_name: "칼로리 모험가의 식탁", nickname: "승민", main: "채소 볶음밥 1/2공기", side1: "두부 마파두부 80g", side2: "청경채 볶음 1컵", side3: "피망 볶음 1/2컵", heart:"23"},
        { diet_id: 2, diet_name: "행복한 포크와 나이프", nickname: "요리사 귤", main: "채소 볶음밥 1/2공기", side1: "두부 마파두부 80g", side2: "청경채 볶음 1컵", side3: "피망 볶음 1/2컵", heart:"56"}
    ];

    const navigate = useNavigate();

    const handleDetailClick = (dietId) => {
        navigate(`/diethondetail/${dietId}`);
    };

    return(
        <Container>
        {diets.length > 0 ? (
            diets.map((diet) => (
                <DietContainer key={diet.diet_id}>
                    <TitleContainer>
                        <Dietitle>{diet.diet_name}</Dietitle>
                        <LikeContainer>
                            <LikeIcon />
                            <LikeText>{diet.heart}</LikeText>
                        </LikeContainer>
                    </TitleContainer>
                    <UserContainer>{diet.nickname}</UserContainer>
                    <FoodInfoContainer>
                        <FoodContainer>{diet.main}</FoodContainer>
                        <FoodContainer>{diet.side1}</FoodContainer>
                        <FoodContainer>{diet.side2}</FoodContainer>
                        <LastContainer>
                            <FoodContainer>{diet.side3}</FoodContainer>
                            <Detail onClick={() => handleDetailClick(diet.diet_id)}>
                                더 읽어보기<DetailIcon />
                            </Detail>
                        </LastContainer>
                    </FoodInfoContainer>
                </DietContainer>
            ))
        ) : (
            <NoDataMessage>
                아직 식단톤에 참여한 참가자가 한명도 없어요!
                <br/>
                얼른 참여해서 1등을 노려보세요🤩
            </NoDataMessage>
        )}
    </Container>
    )

}