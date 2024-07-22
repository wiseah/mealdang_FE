import Main from "./pages/Main/Main";
import Login from "./pages/Landing/Login";
import Sitemap from "./pages/Sitemap";
import Test from "./pages/Landing/Test";
import FoodExchangeList from "./pages/Landing/FoodExchangeList";
import Landing from "./pages/Landing/Landing";
import Join from "./pages/Landing/Join";
import JoinSuccess from "./pages/Landing/JoinSuccess";
import Map from "./pages/Map/Map";
import BloodSugar from "./pages/BloodSugar";
import DiethonMain from "./pages/Diethon/DiethonMain";
import MyPage from "./pages/MyPage/MyPage";
import MyInfo from "./pages/MyPage/MyInfo";
import MyFoodExchangeList from './pages/MyPage/MyFoodExchangeList';
import AfterMain from "./pages/Main/AfterMain";

const routes = [
    {
        path: '/',
        element: <Sitemap />,
        previous: false,
    },
    {
        path: '/main',
        element: <Main />,
        name: '01. 메인 페이지',
        previous: false,
    },
    {
        path: '/login',
        element: <Login />,
        logo: false,
        name: '02. 로그인 페이지',
        previous: false,
        footer: false,
    },
    {
        path: '/test',
        element: <Test />,
        name: '03. 진단테스트 페이지',
        previous: '/login',
        footer: false,
    },
    {
        path: '/foodexchangelist',
        element: <FoodExchangeList />,
        name: '04. 식품교환표 페이지',
        previous: '/test',
        footer: false,
    },
    {
        path: '/landing',
        element: <Landing />,
        logo: false,
        name: '05. 랜딩 페이지',
        previous: false,
        footer: false,
    },
    {
        path: '/join',
        element: <Join />,
        name: '06. 회원가입 페이지',
        previous: '/login',
        footer: false,
    },
    {
        path: '/joinsuccess',
        element: <JoinSuccess />,
        logo: false,
        name: '07. 회원가입 완료 페이지',
        previous: false,
        footer: false,
    },
    {
        path: '/map',
        element: <Map />,
        name: '08. 밀당 맵 페이지',
        previous: false,
    },
    {
        path: '/bloodsugar',
        element: <BloodSugar />,
        name: '09. 혈당 관리 페이지',
        previous: false,
    },
    {
        path: '/diethon',
        element: <DiethonMain />,
        name: '10. 식단톤 메인 페이지',
        previous: false,
    },
    {
        path: '/mypage',
        element: <MyPage />,
        name: '11. 마이 페이지',
        previous: false,
    },
    {
        path: '/myinfo',
        element: <MyInfo />,
        name: '12. 내 정보 페이지',
        previous: '/mypage',
    },
    {
        path: '/myfoodexchangelist',
        element: <MyFoodExchangeList />,
        name: '13. 내 식품교환표 페이지',
    },
    {
        path: '/aftermain',
        element: <AfterMain/>,
        name: '14. 식단 추천 이후의 메인페이지',
        previous: false,
    },
]

export default routes;