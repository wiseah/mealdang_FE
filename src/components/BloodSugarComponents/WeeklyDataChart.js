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
  height: 253px;
  border: 2px solid #6A0DAD;
  border-radius: 11.85px;
  box-shadow: 0px 4.74px 4.74px #B7B7B7;
  position: relative;
`

const Title = styled.div`
font-family: 'Do Hyeon', sans-serif;
  font-size: 30px;
  font-weight: 500;
  margin: 14px 20px;
  width: 323px;
`;

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
  z-index: 1;
`

const WeeklyDataChart = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBloodSugarsState();
        const weeklyData = response.weekly_data || [];
        const formattedData = formatData(weeklyData);

        if (formattedData.length === 0) {
          // 대체 데이터 설정
          setData(getFallbackData());
          setOpenModal(true);
        } else {
          setData(formattedData);
        }
      } catch (error) {
        console.error('WeeklyDataChart 내 getBloodSugarsState에서 에러 발생: ', error);
      } finally {
        setLoading(false); // 데이터 로딩 완료
      }
    };

    fetchData();
  }, []);

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

  const getFallbackData = () => {
    return [
      {
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
      }
    ];
  };

  // y축 tick 값 계산 함수
  const calculateYTicks = () => {
    if (data.length === 0) return [60, 120, 180];

    const minData = Math.min(...data.flatMap(d => d.data.map(item => item.y).filter(y => y !== undefined))) - 20;
    const maxData = Math.max(...data.flatMap(d => d.data.map(item => item.y).filter(y => y !== undefined))) + 20;

    return [
      Math.floor(minData),
      Math.floor(minData + (maxData - minData) / 3),
      Math.floor(minData + (maxData - minData) * 2 / 3),
      Math.ceil(maxData),
    ];
  };

  const yTicks = calculateYTicks();

  return (
    <Container>
      <GraphContainer>
        <Title>주별 혈당 그래프</Title>
        <div style={{ height: '250px' }}>
          {loading ? (
            <div>로딩 중...</div> // 로딩 상태 표시
          ) : (
            <>
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
              {data.length === 0 && <NoDataOverlay>데이터가 충분하지 않습니다</NoDataOverlay>}
            </>
          )}
        </div>
      </GraphContainer>
    </Container>
  );
};

export default WeeklyDataChart;