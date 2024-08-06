import axiosInstance from "../axiosInstance";

export default async function patchDetailPhoto(diet_id, key, file) {
    try {
        const formData = new FormData(); // FormData 객체 생성
        formData.append('key', key); // key 추가
        formData.append('value', file); // file 추가

        const response = await axiosInstance.patch(
            `/api/diets/detail/photo/${diet_id}/`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // multipart/form-data 헤더 설정
                },
            }
        );

        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error("에러 발생: ", error);
        throw error; // 오류를 호출자에게 전달
    }
}
