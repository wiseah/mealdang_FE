import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import getBloodSugarsState from "../../APIs/get/getBloodSugarsState";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 390px;
  place-items: center;
`

const GraphContainer = styled.div`
  width: 363px;
  height: 250px;
  border: 1.18px solid #6A0DAD;
  border-radius: 11.85px;
  box-shadow: 0px 4.74px 4.74px #B7B7B7;
  position: relative;
`

const Title = styled.div`
  font-family: 'WavvePADO-Regular';
  font-size: 28px;
  font-weight: 500;
  margin: 18px 20px;
  width: 323px;
`

const NoDataOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(245, 245, 245, 0.8);
  border-radius: 11.85px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: #6A0DAD;
  font-weight: 500;
  z-index: 10;
`

const WeeklyDataChart = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {

      try {

        const response = await getBloodSugarsState();
        const weeklyData = response.weekly_data || [];
        const formattedData = formatData(weeklyData);

        setData(formattedData);

      } catch (error) {
        console.error('WeeklyDataChart 내 getBloodSugarsState에서 에러 발생: ', error);
      }
    };

    fetchData();
  }, []);

  // 데이터 형식 변환
  const formatData = (data) => {
    return [
      {
        id: "공복 혈당",
        data: data.map(item => ({
          x: item.date.slice(5).replace('-', '.'),
          y: item.fasting_blood_sugar !== null ? item.fasting_blood_sugar : undefined
        }))
      },
      {
        id: "식후 2시간 이후 혈당",
        data: data.map(item => ({
          x: item.date.slice(5).replace('-', '.'),
          y: item.post_meal_blood_sugar !== null ? item.post_meal_blood_sugar : undefined
        }))
      }
    ];
  };


  // y축 tick 값 계산 함수
  const calculateYTicks = () => {
    if (data.length === 0) return [60, 120, 180];

    const minFasting = Math.min(...data[0].data.map(item => item.y)) - 10;
    const maxPostMeal = Math.max(...data[1].data.map(item => item.y)) + 10;

    const yTicks = [
      Math.floor(minFasting),
      Math.floor(minFasting + (maxPostMeal - minFasting) / 3),
      Math.floor(minFasting + (maxPostMeal - minFasting) * 2 / 3),
      Math.ceil(maxPostMeal)
    ];

    return yTicks;
  };

  const yTicks = calculateYTicks();



  const isDataEmpty = data.length === 0;

  if (isDataEmpty) {
    setData([{
      id: "공복 혈당",
      data: [
        { x: "07.30", y: 102 },
        { x: "07.31", y: 100 },
        { x: "08.01", y: 98 },
        { x: "08.02", y: 100 },
        { x: "08.03", y: 97 },
        { x: "08.04", y: 95 },
        { x: "08.05", y: 95 }
      ]
    },
    {
      id: "식후 2시간 이후 혈당",
      data: [
        { x: "07.30", y: 120 },
        { x: "07.31", y: 115 },
        { x: "08.01", y: 115 },
        { x: "08.02", y: 110 },
        { x: "08.03", y: 108 },
        { x: "08.04", y: 105 },
        { x: "08.05", y: 108 }
      ]
    }]);
    setOpenModal(true)
  }

  return (
    <Container>
      <GraphContainer>
        <Title>주별 혈당 그래프</Title>
        <div style={{ height: '250px' }}>
          <ResponsiveLine
            data={data}
            margin={{ top: 5, right: 50, bottom: 130, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: yTicks[0],
              max: yTicks[3],
              stacked: false,
              reverse: false,
            }}
            curve="linear"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickSize: 7,
              tickPadding: 10,
              tickRotation: 0,
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 7,
              tickPadding: 10,
              tickRotation: 0,
              tickValues: [yTicks[0], yTicks[1], yTicks[2], yTicks[3]],
            }}
            colors={["#2ADEA1", "#6A0DAD"]}
            enablePoints={true}
            pointSize={8}
            pointColor="#ffffff"
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="data.yFormatted"
            pointLabelYOffset={-14}
            enableTouchCrosshair={true}
            useMesh={true}
            enableArea={true}
            areaOpacity={0}
            enableGridX={false}
            enableGridY={true}
            gridYValues={[yTicks[0], yTicks[1], yTicks[2], yTicks[3]]}
            lineWidth={3}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 45,
                itemsSpacing: 20,
                itemDirection: 'left-to-right',
                itemWidth: 110,
                itemHeight: 0,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                items: [
                  {
                    id: '공복 혈당',
                    type: 'line',
                    color: '#2ADEA1',
                    value: '공복 혈당'
                  },
                  {
                    id: '식후 2시간 이후 혈당',
                    type: 'line',
                    color: '#6A0DAD',
                    value: '식후 2시간 이후 혈당'
                  }
                ]
              }
            ]}
          />
          {openModal && <NoDataOverlay>데이터가 충분하지 않습니다</NoDataOverlay>}
        </div>
      </GraphContainer>
    </Container>
  );
};

export default WeeklyDataChart;