import React, { useEffect } from 'react';
import styled from 'styled-components';
const { kakao } = window;

const Container = styled.div`
  width: 390px;
  height: 628px;
`

function Map() {

  useEffect(()=> {
    // const kakao = window.kakao;
    let mapContainer = document.getElementById('map') // 지도를 표시할 div

    // 지도의 옵션 설정
    let mapOption = {
      center: new kakao.maps.LatLng(37.57224, 127.01442), // 지도의 중심좌표
      level: 2, // 지도의 확대 레벨
      mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
    }; 

    // 지도를 생성한다 
    var map = new kakao.maps.Map(mapContainer, mapOption); 

    // 지도에 마커를 생성하고 표시한다
    var marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(37.56682, 126.97865), // 마커의 좌표
    map: map // 마커를 표시할 지도 객체
    });

    // 마커 위에 표시할 인포윈도우를 생성한다
    var infowindow = new kakao.maps.InfoWindow({
    content : '<div style="padding:5px;">인포윈도우 :D</div>' // 인포윈도우에 표시할 내용
    });

    // 인포윈도우를 지도에 표시한다
    infowindow.open(map, marker);


  }, [])

  return (
    <Container>
      <div id="map" style={{width: "100%", height:"100%", position: "sticky"}}></div>
    </Container>
  )
}

export default Map