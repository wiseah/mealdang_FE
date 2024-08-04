// import axiosInstance from "../axiosInstance";  


// export default async function postFoodRecommend(requestData) {
//   try {
//     const response = await axiosInstance.post('/api/diets/recommend/', requestData);
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       // 서버에서 응답이 있는 경우
//       console.error('API error:', error.response.data);
//     } else if (error.request) {
//       // 요청은 되었지만 응답이 없는 경우
//       console.error('No response received:', error.request);
//     } else {
//       // 설정 오류 등 다른 오류
//       console.error('Error setting up request:', error.message);
//     }
//     throw error;
//   }
// }


import axiosInstance from "../axiosInstance";  

export default async function postDailyDataUpdate(date, fasting_blood_sugar, post_meal_blood_sugar) {
  try {
    const response = await axiosInstance.post(
      `/api/bloodsugars/save/`,
      {
        date: date,
        fasting_blood_sugar: {
          morning: fasting_blood_sugar[0],
          noon: fasting_blood_sugar[1],
          evening: fasting_blood_sugar[2]
        },
        post_meal_blood_sugar: {
          morning: post_meal_blood_sugar[0],
          noon: post_meal_blood_sugar[1],
          evening: post_meal_blood_sugar[2]
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Data saving failed:', error);
    throw error; // Errors are re-thrown to be handled by the calling code
  }
}
