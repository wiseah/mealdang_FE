import Main from "./pages/Main";
import Login from "./pages/Login";
import Sitemap from "./pages/Sitemap";
import Test from "./pages/Test";


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
]

export default routes;