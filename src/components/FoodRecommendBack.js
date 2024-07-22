import styled from "styled-components"
import { FoodRecommend } from "./FoodRecommend"
import { BsSun } from "react-icons/bs";
import { BsSunFill } from "react-icons/bs";
import { FaIceCream } from "react-icons/fa";
import { BiSolidMoon } from "react-icons/bi";


/**
 * 생각해볼 것
 * 
 * 아이스크림 아이콘, 저녁 식사 아이콘은 Fill되어있는 아이콘밖에 없음 
 * FoodRecommend에 식단 인증시에 전체를 감싸고 있는 <FoodContainer>에 배경색 변경, 글씨색 변경 함수를 작성해놓은 상태인데 아이콘 어떻게 사용해야 할지 고민 필요 
 * 지금 사용중인 BsSun도 색상을 채우려면 사실상 다른 함수를 적용해야 함 
 */

export function FoodRecommendBack(){

    const FoodContainer = styled.div`
    width: 350px;
    height: 326px;
    flex-shrink: 0;
    margin: 0px 20px 14px 20px;
    border-radius: 15px;
    background-color: #FFE3C4;
    display: flex; 
    justify-content: flex-start; 
    align-items: center; 
    overflow-x: auto;
    padding-left: 13px;
  `

  const FoodList = styled.div`
    display:flex;
    flex-direction: row;
    gap:10px;
  `

  return(
    <FoodContainer>
      <FoodList>
        <FoodRecommend
          title = '아침|한식'
          Icon = {<BsSun/>}
          Content = {'잡곡밥 1/2공기 \n 된장국 \n 김치 50g \n 참기름 무침 나물 50g'}
          Calories='총 600칼로리'
          />
          <FoodRecommend
          title = '점심|일식'
          Icon = {<BsSun/>}
          Content = {'생선 초밥 6개 \n 미소 된장국 \n 오이무침 1/2컵 \n 무절임 1/2컵'}
          Calories='총 600칼로리'
          />
          <FoodRecommend
          title = '간식'
          Icon = {<FaIceCream/>}
          Content = {'그릭요거트 1/2컵 \n 블루베리 1/2컵 \n 견과류 혼합 1/4컵 \n '}
          Calories='총 600칼로리'
          />
          
          <FoodRecommend
          title = '저녁|중식'
          Icon = {<BiSolidMoon/>}
          Content = {'채소 볶음밥 1/2 공기 \n 두부 마파두부 80g \n 청경채 볶음 1컵 \n 피망 볶음 1/2컵'}
          Calories='총 600칼로리'
          />
        </FoodList>
    </FoodContainer>
  )
}