import styled from "styled-components";
import  TotalFoodToggle  from "../../components/TotalFoodToggle";
import  FoodToggle  from "../../components/FoodToggle";
import { AiTwotoneHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import { useState,useRef,useEffect } from "react";


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

    const ClickLike = () =>{
        SetLike(!Like);
    }

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

     

    const handleFileChange = event => {
        setFile(event.target.files[0]);
      };

    const triggerFileInput = () => {
        fileInputRef.current.click();
      };


    return(
        <Container>
            <DietContainer>
                칼로리 모험가의 식탁
                <LikeIcon onClick={ClickLike}>
                    {Like ? <AiFillHeart /> : <AiTwotoneHeart />}
                </LikeIcon> 
            </DietContainer>
            <TotalFoodToggle/>
            <FoodToggle/>
            <PictureContainer onClick={triggerFileInput}>
                {uploadImage &&(<UploadedImage src = {uploadImage} alt="Uploaded"/>
            )}
                <PictureIcon/>
                <PictureText>식단 인증 사진 업로드 하기 </PictureText>
            </PictureContainer>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
        </Container>
    )

}