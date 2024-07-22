import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import restaurantIcon from './restaurant-icon.png';
import cafeIcon from './cafe-icon.png';
const { kakao } = window;

// 컨테이너 스타일
const Container = styled.div`
  width: 390px;
  height: 628px;
  position: relative;
`;

// 카테고리 버튼 래퍼 스타일
const CategoryWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  background: white;
  padding: 5px;
  border-radius: 5px;
`;

// 카테고리 버튼 스타일
const CategoryButton = styled.button`
  margin-right: 5px;
  padding: 5px 10px;
  background: ${props => props.active ? '#6A0DAD' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : 'black'};
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

// 마커 기본 스타일
const MarkerWrapper = styled.div`
  width: 46px;
  height: 46px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

// 음식점 마커 스타일
const RestaurantMarker = styled(MarkerWrapper)`
  background-image: url(${restaurantIcon});
`;

// 카페 마커 스타일
const CafeMarker = styled(MarkerWrapper)`
  background-image: url(${cafeIcon});
`;

// 장소 정보 표시를 위한 스타일 컴포넌트
const PlaceInfoWrapper = styled.div`
  padding: 10px;
  background: white;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const PlaceTitle = styled.a`
  font-size: 16px;
  font-weight: bold;
  color: #0068c3;
  text-decoration: none;
  display: block;
  margin-bottom: 5px;
`;

const PlaceAddress = styled.span`
  font-size: 13px;
  color: #8a8a8a;
  display: block;
  margin-bottom: 3px;
`;

const PlacePhone = styled.span`
  font-size: 13px;
  color: #009900;
  display: block;
`;

function Map() {
  const [map, setMap] = useState(null);
  const [placeOverlay, setPlaceOverlay] = useState(null);
  const [categories, setCategories] = useState(['FD6', 'CE7']); // 기본적으로 두 카테고리 모두 선택
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null); // 선택된 마커 상태

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(37.57224, 127.01442),
      level: 3
    };

    const newMap = new kakao.maps.Map(mapContainer, mapOption);
    setMap(newMap);

    const ps = new kakao.maps.services.Places(newMap);
    const customOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 });
    setPlaceOverlay(customOverlay);

    // 지도 idle 이벤트 리스너 등록
    kakao.maps.event.addListener(newMap, 'idle', searchPlaces);

    // 장소 검색 함수
    function searchPlaces() {
      if (categories.length === 0) {
        return;
      }

      // 현재 지도에서 모든 마커를 제거
      customOverlay.setMap(null);
      removeMarkers();

      categories.forEach(category => {
        ps.categorySearch(category, placesSearchCB, { useMapBounds: true });
      });
    }

    // 장소 검색 콜백 함수
    function placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        displayPlaces(data);
      } else {
        console.error("검색 중 오류가 발생했습니다.");
      }
    }

    // 검색 결과 표시 함수
    function displayPlaces(places) {
      const newMarkers = places.map(place => {
        const marker = addMarker(new kakao.maps.LatLng(place.y, place.x), place);
        return marker;
      });
      setMarkers(prevMarkers => [...prevMarkers, ...newMarkers]);
    }

    // 마커 추가 함수
    function addMarker(position, place) {
      const MarkerComponent = place.category_group_code === 'FD6' ? RestaurantMarker : CafeMarker;

      const markerContent = document.createElement('div');
      ReactDOM.render(<MarkerComponent onClick={() => displayPlaceInfo(place, position)} />, markerContent);

      const marker = new kakao.maps.CustomOverlay({
        position: position,
        content: markerContent
      });

      marker.setMap(newMap);
      return marker;
    }

    // 마커 제거 함수
    function removeMarkers() {
      markers.forEach(marker => marker.setMap(null));
      setMarkers([]);
    }

    // 장소 정보 표시 함수
    function displayPlaceInfo(place, position) {
      const content = (
        <PlaceInfoWrapper>
          <PlaceTitle href={place.place_url} target="_blank" title={place.place_name}>
            {place.place_name}
          </PlaceTitle>
          <PlaceAddress>
            {place.road_address_name ? place.road_address_name : place.address_name}
          </PlaceAddress>
          <PlacePhone>{place.phone}</PlacePhone>
        </PlaceInfoWrapper>
      );
      
      const contentElement = document.createElement('div');
      ReactDOM.render(content, contentElement);

      // 이전에 선택된 마커의 정보 박스 제거
      if (selectedMarker) {
        selectedMarker.setMap(null);
      }

      customOverlay.setContent(contentElement);
      customOverlay.setPosition(position);
      customOverlay.setMap(newMap);

      // 선택된 마커 상태 업데이트
      setSelectedMarker(customOverlay);
    }

    // 초기 검색 실행
    searchPlaces();

    // 컴포넌트 언마운트 시 마커 제거
    return () => {
      removeMarkers();
    };

  }, [categories]);

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
        <CategoryButton 
          onClick={() => onClickCategory('FD6')} 
          active={categories.includes('FD6')}
        >
          음식점
        </CategoryButton>
        <CategoryButton 
          onClick={() => onClickCategory('CE7')} 
          active={categories.includes('CE7')}
        >
          카페
        </CategoryButton>
      </CategoryWrapper>
      <div id="map" style={{width: "100%", height:"100%"}}></div>
    </Container>
  );
}

export default Map;
