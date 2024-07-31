import styled from "styled-components";
import Ranking from "../../components/Ranking";
import Diet from "../../components/Diet";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Container =styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`


const Introduce = styled.div`
  width: 319px;
  height: 30px;
  color: #000;
  font-family: "Wavve PADO TTF";
  font-size: 24px;
  font-weight: 400;
  align-self: flex-start;
  margin-top: 25px;
  margin-left: 34px;
`

const ColorWord = styled.span`
  color: #6A0DAD;
`

const Register = styled.div`
  width: 200px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  margin-right: 25px;
  margin-bottom: 10px;
  cursor: pointer;
`
const RegisterText = styled.div`
  width: 173px;
  color: #9370DB;
  text-align: right;
  font-family: "Wavve PADO TTF";
  font-size: 15px;
  font-weight: 400;
`
const RegisterIcon = styled(BsArrowRight)`
  width: 15px;
  height: 15px;
  color: #9370DB;
  padding-left: 3px;
`

export default function Diethon(){
  const navigate = useNavigate();

  return(
      <Container>
          <Ranking/>
          <Introduce><ColorWord>37개</ColorWord>의 식단이 등록되었어요</Introduce>
          <Register onClick={navigate()}><RegisterText>나만의 식단 등록하러 가기</RegisterText><RegisterIcon/>
          </Register>
          <Diet/>
      </Container>
  )

}