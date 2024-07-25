import axiosInstance from "../axiosInstance";

export default async function getUserInfo(){
    try {
        const response = await axiosInstance.get(
            `/users`,
        )
        return response.data;
    } catch{
        console.log('오류 발생')
    }
}