import axiosInstance from "./axios";
const apiOrderDetail = {
    //nhập dữ liệu vào bảng order_detail
    payCheckoutOrder_detail: (orderDetail) =>{
        return axiosInstance.post("/order-details", orderDetail).then((res) => res.data);
    },
    //Lấy tất cả dữ liệu đặt hàng
    getAll: () =>{
        return axiosInstance.get("/order-details").then((res) => res.data);
    },
}
export default apiOrderDetail;