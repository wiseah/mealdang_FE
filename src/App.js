import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import routes from './routes.js';
import Mobile from './styles/Mobile.js';
import styled from 'styled-components';

const Container = styled.div`
    height: 100%;
    background-position: center;
    background-size: cover;
    background-image: url('/images/backgroundImg.png');
    background-attachment: fixed; // Add this line to make the background fixed
`;

function App() {
  const elements = routes.map((item, index) => (
    <Route key={index} path={item.path} element={item.element} />
  ));
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<Mobile/>}>
            {elements}
          </Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
