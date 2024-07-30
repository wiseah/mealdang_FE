import axiosInstance from "../axiosInstance";  

export default async function postFoodRecommend(diet_combination, breakfast, lunch, dinner, ingredient1, ingredient2, ingredient3) {
  try {
    const response = await axiosInstance.post(
      `/api/diets/recommend/`,
      {
        diet_combination: diet_combination,
        breakfast: breakfast,
        lunch: lunch,
        dinner: dinner,
        ingredient1: ingredient1,
        ingredient2: ingredient2,
        ingredient3: ingredient3
      }
    );
    return response.data;
  } catch (error) {
    console.error('에러 발생: ', error);
    throw error;
  }
}
