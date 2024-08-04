import axiosInstance from "../axiosInstance";  

export default async function postDailyDataUpdate(date, fasting_blood_sugar, post_meal_blood_sugar, morning, noon, evening) {
  try {
    const response = await axiosInstance.patch(
      `/api/bloodsugars/save/`,
      {
        date: date,
        fasting_blood_sugar: {
          morning: morning,
          noon: noon,
          evening: evening
        },
        post_meal_blood_sugar: {
          morning: morning,
          noon: noon,
          evening: evening
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Data saving failed:', error);
    throw error; // Errors are re-thrown to be handled by the calling code
  }
}
