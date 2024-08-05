import axiosInstance from "../axiosInstance";  

export default async function postDailyDataUpdate(date, fastingBloodSugar, postMealBloodSugar) {
  try {
    const response = await axiosInstance.post(
      `/api/bloodsugars/save/`,
      {
        date: date,
        fasting_blood_sugar: {
          morning: fastingBloodSugar.morning,
          noon: fastingBloodSugar.noon,
          evening: fastingBloodSugar.evening
        },
        post_meal_blood_sugar: {
          morning: postMealBloodSugar.morning,
          noon: postMealBloodSugar.noon,
          evening: postMealBloodSugar.evening
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Data saving failed:', error);
    throw error; // Errors are re-thrown to be handled by the calling code
  }
}
