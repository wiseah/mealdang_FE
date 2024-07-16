import Main from "./pages/Main";

import Sitemap from "./pages/Sitemap";


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
]

export default routes;