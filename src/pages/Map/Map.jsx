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
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.25);
`;

// 카테고리 버튼 래퍼 스타일
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
`

// 카테고리 버튼 스타일
const CategoryButton = styled.div`
  color: ${props => props.active ? 'white' : 'black'};
`;

//버튼의 아이콘
const CategoryImg = styled.img`
    width: 46px;
    height: 46px;
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
  position: relative;
  background: white;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0px 1px 2px #888;
  width: 260px;
  margin-bottom: 12px;

  &:after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 11px 8px 0;
    border-color: white transparent;
    display: block;
    width: 0;
    z-index: 1;
    bottom: -11px;
    left: 50%;
    margin-left: -8px;
  }

  &:before {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 12px 9px 0;
    border-color: #ccc transparent;
    display: block;
    width: 0;
    z-index: 0;
    bottom: -12px;
    left: 50%;
    margin-left: -9px;
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
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px 5px 0 0;

  &:after {
    content: '>';
    font-size: 16px;
  }
`;

const PlaceContent = styled.div`
  padding: 10px 15px;
`;

const PlaceAddress1 = styled.span`
  display: block;
  margin-top: 6px;
  font-size: 13px;
  color: #000;
`;

const PlaceAddress = styled.span`
  display: block;
  margin-top: 6px;
  font-size: 11px;
  color: #8a8a8a;
`;

const PlacePhone = styled.span`
  display: block;
  margin-top: 6px;
  font-size: 11px;
  color: #009900;
`;

function Map() {
  const [map, setMap] = useState(null);
  const [placeOverlay, setPlaceOverlay] = useState(null);
  const [categories, setCategories] = useState(['FD6', 'CE7']);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(37.57224, 127.01442),
      level: 3
    };

    const newMap = new kakao.maps.Map(mapContainer, mapOption);
    setMap(newMap);

    const ps = new kakao.maps.services.Places(newMap);
    const customOverlay = new kakao.maps.CustomOverlay({
      zIndex: 1,
      yAnchor: 1.1
    });
    setPlaceOverlay(customOverlay);

    kakao.maps.event.addListener(newMap, 'idle', searchPlaces);

    function searchPlaces() {
      if (categories.length === 0) {
        return;
      }

      customOverlay.setMap(null);
      removeMarkers();

      categories.forEach(category => {
        ps.categorySearch(category, placesSearchCB, { useMapBounds: true });
      });
    }

    function placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        displayPlaces(data);
      } else {
        console.error("검색 중 오류가 발생했습니다.");
      }
    }

    function displayPlaces(places) {
      const newMarkers = places.map(place => {
        const marker = addMarker(new kakao.maps.LatLng(place.y, place.x), place);
        return marker;
      });
      setMarkers(prevMarkers => [...prevMarkers, ...newMarkers]);
    }

    function addMarker(position, place) {
      const MarkerComponent = place.category_group_code === 'FD6' ? RestaurantMarker : CafeMarker;

      const markerContent = document.createElement('div');
      ReactDOM.render(
        <MarkerComponent onClick={() => displayPlaceInfo(place, position)} />,
        markerContent
      );

      const marker = new kakao.maps.CustomOverlay({
        position: position,
        content: markerContent
      });

      marker.setMap(newMap);
      return marker;
    }

    function removeMarkers() {
      markers.forEach(marker => marker.setMap(null));
      setMarkers([]);
    }

    function displayPlaceInfo(place, position) {
      const content = (
        <PlaceInfoWrapper>
          <PlaceTitle href={place.place_url} target="_blank" title={place.place_name}>
            {place.place_name}
          </PlaceTitle>
          <PlaceContent>
            {place.road_address_name && (
              <>
                <PlaceAddress1>{place.road_address_name}</PlaceAddress1>
                <PlaceAddress>(지번 : {place.address_name})</PlaceAddress>
              </>
            )}
            {!place.road_address_name && <PlaceAddress1>{place.address_name}</PlaceAddress1>}
            <PlacePhone>{place.phone}</PlacePhone>
          </PlaceContent>
        </PlaceInfoWrapper>
      );
      
      const contentElement = document.createElement('div');
      ReactDOM.render(content, contentElement);

      customOverlay.setContent(contentElement);
      customOverlay.setPosition(position);
      customOverlay.setMap(newMap);
    }

    searchPlaces();

    return () => {
      removeMarkers();
    };

  }, [categories]);

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