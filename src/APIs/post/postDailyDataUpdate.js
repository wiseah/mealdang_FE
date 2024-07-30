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
