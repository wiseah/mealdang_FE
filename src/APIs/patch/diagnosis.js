import axiosInstance from "../axiosInstance";

export default async function diagnosis (gender, age, height, weight, is_diabetes, fasting_blood_sugar, post_meal_blood_sugar){
    try {
        const response = await axiosInstance.patch(
            `/api/accounts/diagnosis/`,
            {
              gender: gender,
              age : age,
              height : height,
              weight : weight,
              is_diabetes: is_diabetes === 'yes', // true or false
        fasting_blood_sugar: is_diabetes === 'yes' ? fasting_blood_sugar : null,
        post_meal_blood_sugar: is_diabetes === 'yes' ? post_meal_blood_sugar : null
            }
        )
        return response.data;
    } catch {
        throw Error()
    }
}