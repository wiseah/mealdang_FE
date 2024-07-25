import axiosInstance from "../axiosInstance";  
  
export default async function join(nickname){
  try {
      const response = await axiosInstance.post(
          `/api/accounts/nickname-check/`,
          {
              nickname: nickname,
          }
      )
      return response.data;
  } catch (error) {
    console.error('닉네임 중복 체크 요청 실패:', error);
    throw error; // 오류 처리를 호출자에게 전달하기 위해 throw 사용
  }
}

  // // 닉네임 중복 체크 
  // const handleNicknameCheck = async () => {
  //   try {
  //     const response = await fetch('/api/accounts/nickname-check/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ nickname }),
  //     });

  //     const data = await response.json();

  //     if (data.available) {
  //       setNicknameError('사용할 수 있는 닉네임입니다.');
  //     } else {
  //       setNicknameError('이 닉네임은 사용하실 수 없어요. 다른 닉네임을 입력해주세요.');
  //     }
  //   } catch (error) {
  //     console.error('Error checking nickname availability:', error);
  //   }
  // };