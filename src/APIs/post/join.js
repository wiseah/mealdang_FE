import axiosInstance from "../axiosInstance";

export default async function join(nickname, id, password, email){
    try {
        const response = await axiosInstance.post(
            `/api/accounts/join/`,
            {
                nickname: nickname,
                id: id,
                password: password,
                email: email
            }
        )
        return response.data;
    } catch (error) {
      console.error("회원가입 요청 실패:", error);
      throw error; // 오류 처리를 호출자에게 전달하기 위해 throw 사용
    }
}