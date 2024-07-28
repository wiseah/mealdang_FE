import axiosInstance from "../axiosInstance";  
  
export default async function postAccessToken(refresh){
  try {
      const response = await axiosInstance.post(
          `/api/accounts/refresh/`,
          {
            "refresh": refresh
          }
      )
      return response.data;
  } catch (error) {
    console.error('액세스 토큰 재발급 요청 실패:', error);
    throw error; // 오류 처리를 호출자에게 전달하기 위해 throw 사용
  }
}