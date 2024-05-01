import axiosInstance from "./axios";
const apiOrder = {
    //lấy tất cả đơn hàng
    getAll: () =>{
        return axiosInstance.get("/orders").then((res)=>res.data);
    },
}
export default apiOrder;