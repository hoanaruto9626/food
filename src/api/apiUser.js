import axiosInstance from "./axios"
const apiUser={
    //create user
    createUser:(data)=>{
        return axiosInstance.post("/auth/local/register", data);
    },
    //đăng nhập
    loginUser:(data)=>{
        return axiosInstance.post("/auth/local", data);
    },
    //lấy tất cả người dùng
    getAll:()=>{
        return axiosInstance.get("/users?populate=*").then((res)=>res.data);
    },
    getUserId:(id)=>{
        return axiosInstance.get(`/users/${id}`);
    }
}
export default apiUser;