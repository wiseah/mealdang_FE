import styled from "styled-components";
import DailyDataUpdate from '../components/BloodSugarComponents/DailyDataUpdate';
import WeeklyDataChart from '../components/BloodSugarComponents/WeeklyDataChart';
import PercentageChart from '../components/BloodSugarComponents/PercentageChart';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 390px;
  min-height: 100vh;
  place-items: center;
`

const ContainerItem = styled.div`
  margin-bottom: 13px;
`


const BloodSugar = () => {

  return (
    <Container>
      <ContainerItem> <DailyDataUpdate /> </ContainerItem>
      <ContainerItem> <WeeklyDataChart /> </ContainerItem>
      <ContainerItem> <PercentageChart /> </ContainerItem>
    </Container>
  );
};

export default BloodSugar;
