import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// import RiceBalloon from '../assets/images/rice_balloon.svg';
import ProcessTitle from '../components/ProcessTitle';
import ImageSliding from '../components/ImgSliding';
import DolLogo from '../images/DoL-Logo.png';
import TextLogoImg from '../images/smallLogo.png';

import img1 from '../images/service00.png';
import img2 from '../images/service01.png';
import img3 from '../images/service02.png';
// import img3 from '../assets/images/Intro/2_waiting_component.svg';
import img4 from '../images/service03.png';
// import img5 from '../assets/images/Intro/2_finished_component.svg';
// import img4 from '../images/service03.png';
import img7 from '../images/service06.png';
import img8 from '../images/service08.png'
import img9 from '../images/service09.png'
import img10 from '../images/service10.png'
import img11 from '../images/service11.png'
import img12 from '../images/service12.png'
import img13 from '../images/service13.png'
import img14 from '../images/service14.png'

import { BsEmojiLaughingFill } from 'react-icons/bs';
// import { useSelector } from 'react-redux';
// import { selectIsLoggedIn } from '../redux/userSlice.js';

const Scroll = styled.div``;

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 40px;
`;
const LogoImage = styled.img`
    width: 210px;
    height: 210px;
`;
/* //밥풍선
const LogoImage = styled.img`
width: 181px;
height: 159px;
`; */

const TextLogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

const Title = styled.div`
    color: #540090;
`;
const Text1 = styled.div`
    font-weight: 700;
    font-size: 20px;
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;
/* const Text2 = styled.div`
font-Weight: 700;
font-size: 34px;
display: flex;
justify-content: center;
margin-top: 10px;
`; */
const Text3 = styled.div`
    font-weight: 500;
    font-size: 12px;
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

const GraContainer1 = styled.div`
    background: linear-gradient(
        to bottom,
        #fff 0%,
        #E6E6FA 30%,
        #fff 100%
    );
    height: 500px;
`;
const GraContainer2 = styled.div`
    background: linear-gradient(
        to bottom,
        #fff 0%,
        #E6E6FA 30%,
        #fff 0%
    );
    height: 480px;
`;

const Container = styled.div`
    margin-top: 40px;
`;

const ImageSlidingContainer1 = styled.div`
    img {
        /* width: 255px !important; // 이미지 너비 조정 */
        height: 255px !important; // 이미지 높이 조정
        object-fit: cover; // 비율 유지
    }
`;

const ImageSlidingContainer2 = styled.div`
    img {
        /* width: 310px !important; // 이미지 너비 조정 */
        height: 165px !important; // 이미지 높이 조정
        object-fit: cover; // 비율 유지
    }
`;

const ImgDiv1 = styled.div`
    display: flex;
    justify-content: center; // 자식 요소를 가로 방향으로 가운데 정렬
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    width: 290px;
    height: 400px;
`;

const ImgDiv2 = styled.div`
    display: flex;
    justify-content: center; // 자식 요소를 가로 방향으로 가운데 정렬
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    width: 250px;
    height: 50px;
`;

const Text4 = styled.div`
    font-weight: 400;
    font-size: 18px;
    display: flex;
    justify-content: center;
    margin-top: 70px;
    color: #540090;
`;
const Text5 = styled.div`
    font-weight: 700;
    font-size: 18px;
    display: flex;
    justify-content: center;
    color: #540090;
    margin-bottom: 70px;
`;

const Buttondiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-bottom: 70px; */
`;

const CreateButton = styled.button`
    width: 329px;
    height: 50px;
    border: none;
    border-radius: 8px;
    background-color: #6A0DAD;
    color: #ffffff;
    font-size: 18px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;

    transition: background-color 0.1s;

    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

function Intro() {
    const images1 = [img1, img2, img3];
    const images2 = [img8, img9, img10];
    const images3 = [img11, img12, img13, img14];
    const navigate = useNavigate();

    // const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <Scroll>
            <LogoContainer>
                <LogoImage src={DolLogo} />
            </LogoContainer>

            <Title>
                <Text1>식단으로 혈당과 밀당하는</Text1>

                <TextLogoContainer>
                    <img
                        src={TextLogoImg}
                        alt="TextLogoImg"
                        style={{ width: '135px' }}
                    />
                </TextLogoContainer>

                <Text3>식품교환표를 통한 AI기반 맞춤형 식단 제공 서비스</Text3>
            </Title>

            <Container style={{height: '280px'}}>
                <ProcessTitle
                    num="1"
                    title="대시보드로 매일매일 혈당관리"
                    text="대시보드로 혈당상태를 직관적으로 확인하며 관리할 수 있어요!"
                />
                <ImageSlidingContainer2>
                    <ImageSliding images={images1} />
                </ImageSlidingContainer2>
            </Container>

            <GraContainer1>
                <Container>
                    <ProcessTitle
                        num="2"
                        title="개인별 맞춤 식품교환표 생성"
                        text="최초 로그인 시 키와 몸무게를 입력하면 개인별 맞춤 식품교환표가 생성돼요!"
                    />
                    <ImgDiv1>
                        <img src={img4} />
                    </ImgDiv1>
                    {/* <ImageSlidingContainer1>
                        <ImageSliding images={images4} />
                    </ImageSlidingContainer1> */}
                </Container>
            </GraContainer1>

            <Container style={{height: '340px'}}>
                <ProcessTitle
                    num="3"
                    title="1일 최대 15개 식단 제공"
                    text="AI가 퍼스널 식품교환표를 기준으로 균형있는 식단을 제공해줘요!"
                />
                {/* <ImgDiv1>
                        <img src={img4} style={{ width: '307px', height: '196px' }} alt="월별 명예의 전당 리스트 사진" />
                </ImgDiv1> */}
                <ImageSlidingContainer1>
                    <ImageSliding images={images3} />
                </ImageSlidingContainer1>
            </Container>

            <GraContainer1>
                <Container>
                    <ProcessTitle
                        num="4"
                        title="외식할 땐, 밀당 맵으로 혈당 관리!"
                        text="혈당 고민 없이 즐길 수 있는 식당 / 카페를 확인할 수 있어요!"
                    />
                    <ImgDiv1>
                        <img src={img7} alt="이달의 명예의 전당 사진" />
                    </ImgDiv1>
                </Container>
            </GraContainer1>

            <Container>
                <ProcessTitle
                    num="5"
                    title="식단톤을 통한 나만의 레시피 공유"
                    text="식단톤에 출전해서 나만의 혈당 레시피를 공유하고 리워드를 받아요!"
                />
                {/* <ImgDiv2>
                    <img src={img7} alt="보은 버튼" />
                </ImgDiv2> */}
                <ImageSlidingContainer2>
                    <ImageSliding images={images2} />
                </ImageSlidingContainer2>
            </Container>

            <Text4>로그인 후 무료로 이용이 가능합니다!!</Text4>
            <Text5>밀당으로 혈당을 관리하러 가볼까요??</Text5>
            <Buttondiv>
                <CreateButton
                    onClick={() =>
                        navigate('/login')
                    }
                >
                    <BsEmojiLaughingFill
                        size="24px"
                        style={{ marginRight: '10px' }}
                    />
                    서비스 이용하러 가기!!
                </CreateButton>
            </Buttondiv>
        </Scroll>
    );
}

export default Intro;
