import axiosInstance from "../axiosInstance";

export default async function postFoodRegistration(dietName, dietData, image) {
  try {
    const formData = new FormData();
    formData.append('diet_name', dietName);
    formData.append('main', JSON.stringify(dietData.main));
    formData.append('side1', JSON.stringify(dietData.side1));
    formData.append('side2', JSON.stringify(dietData.side2));
    if (dietData.side3) {
      formData.append('side3', JSON.stringify(dietData.side3));
    }
    if (dietData.side4) {
      formData.append('side4', JSON.stringify(dietData.side4));
    }
    if (image) {
      formData.append('image', image);
    }

    const response = await axiosInstance.post(
      '/api/diets/mydiet/register/',
      formData
    );
    return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}