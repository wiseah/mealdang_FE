import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import restaurantIcon from './restaurant-icon.png';
import cafeIcon from './cafe-icon.png';
import { dummyData } from './MapList';
const { kakao } = window;

// 스타일 컴포넌트 정의
const Container = styled.div`
  width: 390px;
  height: 628px;
  position: relative;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.25);
`;

const CategoryWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  background: none;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 136px;
`;

const CategoryDiv = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.active ? '#D9D9D9' : '#fff'};
  border: 1px solid;
  border-radius: 3px;
  cursor: pointer;
  &:hover{
    background-color: #ffe6e6;
  }
  gap: 0.4vh;
  padding: 6px 8px;
`;

const CategoryButton = styled.div`
  color: ${props => props.active ? 'white' : 'black'};
`;

const CategoryImg = styled.img`
    width: 46px;
    height: 46px;
`;

// 장소 정보 표시를 위한 스타일 컴포넌트
const PlaceInfoWrapper = styled.div`
  position: relative;
  margin-bottom: 5px;
  background: white;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  box-shadow: 0px 1px 2px #888;
  width: 260px;

  &:after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 12px 12px 0;
    border-color: white transparent;
    display: block;
    width: 0;
    z-index: 1;
    bottom: -12px;
    left: 50%;
    margin-left: -12px;
  }
`;

const PlaceTitle = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: white;
  background: #6A0DAD;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 6px 6px 0 0;
  margin: -1px -1px 0 -1px;

  &:after {
    content: '>';
    font-size: 12px;
  }
`;

const PlaceContent = styled.div`
  padding: 10px 15px;
`;

const PlaceAddress1 = styled.span`
  display: block;
  margin-top: 6px;
  font-size: 16px;
  color: #000;
  /* font-weight: bold; */
`;

const PlaceAddress = styled.span`
  display: block;
  margin-top: 6px;
  font-size: 13px;
  color: #8a8a8a;
  /* font-weight: bold; */
`;

const PlacePhone = styled.span`
  display: block;
  margin-top: 14px;
  font-size: 13px;
  color: #009900;
`;

function Map() {
  const [map, setMap] = useState(null);
  const [categories, setCategories] = useState(['FD6', 'CE7']);
  const [markers, setMarkers] = useState([]);
  const customOverlayRef = useRef(null);

  useEffect(() => {
    // 지도 초기화
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 서울 시청
      level: 7
    };

    const newMap = new kakao.maps.Map(mapContainer, mapOption);
    setMap(newMap);

    // 장소 검색 및 마커 표시 함수
    function searchPlaces() {
      removeMarkers();

      categories.forEach(category => {
        const data = category === 'FD6' ? dummyData.restaurant : dummyData.cafe;
        data.forEach(item => {
          const position = new kakao.maps.LatLng(item.latitude, item.longitude);
          const marker = addMarker(position, category);
          setMarkers(prevMarkers => [...prevMarkers, marker]);
        });
      });
    }

    // 마커 추가 함수
    function addMarker(position, category) {
      const markerImage = new kakao.maps.MarkerImage(
        category === 'FD6' ? restaurantIcon : cafeIcon,
        new kakao.maps.Size(46, 46),
        { offset: new kakao.maps.Point(23, 23) }
      );

      const marker = new kakao.maps.Marker({
        position: position,
        image: markerImage,
        map: newMap
      });

      kakao.maps.event.addListener(marker, 'click', function() {
        displayPlaceInfo(position, category);
      });

      return marker;
    }

    // 마커 제거 함수
    function removeMarkers() {
      markers.forEach(marker => marker.setMap(null));
      setMarkers([]);
      if (customOverlayRef.current) {
        customOverlayRef.current.setMap(null);
      }
    }

    // 장소 정보 표시 함수
    function displayPlaceInfo(position, category) {
      const ps = new kakao.maps.services.Places();
      
      ps.categorySearch(category, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          // 가장 가까운 장소 찾기
          const nearestPlace = data.reduce((nearest, place) => {
            const placePosition = new kakao.maps.LatLng(place.y, place.x);
            const distance = calculateDistance(position, placePosition);
            return (distance < nearest.distance) ? { place, distance } : nearest;
          }, { place: null, distance: Infinity }).place;

          if (nearestPlace) {
            const content = `
              <div style="
                position: relative; 
                margin-bottom: 5px; 
                background: white; 
                border-radius: 6px; 
                border: 1px solid #ccc; 
                border-bottom: 2px solid #ddd; 
                box-shadow: 0px 1px 2px #888; 
                width: 260px;"
              >
                <div style="
                  content: '';
                  position: absolute;
                  border-style: solid;
                  border-width: 12px 12px 0;
                  border-color: white transparent;
                  display: block;
                  width: 0;
                  z-index: 1;
                  bottom: -12px;
                  left: 50%;
                  margin-left: -12px;
                "></div>
                <div style="
                  display: flex; 
                  justify-content: space-between; 
                  align-items: center; 
                  text-decoration: none; 
                  color: white; 
                  background: #6A0DAD;
                  font-size: 14px; 
                  font-weight: bold; 
                  border-radius: 6px 6px 0 0; 
                  margin: -1px -1px 0 -1px;"
                >
                  <a href="${nearestPlace.place_url}" 
                    target="_blank" 
                    style="display: flex;
                      justify-content: space-between;
                      align-items: center;
                      text-decoration: none;
                      color: white;
                      background: #6A0DAD;
                      padding: 10px 15px;
                      font-size: 14px;
                      font-weight: bold;
                      border-radius: 6px 6px 0 0;
                      width: 260px;
                      "
                  >${nearestPlace.place_name}
                  <span style="float: right; color:#fff; font-size: 24px;">></span>
                  </a>
                </div>
                <div style="background-color: white; padding: 10px 15px;">
                  <p style="margin: 5px 0; font-size: 13px;">${nearestPlace.road_address_name || nearestPlace.address_name}</p>
                  ${nearestPlace.road_address_name ? `<p style="margin: 5px 0; font-size: 11px; color: #8a8a8a;">(지번 : ${nearestPlace.address_name})</p>` : ''}
                  <p style="margin: 5px 0; font-size: 11px; color: #009900;">${nearestPlace.phone}</p>
                </div>
              </div>
            `;

            // 기존 오버레이 제거
            if (customOverlayRef.current) {
              customOverlayRef.current.setMap(null);
            }

            // 새 오버레이 생성 및 표시
            const newOverlay = new kakao.maps.CustomOverlay({
              content: content,
              position: position,
              yAnchor: 1.15
            });

            newOverlay.setMap(newMap);
            customOverlayRef.current = newOverlay;
          }
        }
      }, {
        location: position,
        radius: 1000
      });
    }

    searchPlaces();

    // 컴포넌트 언마운트 시 마커 제거
    return () => {
      removeMarkers();
    };

  }, [categories]);

  // 두 지점 간의 거리를 계산하는 함수
  function calculateDistance(pos1, pos2) {
    const deg2rad = deg => deg * (Math.PI/180);
    const R = 6371; // 지구의 반경 (km)
    const dLat = deg2rad(pos2.getLat() - pos1.getLat());
    const dLon = deg2rad(pos2.getLng() - pos1.getLng());
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(pos1.getLat())) * Math.cos(deg2rad(pos2.getLat())) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  }

  // 카테고리 클릭 핸들러
  const onClickCategory = (category) => {
    setCategories(prevCategories => 
      prevCategories.includes(category) ? 
      prevCategories.filter(cat => cat !== category) : 
      [...prevCategories, category]
    );
  };

  return (
    <Container>
      <CategoryWrapper>
        <CategoryDiv 
          onClick={() => onClickCategory('FD6')} 
          active={categories.includes('FD6')}
        >
          <CategoryButton>
            음식점
          </CategoryButton>
          <CategoryImg src={restaurantIcon}/>
        </CategoryDiv>
        <CategoryDiv
          onClick={() => onClickCategory('CE7')} 
          active={categories.includes('CE7')}
        >
          <CategoryButton>
            카페
          </CategoryButton>
          <CategoryImg src={cafeIcon}/>
        </CategoryDiv>
      </CategoryWrapper>
      <div id="map" style={{width: "100%", height:"100%"}}></div>
    </Container>
  );
}

export default Map;