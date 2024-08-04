import styled from "styled-components";
import  TotalFoodToggle  from "../../components/TotalFoodToggle";
import  FoodToggle  from "../../components/FoodToggle";
import { AiTwotoneHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import { useState,useRef,useEffect } from "react";
import getFoodDetail from "../../APIs/get/getFoodDetail";
import patchDiethonHeart from "../../APIs/patch/patchDiethonHeart";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const DietContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6A0DAD;
    text-align: center;
    font-family: "Wavve PADO TTF";
    font-size: 30px;
    font-weight: 400;
`

const LikeIcon = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 15px;
`

// 사진 업로드
const PictureContainer = styled.div`
    width: 300px;
    height: 174px;
    border-radius: 15px;
    border: 1px solid #F74A25;
    background: #FFF;
    margin-top:39px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`
const PictureIcon = styled(BsImages)`
    width: 60px;
    height: 60px;
    color: #F74A25;
    cursor: pointer;
`
const PictureText = styled.div`
    width: 140px;
    height: 44px;
    color: #F74A25;
    text-align: center;
    font-family: "Wavve PADO TTF";
    font-size: 20px;
    font-weight: 400;
    cursor: pointer;
`

const UploadedImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 15px;
    position: absolute; 
    top: 0;
    left: 0;
`;
export default function DiethonDetail(){

    const [Like,SetLike] = useState(false);

    const [uploadImage, setUploadImage] = useState();
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    
    useEffect(() => {
        const image = localStorage.getItem("image");
        if(image){
            setUploadImage(image);
        }
      }, []);
    
      useEffect(() => {
        if (file) {
          const url = URL.createObjectURL(file);
          setUploadImage(url);
          localStorage.setItem('image', url);
        }
      }, [file])

    const [Data, setData] = useState({
    "nickname": " ",
    "date": " ",
    "meal_time": " ", 
    "meal_type": " ", 
    "is_my_recipe": true,
    "calorie": 0,
    "heart": 0,
    "main": {
    "food_name": "메인",
    "nutrients": {
        "grain": 0,
        "fish_meat_low_fat": 0,
        "fish_meat_medium_fat": 0,
        "vegetable": 0,
        "fat": 0,
        "dairy": 0,
        "fruit": 0
    },
    "calories":0,
    "recipe": ""
},
    "side1" :{
    "food_name": "반찬1",
    "nutrients": {
        "grain": 0,
        "fish_meat_low_fat": 0,
        "fish_meat_medium_fat": 0,
        "vegetable": 0,
        "fat": 0,
        "dairy": 0,
        "fruit": 0
    },
    "recipe": ""
},
    "side2" :{
    "food_name": "반찬2",
    "nutrients": {
        "grain": 0,
        "fish_meat_low_fat": 0,
        "fish_meat_medium_fat": 0,
        "vegetable": 0,
        "fat": 0,
        "dairy": 0,
        "fruit": 0
    },
    "recipe": ""
},
    "side3" :{
    "food_name": "반찬3",
    "nutrients": {
        "grain": 0,
        "fish_meat_low_fat": 0,
        "fish_meat_medium_fat": 0,
        "vegetable": 0,
        "fat": 0,
        "dairy": 0,
        "fruit": 0
    },
    "recipe": ""
},
"image": "",

    }); 

    const handleFileChange = event => {
        setFile(event.target.files[0]);
      };

    const triggerFileInput = () => {
        fileInputRef.current.click();
      };

    useEffect(() => {
    const fetchFoodDetailData = async () => {
        try {
        const response = await getFoodDetail();
        setData(response);
        console.log(Data);
        } catch (error) {
        console.error('message:', error.message);
        alert('매칭되는 식단 상세보기 정보를 찾지 못했습니다.');
        }
    };

    fetchFoodDetailData();
    }, []);

    const ClickLike = async () => {
        try {
            const newHeartStatus = !Like; 
            await patchDiethonHeart(newHeartStatus); 
            SetLike(newHeartStatus); 
        } catch (error) {
            console.error("에러 발생:", error);
        }
    };

    return(
        <Container>
            <DietContainer>
                칼로리 모험가의 식탁
                <LikeIcon onClick={ClickLike}>
                    {Like ? <AiFillHeart /> : <AiTwotoneHeart />}
                </LikeIcon> 
            </DietContainer>
            <TotalFoodToggle
                calorie = {Data.calorie}
                main = {Data.main}
            />
           <FoodToggle
                main = {Data.main}
                side1 = {Data.side1}
                side2 = {Data.side2}
                side3 = {Data.side3}
            />
            <PictureContainer onClick={triggerFileInput}>
                {uploadImage ? (
                    <UploadedImage src={uploadImage} alt="Uploaded" />
                ) : (
                    <UploadedImage src={Data.image} alt="Default" />
                )}
                <PictureIcon/>
                <PictureText>식단 인증 사진 업로드 하기 </PictureText>
            </PictureContainer>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
        </Container>
    )

}