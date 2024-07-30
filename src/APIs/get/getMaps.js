import axiosInstance from "../axiosInstance";

export default async function getMaps(){
    try {
        const response = await axiosInstance.get(
            `/api/maps/`,
        )
        return response.data;
    } catch{
        console.log('오류 발생')
    }
}