import axiosInstance from "../axiosInstance";

export default async function patchDiethonHeart (diet_id, is_heart){
    try {
        const response = await axiosInstance.patch(
            `/api/diets/heart/${diet_id}/`,
            {
              is_heart: is_heart
            }
        );
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
      console.error("에러 발생: ", error);
      throw error; // 오류를 호출자에게 전달
    }
}
