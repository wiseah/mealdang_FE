import axiosInstance from "../axiosInstance";  


export default async function postGrapeUse(podo_store_id){
  try {

      const response = await axiosInstance.post(
          `/api/podos/exchange/{podo_store_id}/`,
          {
            podo_store_id: podo_store_id
          }
        );
      return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error; // 오류 처리를 호출자에게 전달하기 위해 throw 사용
  }
}
