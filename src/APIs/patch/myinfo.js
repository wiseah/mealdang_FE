import axiosInstance from "../axiosInstance";

export default async function myinfo (nickname,gender, age, height, weight, is_diabetes ){
    try {
        const response = await axiosInstance.patch(
            '/api/accounts/mypage/myinfo/edit/',
            {
            nickname: nickname,
              gender: gender,
              age: parseInt(age, 10), // 숫자로 변환
              height: parseInt(height, 10), // 숫자로 변환
              weight: parseInt(weight, 10), // 숫자로 변환
              is_diabetes: is_diabetes, // true or false
              
            }
        );
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw new Error('정보 수정에 실패했습니다.');
    }
}
