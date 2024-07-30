import axiosInstance from "../axiosInstance";

export default async function patchMyInfo (nickname, gender, age, height, weight, is_diabetes){
    try {
        const response = await axiosInstance.patch(
            `/api/accounts/mypage/myinfo/edit/`,
            {
              nickname: nickname,
              gender: gender,
              age: parseInt(age, 10), // 숫자로 변환
              height: parseInt(height, 10), // 숫자로 변환
              weight: parseInt(weight, 10), // 숫자로 변환
              is_diabetes: is_diabetes
            }
        );
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
      console.error("에러 발생: ", error);
      throw error; // 오류를 호출자에게 전달
    }
}
