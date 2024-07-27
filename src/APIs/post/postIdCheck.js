import axiosInstance from "../axiosInstance";  


export default async function postIdCheck(id){
  try {

      const response = await axiosInstance.post(
          `/api/accounts/id-check/`,
          {
              id: id,
          }
        );
      return response.data;
  } catch (error) {
    console.error('아이디 중복 체크 요청 실패:', error);
    throw error; // 오류 처리를 호출자에게 전달하기 위해 throw 사용
  }
}


// // 아이디 중복 체크
// const handleMember_idCheck = async () => {
//   try {
//     const response = await fetch('/api/accounts/id-check/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ member_id }),
//     });

//     const data = await response.json();

//     if (data.available) {
//       setMember_idError('사용할 수 있는 아이디입니다.');
//     } else {
//       setMember_idError('이 아이디는 사용하실 수 없어요. 다른 아이디를 입력해주세요.');
//     }
//   } catch (error) {
//     console.error('Error checking member ID availability:', error);
//   }
// };