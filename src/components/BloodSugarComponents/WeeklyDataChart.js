import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ResponsiveLine } from '@nivo/line';

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
`

const Title = styled.div`
  font-family: 'WavvePADO-Regular';
  font-size: 28px;
  font-weight: 500;
  margin: 18px 20px;
  width: 323px;
`


const WeeklyDataChart = () => {
  const [data, setData] = useState([]);

  // // 데이터 가져오기
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://*/api/bloodsugar/state/');
  //       const weeklyData = response.data;

  //       const formattedData = formatData(weeklyData); //백엔드에서 주는 데이터 형식 변환해야 함
  //       setData(formattedData);
  //     } catch (error) {
  //       console.error('Error fetching weekly data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);


  // // 데이터 형식 변환

  // const formatData = (data) => {
  //   const formattedData = [
  //     {
  //       id: "공복 혈당",
  //       data: data.weekly_data.map(item => ({
  //         x: item.date.slice(5).replace('-', '.'),
  //         y: item.fasting_blood_sugar === null ? undefined : item.fasting_blood_sugar
  //       }))
  //     },
  //     {
  //       id: "식후 2시간 이후 혈당",
  //       data: data.weekly_data.map(item => ({
  //         x: item.date.slice(5).replace('-', '.'),
  //         y: item.post_meal_blood_sugar === null ? undefined : item.post_meal_blood_sugar
  //       }))
  //     }
  //   ];
  //   // 혈당 수치 null 값이면 undefined 반환하고 그래프 내 데이터 포인트 무시하고 빈 공간으로 처리

  //   return formattedData;
  // };



  // 임시 데이터
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const weeklyData = [
          {
            date: "2024-07-10",
            fasting_blood_sugar: 110,
            post_meal_blood_sugar: 140
          },
          {
            date: "2024-07-11",
            fasting_blood_sugar: 115,
            post_meal_blood_sugar: 145
          },
          {
            date: "2024-07-12",
            fasting_blood_sugar: 108,
            post_meal_blood_sugar: 138
          },
          {
            date: "2024-07-13",
            fasting_blood_sugar: 112,
            post_meal_blood_sugar: 142
          },
          {
            date: "2024-07-14",
            fasting_blood_sugar: 120,
            post_meal_blood_sugar: 150
          }
        ];

        setWeeklyData(weeklyData);
        const formattedData = formatData(weeklyData);
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching weekly data:', error);
      }
    };

    fetchData();
  }, []);

  // 데이터 형식 변환
  const formatData = (data) => {
    const formattedData = [
      {
        id: "공복 혈당",
        data: data.map(item => ({
          x: item.date.slice(5).replace('-', '.'),
          y: item.fasting_blood_sugar
        }))
      },
      {
        id: "식후 2시간 이후 혈당",
        data: data.map(item => ({
          x: item.date.slice(5).replace('-', '.'),
          y: item.post_meal_blood_sugar
        }))
      }
    ];

    return formattedData;
  };
  // API 연동 시 여기까지 지워도 됨


  // y축 tick 값 계산 함수
  const calculateYTicks = () => {
    if (weeklyData.length === 0) return [60, 120, 180]; // 기본값

    // 공복 혈당과 식후 2시간 이후 혈당의 최소값과 최대값
    const minFasting = Math.min(...weeklyData.map(item => item.fasting_blood_sugar)) - 10;
    const maxPostMeal = Math.max(...weeklyData.map(item => item.post_meal_blood_sugar)) + 10;

    // y축 tick 정하기
    const yTicks = [
      Math.floor(minFasting),
      Math.floor(minFasting + (maxPostMeal - minFasting) / 3),
      Math.floor(minFasting + (maxPostMeal - minFasting) * 2 / 3),
      Math.ceil(maxPostMeal)
    ];

    return yTicks;
  };

  const yTicks = calculateYTicks();



  return (
    <Container>
      <GraphContainer>
        <Title>주별 혈당 그래프</Title>
        <div style={{ height: '250px' }}>
          <ResponsiveLine
            data={data}
            margin={{ top: 5, right: 50, bottom: 130, left: 60 }}
            xScale={{ type: 'point' }} //x축 데이터 형태: 날짜
            yScale={{
              type: 'linear',
              min: yTicks[0],
              max: yTicks[3],
              stacked: false,
              reverse: false,
            }}
            curve="linear" //꺽은 선 그래프 형태
            axisTop={null} // 축 레이블 숨기기
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
            colors={["#2ADEA1", "#6A0DAD"]} // 그래프 색
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
                    id: 'fasting',
                    type: 'line',
                    color: '#2ADEA1',
                    value: '공복 혈당'
                  },
                  {
                    id: 'post_meal',
                    type: 'line',
                    color: '#6A0DAD',
                    value: '식후 2시간 이후 혈당'
                  }
                ]
              }
            ]}
          />
        </div>
      </GraphContainer>
    </Container>
  );
};

export default WeeklyDataChart;
