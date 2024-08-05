import axiosInstance from "../axiosInstance";  


export default async function postFoodRecommend(requestData) {
  try {
    const response = await axiosInstance.post('/api/diets/recommend/', requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // 서버에서 응답이 있는 경우
      console.error('API error:', error.response.data);
    } else if (error.request) {
      // 요청은 되었지만 응답이 없는 경우
      console.error('No response received:', error.request);
    } else {
      // 설정 오류 등 다른 오류
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
}

