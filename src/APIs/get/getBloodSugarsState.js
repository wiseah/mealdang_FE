import axiosInstance from "../axiosInstance";

export default async function getBloodSugarsState(){
    try {
        const response = await axiosInstance.get(
            `/api/bloodsugars/state/`,
        )
        return response.data;
    }  catch (error) {
        console.error('에러 발생: ', error);
        throw error; // 호출자에게 오류를 전달
    }
}