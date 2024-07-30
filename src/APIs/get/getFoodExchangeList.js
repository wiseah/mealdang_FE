import axiosInstance from "../axiosInstance";

export default async function getFoodExchangeList() {
  try {
    const response = await axiosInstance.get(`/api/accounts/food-exchange-list/`
    );

    return response.data;
  } catch (error) {
    console.error("식품교환표 매칭 실패:", error);
    throw error; // 오류를 호출자에게 전달
  }
}