import React, { useState } from 'react';
import styled from 'styled-components';
import { ResponsiveBar } from '@nivo/bar';
import { AiFillAlert } from 'react-icons/ai';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 390px;
  place-items: center;
`;

const GraphContainer = styled.div`
  width: 363px;
  height: 210px;
  border: 1.18px solid #6A0DAD;
  border-radius: 11.85px;
  box-shadow: 0px 4.74px 4.74px #B7B7B7;
`;

const Title = styled.div`
  font-family: 'WavvePADO-Regular';
  font-size: 28px;
  font-weight: 500;
  margin: 18px 20px;
  width: 323px;
`;

const Normal = styled.div`
  margin: 5px 0 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'WavvePADO-Regular';
  font-size: 17px;
  color: #737373;
`;

const PointSpan = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: #000000;
  margin: 0 5px 5px 0;
`;

const Item = styled.div`
  display: flex;
  justify-items: center;
  margin: 0;
  padding-left: 26px;
`

const Guide = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 35px;
`;

const GuideItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 22px;
`;

const IconWrapper = styled.div`
  margin-right: 0;
`;

const Message1 = styled.div`
  font-family: 'WavvePADO-Regular';
  font-size: 17px;
  color: #FF4A4A;
`;

const Message2 = styled.div`
  font-family: 'WavvePADO-Regular';
  font-size: 17px;
  color: #FFAC4A;
`;

const Message3 = styled.div`
  font-family: 'WavvePADO-Regular';
  font-size: 17px;
  color: #2ADEA1;
`;


// 임의 데이터
const normal_range_percentage = [
  {
    "low": 1,
    "caution": 1,
    "normal": 3,
    "high": 1,
    "very_high": 1
  }
];
// 백 연동 시 90~여기까지 삭제



const PercentageChart = () => {

  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://*/api/bloodsugar/state/');
  //       const apiData = response.data.normal_range_percentage;
  //       // 데이터 변환
  //       const transformedData = [
  //         {
  //           low: apiData.low,
  //           caution: apiData.caution,
  //           normal: apiData.normal,
  //           high: apiData.high,
  //           very_high: apiData.very_high,
  //         }
  //       ];
  //       setData(transformedData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (!data) return null;



  return (
    <Container>
      <GraphContainer>
        <Title>최근 일주일 정상 수치 비율</Title>
        <Normal><PointSpan>{normal_range_percentage[0].normal}</PointSpan> 회 </Normal>
        {/* <Normal><PointSpan>{data[0].normal}</PointSpan> 회 </Normal>  */}
        {/* 백 연동 시 140 삭제하고 141 사용 */}
        <Item style={{ width: '311px', height: '24px' }}>
          <ResponsiveBar
            data={normal_range_percentage}
            keys={['low', 'caution', 'normal', 'high', 'very_high']}
            indexBy="normal"
            margin={{ top: 50, bottom: 50 }}
            layout="horizontal"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={["#FF4A4A", "#FFAC4A", "#2ADEA1", "#FFAC4A", '#FF4A4A']}
            axisTop={null}
            axisRight={null}
            axisBottom={null} // x축 tick 없앰
            axisLeft={null} // y축 tick 없앰
            labelSkipWidth={12}
            labelSkipHeight={12}
            legends={[]}
            animate={false}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={(e) =>
              `${e.id}: ${e.formattedValue} in category: ${e.indexValue}`
            }
            theme={{
              labels: {
                text: {
                  fontSize: 14,
                  fontFamily: 'WavvePADO-Regular',
                },
              },
            }}
          />
        </Item>
        <Guide>
          <GuideItem>
            <IconWrapper><AiFillAlert size={38} color="#FF4A4A" /></IconWrapper>
            <Message1>위험해요!</Message1>
          </GuideItem>
          <GuideItem>
            <IconWrapper><AiFillAlert size={38} color="#FFAC4A" /></IconWrapper>
            <Message2>조심해요!</Message2>
          </GuideItem>
          <GuideItem>
            <IconWrapper><AiFillAlert size={38} color="#2ADEA1" /></IconWrapper>
            <Message3>정상이에요</Message3>
          </GuideItem>
        </Guide>
      </GraphContainer>
    </Container>
  )
};

export default PercentageChart;
