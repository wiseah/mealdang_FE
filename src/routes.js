import Main from "./pages/Main/Main";
import Login from "./pages/Landing/Login";
import Sitemap from "./pages/Sitemap";
import Diagnosis from "./pages/Landing/Diagnosis";
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
import GrapeExchange  from "./pages/MyPage/GrapeExchange";
import GraepUse from "./pages/MyPage/GrapeUse";
import FoodBookMark from "./pages/MyPage/FoodBookMark";
import FoodDetail from "./pages/Main/FoodDetail";
import FoodRegistration from "./pages/MyPage/FoodRegistraition";
import FavoriteFoodDetail from "./pages/MyPage/FavoriteFoodDetail";

const routes = [
    {
        path: '/',
        element: <Sitemap />,
        previous: false,
    },
    {
        path: '/landing',
        element: <Landing />,
        logo: false,
        name: '00. 랜딩 페이지',
        previous: false,
        footer: false,
    },
    {
        path: '/login',
        element: <Login />,
        logo: false,
        name: '01. 로그인 페이지',
        previous: false,
        footer: false,
    },
    {
        path: '/join',
        element: <Join />,
        name: '02. 회원가입 페이지',
        previous: '/login',
        footer: false,
    },
    {
        path: '/joinsuccess',
        element: <JoinSuccess />,
        logo: false,
        name: '03. 회원가입 완료 페이지',
        previous: false,
        footer: false,
    },
    {
        path: '/diagnosis',
        element: <Diagnosis />,
        name: '04. 진단테스트 페이지',
        previous: '/login',
        footer: false,
    },
    {
        path: '/foodexchangelist',
        element: <FoodExchangeList />,
        name: '05. 식품교환표 페이지',
        previous: '/diagnosis',
        footer: false,
    },
    {
        path: '/main',
        element: <Main />,
        name: '06. 메인 페이지',
        previous: false,
    },
    {
        path: '/aftermain',
        element: <AfterMain/>,
        name: '07. 식단 추천 이후의 메인페이지',
        previous: false,
    },
    {
        path: '/aftermain/foodDetail',
        element: <FoodDetail/>,
        name: '07-1. 식단 상세 페이지(메인)',
        previous: '/aftermain',
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
        previous: '/mypage',
    },
    {
        path: '/foodbookmark',
        element: <FoodBookMark/>,
        name: '14. 추천 식단 즐겨찾기',
        previous: '/mypage',
    },
    {
        path: '/foodbookmark/foodDetail',
        element: <FoodDetail/>,
        name: '14-1. 식단 상세 페이지(마이페이지)',
        previous: '/foodbookmark',
    },
    {
        path: '/grapeexchange',
        element: <GrapeExchange/>,
        name: '17. 포도 사용 페이지',
        previous: '/mypage',
    },
    {
        path: '/grapeuse',
        element: <GraepUse/>,
        name: '18. 포도 내역 페이지',
        previous: '/grapeexchange',
    },
    {
        path: '/favoritefooddetail',
        element: <FavoriteFoodDetail/>,
        name: '19. 즐겨찾기 식단 상세보기 페이지',
    },
    {
        path: '/foodregistration',
        element: <FoodRegistration/>,
        name: '20. 나만의 식단 등록하기',
    },
]

export default routes;