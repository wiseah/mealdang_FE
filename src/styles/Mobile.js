import { Link,Outlet } from 'react-router-dom';
import styled from 'styled-components';

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

// 01.home Header
const Header=styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    height:40px;
    padding:16px 20px;
    background-color: #FFFBF1;
    margin-bottom: 30px;
`;



const Mobile=()=>{
    return(
        <>
            <Container>
                <Content>
                    <Header>
                        헤더
                    </Header>
                    <Outlet /> 
                </Content>
            </Container>
        </>
    )
};

export default Mobile;