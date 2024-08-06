import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ResponsiveBar } from '@nivo/bar';
import { AiFillAlert } from 'react-icons/ai';
import getBloodSugarsState from '../../APIs/get/getBloodSugarsState';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 390px;
  height: 300px;
  place-items: center;
`;

const GraphContainer = styled.div`
  width: 363px;
  height: 225px;
  border: 2px solid #6A0DAD;
  border-radius: 11.85px;
  box-shadow: 0px 4.74px 4.74px #B7B7B7;
  position: relative; 
  margin-bottom: 13px;
`;

const Title = styled.div`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 30px;
  font-weight: 500;
  margin: 14px 20px;
  width: 323px;
`;

const Normal = styled.div`
  margin: 0 0 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 20px;
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
`;

const Guide = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 53px 20px 53px;
`;

const GuideItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 22px;
  margin-bottom: 30px;
`;

const IconWrapper = styled.div`
  margin-right: 0;
`;

const Message1 = styled.div`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 17px;
  color: #FF4A4A;
`;

const Message2 = styled.div`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 17px;
  color: #FFAC4A;
`;

const Message3 = styled.div`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 17px;
  color: #2ADEA1;
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
`;

const PercentageChart = () => {
  const [data, setData] = useState([]);
  const [normalCount, setNormalCount] = useState('?');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBloodSugarsState();
        console.log(response);
        const apiData = response.normal_range_percentage;

        // 데이터 변환
        const transformedData = [
          {
            id: 'blood_sugar',
            low_blood_sugar: apiData.low_blood_sugar,
            caution_low_blood_sugar: apiData.caution_low_blood_sugar,
            normal: apiData.normal,
            caution_high_blood_sugar: apiData.caution_high_blood_sugar,
            high_blood_sugar: apiData.high_blood_sugar,
          }
        ];

        setData(transformedData);
        setNormalCount(apiData.normal);

        // 데이터가 비어있다면 기본 데이터 설정 및 모달 열기
        if (transformedData[0].normal === 0) {
          setData([{
            id: 'blood_sugar',
            low_blood_sugar: 1,
            caution_low_blood_sugar: 1,
            normal: 3,
            caution_high_blood_sugar: 1,
            high_blood_sugar: 1,
          }]);
          setOpenModal(true);
        }
      } catch (error) {
        console.error('PercentageChart 내 getBloodSugarsState에서 에러 발생: ', error);
      }
    };

    fetchData();
  }, []);

  const isDataEmpty = data.length === 0;

  return (
    <Container>
      <GraphContainer>
        <Title>최근 일주일 정상 수치 비율</Title>
        <div>
          <Normal><PointSpan>{normalCount}</PointSpan> 회 </Normal>
          <Item style={{ width: '311px', height: '24px' }}>
            <ResponsiveBar
              data={data}
              keys={['low_blood_sugar', 'caution_low_blood_sugar', 'normal', 'caution_high_blood_sugar', 'high_blood_sugar']}
              indexBy="id"
              margin={{ top: 50, bottom: 50 }}
              layout="horizontal"
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={["#FF4A4A", "#FFAC4A", "#2ADEA1", "#FFAC4A", '#FF4A4A']}
              axisTop={null}
              axisRight={null}
              axisBottom={null}
              axisLeft={null}
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
                    fontFamily: 'Do Hyeon'
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
          {isDataEmpty && <NoDataOverlay>데이터가 충분하지 않습니다</NoDataOverlay>}
        </div>
      </GraphContainer>
    </Container>
  );
};

export default PercentageChart;
