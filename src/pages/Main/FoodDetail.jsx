import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import { BsImages } from "react-icons/bs";
import TotalFoodToggle from "../../components/TotalFoodToggle";
import FoodToggle from "../../components/FoodToggle";
import getFoodDetail from "../../APIs/get/getFoodDetail";
import patchDetailPhoto from "../../APIs/patch/patchDetailPhoto";
import { useParams } from 'react-router-dom';

// 전체 공간
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// 소개글
const Introduce = styled.span`
    width: 264px;
    height: 70px;
    color: #3F006C;
    text-align: center;
    font-family: 'Do Hyeon', sans-serif;
    font-size: 27px;
    font-weight: 400;
`;

// 사진 업로드
const PictureContainer = styled.div`
    width: 300px;
    height: 174px;
    border-radius: 15px;
    border: 1px solid #F74A25;
    background: #FFF;
    margin-top: 39px;
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
    font-family: 'Do Hyeon', sans-serif;
    font-size: 23px;
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

export default function FoodDetail() {
    const [uploadImage, setUploadImage] = useState();
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [isCertified, setIsCertified] = useState(false);
    const { diet_id } = useParams(); // diet_id를 useParams로 가져옵니다

    // 식단 상세 정보 초기 데이터
    const [Data, setData] = useState({
        nickname: " ",
        date: " ",
        meal_time: " ", 
        meal_type: " ", 
        is_my_recipe: true,
        calorie: 0,
        heart: 0,
        main: {
            food_name: "메인",
            nutrients: {
                grain: 0,
                fish_meat_low_fat: 0,
                fish_meat_medium_fat: 0,
                vegetable: 0,
                fat: 0,
                dairy: 0,
                fruit: 0
            },
            calories: 0,
            recipe: ""
        },
        side1: {
            food_name: "반찬1",
            nutrients: {
                grain: 0,
                fish_meat_low_fat: 0,
                fish_meat_medium_fat: 0,
                vegetable: 0,
                fat: 0,
                dairy: 0,
                fruit: 0
            },
            recipe: ""
        },
        side2: {
            food_name: "반찬2",
            nutrients: {
                grain: 0,
                fish_meat_low_fat: 0,
                fish_meat_medium_fat: 0,
                vegetable: 0,
                fat: 0,
                dairy: 0,
                fruit: 0
            },
            recipe: ""
        },
        side3: {
            food_name: "반찬3",
            nutrients: {
                grain: 0,
                fish_meat_low_fat: 0,
                fish_meat_medium_fat: 0,
                vegetable: 0,
                fat: 0,
                dairy: 0,
                fruit: 0
            },
            recipe: ""
        },
        image: "",
    });

    useEffect(() => {
        // diet_id가 정의되었는지 확인
        console.log("diet_id:", diet_id);

        const fetchFoodDetailData = async () => {
            try {
                const response = await getFoodDetail(diet_id);
                setData(response);
                console.log("Data fetched:", response);
            } catch (error) {
                console.error('message:', error.message);
                alert('매칭되는 식단 상세보기 정보를 찾지 못했습니다.');
            }
        };

        if (diet_id) {
            fetchFoodDetailData();
        }
    }, [diet_id]); // diet_id가 변경될 때마다 데이터를 다시 가져옵니다

    // 파일 처리 함수들
    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            try {
                await patchDetailPhoto(diet_id, 'image', selectedFile); // 이미지 업로드
                alert('이미지가 성공적으로 업로드되었습니다.');
            } catch (error) {
                console.error("이미지 업로드 에러: ", error);
                alert('이미지 업로드에 실패했습니다.');
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadImage(reader.result);
                localStorage.setItem('image', reader.result); // Base64 이미지 저장
                setIsCertified(true);
            };
            reader.readAsDataURL(file); // 파일을 Base64로 변환
        }
    }, [file]);

    useEffect(() => {
        const image = localStorage.getItem("image");
        if (image) {
            setUploadImage(image);
            setIsCertified(true);
        }
    }, []);

    return (
        <Container>
            <Introduce>추천 식단 만들어먹고 인증까지 해보세요!</Introduce>
            <TotalFoodToggle
                calorie={Data.total_calorie}
                data={Data}
            />
            <FoodToggle
                main={Data.main}
                side1={Data.side1}
                side2={Data.side2}
                side3={Data.side3}
            />
            <PictureContainer onClick={triggerFileInput}>
                {uploadImage ? (
                    <UploadedImage src={uploadImage} alt="Uploaded" />
                ) : (
                    <UploadedImage src={Data.image} alt="Default" />
                )}
                <PictureIcon />
                <PictureText>식단 인증 사진 업로드 하기 </PictureText>
            </PictureContainer>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
        </Container>
    );
}
