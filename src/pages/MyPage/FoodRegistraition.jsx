import styled from "styled-components"
import { BsCaretDownFill } from "react-icons/bs";
import { BsCaretUpFill } from "react-icons/bs";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineMinusSquare } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import { useState,useRef, useEffect } from "react";
import DietToggle from "../../components/DietToggle";


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
    font-family: "Wavve PADO TTF";
    font-size: 30px;
    font-weight: 400;
    display: flex;
    align-items: flex-start;
    padding-left: 70px;
    padding-bottom: 16px;
`
const DietContainer = styled.input`
    width: 312px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid #FF6A4A;
    color: #FF6A4A;
    font-family: "Wavve PADO TTF";
    font-size: 17px;
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
const FoodHeader= styled.div`
    width: 300px;
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
    font-family: "Wavve PADO TTF";
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
const AddFoodHeader= styled.div`
    width: 300px;
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
    cursor: pointer;
`
// 사진 업로드
const PictureContainer = styled.div`
    width: 300px;
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

const ConfirmButton = styled.button`
    width: 350px;
    height: 56px;
    border: none;
    border-radius: 10px;
    box-shadow: 0px 4px 4px #B7B7B7;
    box-sizing: border-box;
    font-size: 30px;
    font-weight: 400;
    font-family: 'Wavve PADO TTF';
    margin-top: 20px;
    cursor: pointer;
    background: #FF6A4A;
    color: #FFF;
`

export default function FoodRegistration(){

    const [MainToggled, setMainToggled] = useState(false);
    const [SubToggled,setSubToggled] = useState(false);
    const [SideToggled,setSideToggled] = useState(false);
    const [AddOneToggle, setAddOneToggle] = useState(false);
    const [AddTwoToggle, setAddTwoToggle] = useState(false);
    const [additionToggleStates, setAdditionToggleStates] = useState({
        additionOne: false,
        additionTwo: false,
    });

    const handleMainToggle = () => {
        setMainToggled(prevState => !prevState);
    }
    const handleSubToggle = () => {
        setSubToggled(prevState => !prevState);
    }
    const handleSideToggle = () => {
        setSideToggled(prevState => !prevState);
    }
    const handleAdditionToggle = (key) => {
        setAdditionToggleStates(prevState => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    const AdditionFoodOne = () => {
        return (
            <>
                <FoodHeader>
                    <FoodTitle>반찬 3</FoodTitle>
                    <PlusIcon onClick={() => setAddOneToggle(true)} />
                    <MinusIcon onClick={() => setAddOneToggle(false)} />
                    <FoodIcon onClick={() => handleAdditionToggle('additionOne')}>
                        {additionToggleStates.additionOne ? <BsCaretUpFill /> : <BsCaretDownFill />}
                    </FoodIcon>
                </FoodHeader>
                {additionToggleStates.additionOne && <DietToggle />}
            </>
        );
    };
    
    
    const AdditionFoodTwo = () => {
        return (
            <>
                <FoodHeader>
                    <FoodTitle>반찬 4</FoodTitle>
                    <PlusIcon onClick={() => setAddTwoToggle(true)} />
                    <MinusIcon onClick={() => setAddTwoToggle(false)} />
                    <FoodIcon onClick={() => handleAdditionToggle('additionTwo')}>
                        {additionToggleStates.additionTwo ? <BsCaretUpFill /> : <BsCaretDownFill />}
                    </FoodIcon>
                </FoodHeader>
                {additionToggleStates.additionTwo && <DietToggle />}
            </>
        );
    };

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
            <DietTitle>식단명</DietTitle>
            <DietContainer placeholder= '식단톤에 제출할 식단명을 입력해주세요.'/>
            <FoodHeader>
                <FoodTitle>메인</FoodTitle>
                <FoodIcon onClick={handleMainToggle}>{MainToggled?
                <BsCaretUpFill/> : <BsCaretDownFill/>}</FoodIcon>
            </FoodHeader>
            {MainToggled&&(<DietToggle/>)}
            <FoodHeader>
                <FoodTitle>반찬1</FoodTitle>
                <FoodIcon onClick={handleSubToggle}>{SubToggled?
                <BsCaretUpFill/> : <BsCaretDownFill/>}</FoodIcon>
            </FoodHeader>
            {SubToggled&&(<DietToggle/>)}
            <FoodHeader>
                <FoodTitle>반찬2</FoodTitle>
                <FoodIcon onClick={handleSideToggle}>{SideToggled?
                <BsCaretUpFill/> : <BsCaretDownFill/>}</FoodIcon>
            </FoodHeader>
            {SideToggled&&(<DietToggle/>)}
            {!AddOneToggle && <AddFoodHeader>
                <FoodTitle>반찬 3</FoodTitle>
                <PlusIcon onClick={() => setAddOneToggle(true)}/>
                <MinusIcon onClick={() => setAddOneToggle(false)}/>
            </AddFoodHeader>}
            {AddOneToggle && (<AdditionFoodOne/>)}
            {AddOneToggle && !AddTwoToggle && (<AddFoodHeader>
                <FoodTitle>반찬 4</FoodTitle>
                <PlusIcon onClick={() => setAddTwoToggle(true)}/>
                <MinusIcon onClick={() => setAddTwoToggle(false)}/>
            </AddFoodHeader>)}    
            {AddTwoToggle && (<AdditionFoodTwo/>)}
            <PictureContainer onClick={triggerFileInput}>
                {uploadImage &&(<UploadedImage src = {uploadImage} alt="Uploaded"/>
            )}
                <PictureIcon/>
                <PictureText>식단 인증 사진 업로드 하기 </PictureText>
            </PictureContainer>
            <ConfirmButton>수정하기</ConfirmButton>
        </Container>
    )

    
}