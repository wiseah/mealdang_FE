import axiosInstance from "../axiosInstance";

export default async function getFoodDetail() {
  try {
    const response = await axiosInstance.get(`/api/diets/detail/{diet_id}/`
    );

    return response.data;
  } catch (error) {
    console.error("에러 발생: ", error);
    throw error; // 오류를 호출자에게 전달
  }
}