import { Link,Outlet, matchRoutes, useLocation, useNavigate,} from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import routes from '../routes.js';
import classNames from 'classnames'; //다양한 형태의 인수를 받아서 조건부로 클래스 이름을 설정할 수 있

const Container=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    overflow: auto;
`;

const Content=styled.div`
    width:100%;
    max-width:390px;
    min-height:100vh;
    overflow:auto;
    box-shadow:0px 0px 32px #0000002f;
    background-color: #ffffff;
    //padding-bottom: 260px; //footer높이만큼 패딩 줘야함. 그래야 내용 다보임.
`;

const Header=styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height:60px;
    padding:16px 20px;
    /* background-color: #FFFBF1; */
`;
const Logo = styled.img`
width: 140px;
height: 50px;
cursor: pointer;

&.hidden {
    visibility: hidden;
}
`

const LOGO_DEFAULT = true;
const FOOTER_DEFAULT = false;
// const BACKWARD_DEFAULT = '/';

const Mobile=()=>{
    const location = useLocation();
    const navigate = useNavigate();

    const [showLogo, setLogo] = useState(LOGO_DEFAULT);
    const [showFooter, setFooter] = useState(FOOTER_DEFAULT);
    // const [backwardUrl, setBackwardUrl] = useState(BACKWARD_DEFAULT);

    useEffect(() => {
        const result = matchRoutes(routes, location.pathname);

        if (result.length < 1) {
            return;
        }

        const { route } = result[0];

        if (route) {
            setLogo(route.logo ?? LOGO_DEFAULT);
            setFooter(route.footer ?? FOOTER_DEFAULT);
            // setBackwardUrl(route.previous ?? BACKWARD_DEFAULT);
        } else {
            setLogo(LOGO_DEFAULT);
            setFooter(FOOTER_DEFAULT);
            // setBackwardUrl(BACKWARD_DEFAULT);
        }
    }, [location]);
    return(
        <>
            <Container>
                <Content>
                    <Header>
                        <Logo 
                            src='/images/mealdangHeaderLogo.png' alt="mealdang" 
                            className={classNames({
                                hidden: !showLogo,
                            })}
                            onClick={() => navigate('/main')}
                        />
                    </Header>
                    <Outlet /> 
                </Content>
            </Container>
        </>
    )
};

export default Mobile;