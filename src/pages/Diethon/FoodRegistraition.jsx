import styled from "styled-components"
import { BsCaretDownFill } from "react-icons/bs";
import { BsCaretUpFill } from "react-icons/bs";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineMinusSquare } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DietToggle from "../../components/Diethon/DietToggle";
import postFoodRegistration from "../../APIs/post/postFoodRegistration";

// 전체 공간 
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const DietTitle = styled.div`
    width: 100%;
    height: 34px;
    color: #FF6A4A;
    font-family: 'Do Hyeon', sans-serif;
    font-size: 30px;
    font-weight: 400;
    display: flex;
    align-items: flex-start;
    padding-left: 84px;
    padding-bottom: 16px;
`
const DietContainer = styled.input`
    width: 312px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid #FF6A4A;
    color: #FF6A4A;
    font-family: 'Do Hyeon', sans-serif;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
    &::placeholder {
        color: rgba(255, 106, 74, 0.50); 
        opacity: 1; 
    }
    &:focus {
        outline: none; 
        border: 1px solid #FF6A4A; 
        background: #FFF; 
        color:  #FF6A4A;
    }
`

// 음식 헤더 
const FoodHeader = styled.div`
    width: 312px;
    height: 57px;
    border-radius: 25px;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
    color: #FF6A4A;
    display: flex;
    align-items: center;
    margin-top: 19px;
    `

// 음식 제목 
const FoodTitle = styled.span`
font-family: 'Do Hyeon', sans-serif;
    font-size: 21px;
    font-weight: 400;
    padding-left: 15px; 
`
// 토글버튼
const FoodIcon = styled.div`
    width: 20px;
    height: 24px;
    margin:auto 14px auto auto;
    cursor: pointer;
`

// 음식 추가 
const AddFoodHeader = styled.div`
    width: 312px;
    height: 57px;
    color: #FF6A4A;
    display: flex;
    align-items: center;
    margin-top: 19px;
    `
const PlusIcon = styled(AiOutlinePlusSquare)`
    width: 22px;
    height: 22px;
    color: #FF6A4A;
    padding-left: 10px;
    padding-right: 5px;
    cursor: pointer;
`
const MinusIcon = styled(AiOutlineMinusSquare)`
    width: 22px;
    height: 22px;
    color: #FF6A4A;
    padding-left: 10px;
    cursor: pointer;
`
// 사진 업로드
const PictureContainer = styled.div`
    width: 312px;
    height: 174px;
    border-radius: 15px;
    border: 1px solid #F74A25;
    background: #FFF;
    margin-top:20px;
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

const ConfirmButton = styled.button`
    width: 312px;
    height: 56px;
    border: none;
    border-radius: 10px;
    box-shadow: 0px 4px 4px #B7B7B7;
    box-sizing: border-box;
    font-size: 33px;
    font-weight: 400;
    font-family: 'Do Hyeon', sans-serif;
    margin-top: 20px;
    cursor: pointer;
    background: #FF6A4A;
    color: #FFF;
`

export default function FoodRegistration() {
    const navigate = useNavigate();

    const [dietName, setDietName] = useState("");

    const [mainDish, setMainDish] = useState({ food_name: "", nutrients: {}, recipe: "" });
    const [side1, setSide1] = useState({ food_name: "", nutrients: {}, recipe: "" });
    const [side2, setSide2] = useState({ food_name: "", nutrients: {}, recipe: "" });
    const [side3, setSide3] = useState({ food_name: "", nutrients: {}, recipe: "" });
    const [side4, setSide4] = useState({ food_name: "", nutrients: {}, recipe: "" });

    const [mainToggled, setMainToggled] = useState(false);
    const [side1Toggled, setSide1Toggled] = useState(false);
    const [side2Toggled, setSide2Toggled] = useState(false);
    const [side3Toggled, setSide3Toggled] = useState(false);
    const [side4Toggled, setSide4Toggled] = useState(false);

    const [side3Added, setSide3Added] = useState(false);
    const [side4Added, setSide4Added] = useState(false);

    const [uploadImage, setUploadImage] = useState();
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const image = localStorage.getItem("image");
        if (image) {
            setUploadImage(image);
        }
    }, []);

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setUploadImage(url);
            localStorage.setItem('image', url);
        }
    }, [file]);

    const handleFileChange = event => {
        setFile(event.target.files[0]);
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async () => {
        const dietData = {
            main: mainDish,
            side1: side1,
            side2: side2,
        };

        if (side3Added) {
            dietData.side3 = side3;
        }

        if (side4Added) {
            dietData.side4 = side4;
        }

        try {
            const response = await postFoodRegistration(dietName, dietData, file);
            console.log('식단 등록 성공:', response);
            navigate('/diethon')
        } catch (error) {
            console.error('식단 등록 실패:', error);
            // 오류 처리
        }
    };



    return (
        <Container>
            <DietTitle>식단명</DietTitle>
            <DietContainer
                placeholder='식단톤에 제출할 식단명을 입력해주세요.'
                value={dietName}
                onChange={(e) => setDietName(e.target.value)}
            />

            <FoodHeader>
                <FoodTitle>메인</FoodTitle>
                <FoodIcon onClick={() => setMainToggled(!mainToggled)}>
                    {mainToggled ? <BsCaretUpFill /> : <BsCaretDownFill />}
                </FoodIcon>
            </FoodHeader>
            {mainToggled && <DietToggle dish={mainDish} setDish={setMainDish} />}


            <FoodHeader>
                <FoodTitle>반찬1</FoodTitle>
                <FoodIcon onClick={() => setSide1Toggled(!side1Toggled)}>
                    {side1Toggled ? <BsCaretUpFill /> : <BsCaretDownFill />}
                </FoodIcon>
            </FoodHeader>
            {side1Toggled && <DietToggle dish={side1} setDish={setSide1} />}

            <FoodHeader>
                <FoodTitle>반찬2</FoodTitle>
                <FoodIcon onClick={() => setSide2Toggled(!side2Toggled)}>
                    {side2Toggled ? <BsCaretUpFill /> : <BsCaretDownFill />}
                </FoodIcon>
            </FoodHeader>
            {side2Toggled && <DietToggle dish={side2} setDish={setSide2} />}

            {!side3Added ? (
                <AddFoodHeader>
                    <FoodTitle>반찬 3</FoodTitle>
                    <PlusIcon onClick={() => setSide3Added(true)} />
                </AddFoodHeader>
            ) : (
                <>
                    <FoodHeader>
                        <FoodTitle>반찬 3</FoodTitle>
                        <MinusIcon onClick={() => {
                            setSide3Added(false);
                            setSide3Toggled(false);
                            setSide3({ food_name: "", nutrients: {}, recipe: "" });
                        }} />
                        <FoodIcon onClick={() => setSide3Toggled(!side3Toggled)}>
                            {side3Toggled ? <BsCaretUpFill /> : <BsCaretDownFill />}
                        </FoodIcon>
                    </FoodHeader>
                    {side3Toggled && <DietToggle dish={side3} setDish={setSide3} />}
                </>
            )}

            {side3Added && !side4Added ? (
                <AddFoodHeader>
                    <FoodTitle>반찬 4</FoodTitle>
                    <PlusIcon onClick={() => setSide4Added(true)} />
                </AddFoodHeader>
            ) : side4Added && (
                <>
                    <FoodHeader>
                        <FoodTitle>반찬 4</FoodTitle>
                        <MinusIcon onClick={() => {
                            setSide4Added(false);
                            setSide4Toggled(false);
                            setSide4({ food_name: "", nutrients: {}, recipe: "" });
                        }} />
                        <FoodIcon onClick={() => setSide4Toggled(!side4Toggled)}>
                            {side4Toggled ? <BsCaretUpFill /> : <BsCaretDownFill />}
                        </FoodIcon>
                    </FoodHeader>
                    {side4Toggled && <DietToggle dish={side4} setDish={setSide4} />}
                </>
            )}

            <PictureContainer onClick={triggerFileInput}>
                {uploadImage && <UploadedImage src={uploadImage} alt="Uploaded" />}
                <PictureIcon />
                <PictureText>식단 인증 사진 업로드 하기</PictureText>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </PictureContainer>
            <ConfirmButton onClick={handleSubmit}>식단 등록하기</ConfirmButton>
        </Container>
    )


}
