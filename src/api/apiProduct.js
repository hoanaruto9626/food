import axiosInstance from "./axios";

const apiProduct={
    //lay tat ca san pham
    getAll:()=>{
        return axiosInstance.get("/products?populate=*").then((res)=>res.data);
    },
    //lay 5 san pham moi nhat
    getNewest:()=>{
        return axiosInstance.get("products?sort[0]=createdAt:desc&pagination[limit]=4&populate=*").then((res)=>res.data);
    },
    //lấy 6 sản phẩm khuyến mãi
    getPromotion:()=>{
        return axiosInstance.get("products?filters[is_on_sale][$eq]=true&pagination[limit]=6&populate=*").then((res)=>res.data);
    },
    //chi tiết sản phẩm
    getDetailProductBySlug:(slug)=>{
        return axiosInstance.get(`/products?filters[slug][$eq]=${slug}&populate=*`).then((res)=>res.data);
    },
    //lấy sản phẩm theo danh mục
    getProductByCatSlug:(slug)=>{
        return axiosInstance.get(`/products?filters[category][slug][$eq]=${slug}&populate=*`).then((res)=>res.data);
    },
    //lấy sản phẩm phân trang
    getProductPagination: (page, limit) => {
        return axiosInstance.get(`/products?pagination[page]=${page}&pagination[pageSize]=${limit}&populate=*`).then((res)=>res.data)
    },
    //thêm sản phẩm
    createProduct: (data) => {
        return axiosInstance.post("/products", data)
    },
    //sửa sản phẩm
    editProduct: (id, data) => {
        return axiosInstance.put(`/products/${id}`, data);
    },
    //api xóa sản phẩm
    delProductById: (id) => {
        return axiosInstance.delete(`/products/${id}`);
    },
    //lấy sản phẩm theo thương hiệu
    getProductByCatId:(id)=>{
        return axiosInstance.get(`products?filters[brand_id][$eq]=${id}&populate=*`).then((res)=>res.data);
    }
}
export default apiProduct;