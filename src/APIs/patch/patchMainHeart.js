import axiosInstance from "../axiosInstance";

export default async function patchMainHeart (is_like){
    try {
        const response = await axiosInstance.patch(
            `/api/diets/like/{diet_set_id}/`,
            {
              is_liket: is_like
            }
        );
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
      console.error("에러 발생: ", error);
      throw error;
    }
}
