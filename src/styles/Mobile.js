import { Link, Outlet, matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import routes from '../routes.js';
import classNames from 'classnames'; //다양한 형태의 인수를 받아서 조건부로 클래스 이름을 설정할 수 있
import { BiChevronLeft } from "react-icons/bi";
import { FaMapMarkerAlt, FaMedal } from "react-icons/fa";
import { MdWaterDrop, MdFoodBank } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
`;

const Content = styled.div`
    width: 100%;
    max-width: 390px;
    min-height: 100vh;
    padding-bottom: ${props => props.isMap ? '0px' : '110px'};
    overflow: auto;
    box-shadow: 0px 0px 32px #0000002f;
    background-color: #ffffff;

    scrollbar-width: none;
    .scroll::-webkit-scrollbar {
        display: none;
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    padding: 16px 0px;
    position: relative; /* 자식 요소들을 절대 위치로 설정할 수 있도록 상대 위치로 설정 */
`;

const Logo = styled.img`
    width: 140px;
    height: 50px;
    cursor: pointer;
    position: absolute; /* 절대 위치 설정 */
    left: 50%; /* 수평 중앙 정렬을 위해 왼쪽에서 50% 위치로 설정 */
    transform: translateX(-50%); /* 중앙 정렬을 위한 수평 이동 */

    &.hidden {
        visibility: hidden;
    }
`;

const BackButton = styled.button`
    width: 54px;
    height: 54px;
    border: none;
    color: #B8B6B4;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute; /* 절대 위치 설정 */
    left: 18px; /* 왼쪽에서 18px 떨어진 위치에 설정 */

    cursor: pointer;

    & > svg {
        width: 100%;
        height: 100%;
    }

    &.hidden {
        visibility: hidden; //hidden 클래스가 적용되면 visibility를 hidden(공간차지O)으로 설정
    }
`;

const Footer = styled.div`
    position: fixed;
    max-width: 390px;
    width: 100%;
    height: 90px;
    bottom: 0;
    border-radius: 10px 10px 0 0;
    box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: #FFFFFF;

    &.hidden {
        display: none; /* 추가된 부분: hidden 클래스가 적용되면 display 속성을 none(공간차지x)으로 설정 */
    }
`;

const ButtonContainer = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    gap: 1.4vh;
    color: ${props => props.active ? '#6A0DAD' : '#D6D6D6'}; // active 상태에 따른 색상 변경
    .icon {
        width: 32px;
        height: 32px;
    }
    .icon2 {
        width: 38px;
        height: 38px;
    }
    .icon4 {
        width: 30px;
        height: 30px;
        padding-top: 2px;
    }
`;

const ButtonText = styled.div`
    font-size: 14px;
    font-weight: 500;
`;

const ButtonContainer2 = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    gap: 1.2vh;
    color: ${props => props.active ? '#6A0DAD' : '#D6D6D6'}; // active 상태에 따른 색상 변경
    .icon2 {
        width: 38px;
        height: 38px;
    }
    .icon3 {
        width: 42px;
        height: 42px;
    }
    .icon5 {
        width: 40px;
        height: 40px;
    }
`;

const ButtonText2 = styled.div`
    font-size: 14px;
    font-weight: 500;
`;

const LOGO_DEFAULT = true;
const FOOTER_DEFAULT = true;
const BACKWARD_DEFAULT = '/';

// 특정 경로들과 연결된 페이지들도 버튼이 활성화되도록 경로 그룹을 정의
const MAIN_GROUP = ['/main']; //각 그룹에 해당되는 주소 넣어야 그 페이지일때도 색 활성화
const DIETHON_GROUP = ['/diethon'];
const MYPAGE_GROUP = ['/mypage', '/myinfo', '/myfoodexchangelist']; 

const Mobile = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [showLogo, setLogo] = useState(LOGO_DEFAULT); //useEffect에서 route.logo 값을 확인하여 showLogo 상태를 업데이트
    const [showFooter, setFooter] = useState(FOOTER_DEFAULT); //useEffect에서 route.footer 값을 확인하여 showFooter 상태를 업데이트
    const [backwardUrl, setBackwardUrl] = useState(BACKWARD_DEFAULT);

    useEffect(() => {
        const result = matchRoutes(routes, location.pathname);

        if (result.length < 1) {
            return;
        }

        const { route } = result[0];

        if (route) {
            setLogo(route.logo ?? LOGO_DEFAULT);
            setFooter(route.footer ?? FOOTER_DEFAULT);
            setBackwardUrl(route.previous ?? BACKWARD_DEFAULT);
        } else {
            setLogo(LOGO_DEFAULT);
            setFooter(FOOTER_DEFAULT);
            setBackwardUrl(BACKWARD_DEFAULT);
        }
    }, [location]);

    const onBackButtonClick = (event) => {
        navigate(backwardUrl);
    };
    // 현재 경로가 각 그룹에 속하는지 확인
    const isActive = (path, group) => group.includes(location.pathname) || location.pathname === path;

    const isMapPage = location.pathname === '/map'; // 'map' 경로일 경우 true

    return (
        <>
            <Container>
                <Content isMap={isMapPage}>
                    <Header>
                        <BackButton
                            onClick={onBackButtonClick}
                            className={classNames({
                                hidden: backwardUrl === false,
                            })}
                        >
                            <BiChevronLeft />
                        </BackButton>
                        <Logo
                            src='/images/mealdangHeaderLogo.png'
                            alt="mealdang"
                            className={classNames({
                                hidden: !showLogo,
                            })}
                            onClick={() => navigate('/')}
                        />
                    </Header>
                    <Outlet />
                </Content>
                <Footer className={classNames({ hidden: !showFooter })}>
                    {/* 경로 그룹과 함께 isActive 함수를 사용해 버튼이 활성화 상태인지 확인 */}
                    <ButtonContainer to="/map" active={isActive('/map', [])}>
                        <FaMapMarkerAlt className='icon' />
                        <ButtonText>밀당 맵</ButtonText>
                    </ButtonContainer>
                    <ButtonContainer2 style={{ paddingBottom: "4px" }} to="/bloodsugar" active={isActive('/bloodsugar', [])}>
                        <MdWaterDrop className='icon2' />
                        <ButtonText2>혈당 관리</ButtonText2>
                    </ButtonContainer2>
                    <ButtonContainer2 to="/main" style={{ paddingBottom: "9px" }} active={isActive('/main', MAIN_GROUP)}>
                        <MdFoodBank className='icon3' />
                        <ButtonText2>홈</ButtonText2>
                    </ButtonContainer2>
                    <ButtonContainer to="/diethon" active={isActive('/diethon', DIETHON_GROUP)}>
                        <FaMedal className='icon4' />
                        <ButtonText>식단톤</ButtonText>
                    </ButtonContainer>
                    <ButtonContainer2 style={{ paddingBottom: "7px" }} to="/mypage" active={isActive('/mypage', MYPAGE_GROUP)}>
                        <BsFillPersonFill className='icon5' />
                        <ButtonText2>마이페이지</ButtonText2>
                    </ButtonContainer2>
                </Footer>
            </Container>
        </>
    );
};

export default Mobile;
