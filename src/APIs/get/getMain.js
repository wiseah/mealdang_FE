import axiosInstance from "../axiosInstance";

export default async function getMain() {
  try {
    const response = await axiosInstance.get(`/api/accounts/home/`
    );

    return response.data;
  } catch (error) {
    console.error("getMain 에러 발생: ", error);
    throw error; // 오류를 호출자에게 전달
  }
}