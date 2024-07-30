import axiosInstance from "../axiosInstance";

export default async function diagnosis (gender, age, height, weight, is_diabetes, fasting_blood_sugar, post_meal_blood_sugar){
    try {
        const response = await axiosInstance.patch(
            `/api/accounts/diagnosis/`,
            {
              gender: gender,
              age: parseInt(age, 10), // 숫자로 변환
              height: parseInt(height, 10), // 숫자로 변환
              weight: parseInt(weight, 10), // 숫자로 변환
              is_diabetes: is_diabetes === 'yes', // true or false
              fasting_blood_sugar: is_diabetes === 'yes' ? parseFloat(fasting_blood_sugar) : null,
              post_meal_blood_sugar: is_diabetes === 'yes' ? parseFloat(post_meal_blood_sugar) : null
            }
        );
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw new Error('진단테스트 저장에 실패했습니다.');
    }
}
