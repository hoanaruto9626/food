import axiosInstance from "./axios";
const apiBrand = {
    //lấy tất cả thương hiệu
    getAll: () =>{
        return axiosInstance.get("/brands").then((res)=>res.data);
    },
    //thêm nhà cung cấp
    createBrand: (brand)=>{
        return axiosInstance.post("/brands", brand).then((res)=>res.data);
    },
    //api lấy 1 nhà cung cấp
    getBrandById: (id) => {
        return axiosInstance.get(`/brands/${id}`);
    },
    //api sửa nhà cung cấp
    editBrand: (id, brand) => {
        return axiosInstance.put(`/brands/${id}`, brand);
    },
    //api xóa nhà cung cấp
    delBrandById: (id) => {
        return axiosInstance.delete(`/brands/${id}`)
    }
}
export default apiBrand;