import axiosInstance from "./axios";
const apiCheckout = {
    //nhập dữ liệu vào bảng order
    payCheckoutOrder: (data) =>{
        return axiosInstance.post("/orders", data);
    },    
}
export default apiCheckout;