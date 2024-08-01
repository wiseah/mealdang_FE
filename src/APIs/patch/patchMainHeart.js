import axiosInstance from "../axiosInstance";

export default async function patchMainHeart (diet_set_id, is_like){
    try {
        const response = await axiosInstance.patch(
            `/api/diets/like/${diet_set_id}/`,
            {
              is_like
            }
        );
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
      console.error("patchMainHeart 에러 발생: ", error);
      throw error;
    }
}
