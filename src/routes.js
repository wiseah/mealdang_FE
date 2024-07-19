import Main from "./pages/Main";
import Login from "./pages/Login";
import Sitemap from "./pages/Sitemap";
import Test from "./pages/Test";
import FoodExchangeList from "./pages/FoodExchangeList";
import Landing from "./pages/Landing";
import Join from "./pages/Join";
import JoinSuccess from "./pages/JoinSuccess";



const routes = [
    {
        path: '/',
        element: <Sitemap />,
    },
    {
        path: '/main',
        element: <Main />,
        name: '01. 메인 페이지'
    },
    {
        path: '/login',
        element: <Login />,
        name: '02. 로그인 페이지'
    },
    {
        path: '/test',
        element: <Test />,
        name: '03. 진단테스트 페이지'
    },
    {
        path: '/foodexchangelist',
        element: <FoodExchangeList />,
        name: '04. 식품교환표 페이지'
    },
    {
        path: '/landing',
        element: <Landing />,
        name: '05. 랜딩 페이지'
    },
    {
        path: '/join',
        element: <Join />,
        name: '06. 회원가입 페이지'
    },
    {
        path: '/joinSuccess',
        element: <JoinSuccess />,
        name: '07. 회원가입 완료 페이지'
    },

]

export default routes;