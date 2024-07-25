import axiosInstance from "../axiosInstance";

export default async function login(id, password){
    try {
        const response = await axiosInstance.post(
            `/api/accounts/login/`,
            {
                id: id,
                password: password
            }
        )
        return response.data;
    } catch {
        throw Error()
    }
}