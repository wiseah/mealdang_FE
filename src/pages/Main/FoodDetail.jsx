import styled from "styled-components";
import { useRef,useState,useEffect } from "react";
import { BsImages } from "react-icons/bs";
import { TotalFoodToggle } from "../../components/TotalFoodToggle";
import { FoodToggle } from "../../components/FoodToggle";
import { useNavigate } from "react-router-dom";

// 전체 공간
const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;

`

// 소개글
const Introduce = styled.span`
width: 264px;
height: 70px;
color: #3F006C;
text-align: center;
font-family: "Wavve PADO TTF";
font-size: 30px;
font-weight: 400;
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

export function FoodDetail(){
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
            <Introduce>추천 식단 만들어먹고 인증까지 해보세요!</Introduce>
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
};
