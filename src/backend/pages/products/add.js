import React, { useState, useEffect } from "react";
import apiCategory from "../../../api/apiCategory";
import apiBrand from "../../../api/apiBrand";
import axiosInstance from "../../../api/axios";
import apiProduct from "../../../api/apiProduct";
import { useNavigate } from "react-router-dom";
function ProductAdd(){
    const [productName, setProductName] = useState('');
    const [slug, setSlug] = useState('');
    const [catId, setCatId] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [isOnSale, setIsOnSale] = useState(false);
    const [salePrice, setSalePrice] = useState(0);
    const [image, setImage] = useState(null);
    const [brandId, setBrandId] = useState('');

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        apiCategory.getAll().then(res => {
            try{
                const categoryData = res.data.map((item) => {
                    return {
                        id: item.id,
                        name: item.attributes.category_name,
                    }
                });
                setCategories(categoryData);
            }catch(e){
                console.log(e);
            }
        });
    },[]);

    useEffect(() => {
        apiBrand.getAll().then(res => {
            try{
                const brandData = res.data.map((item) => {
                    return {
                        id: item.id,
                        name: item.attributes.brand_name,
                    }
                });
                setBrands(brandData);
            }catch(e){
                console.log(e);
            }
        });
    },[]);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const productData = {
            product_name: productName, 
            slug: slug,
            cat_id: catId,
            price:price,
            description: description,
            is_on_sale: isOnSale,
            sale_price: salePrice,
            image: [],
            brand_id: brandId,
            category: catId
        };
        //console.log("Product Data: ",productData);
        let file = new FormData();
        file.append("files", image);

        axiosInstance.enableUploadFile();
        axiosInstance.post("/upload", file)
        .then(async(res)=>{
            const fileId = res.data[0].id;
            productData.image.push(fileId);
            console.log("Product Data:", productData);
            axiosInstance.enableJson();            
            const responseProduct = await apiProduct.createProduct({data: productData})
            console.log('Successful',responseProduct);
            navigate("/admin/products/1");
        })
        .catch((err)=>{
            console.log(err);
        })
    };
    return(
        <div className="product-edit-container" style={{width:'90%', margin:'auto', clear: 'both'}}>
            <h1>Thêm sản phẩm</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div class="mb-3 mt-3">
                            <label for="product_name">Tên sản phẩm</label>
                            <input type="text" className="form-control" id="product_name" placeholder="product_name" name="product_name" value={productName} onChange={(e)=>setProductName(e.target.value)}/>
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="slug">Slug</label>
                            <input type="text" className="form-control" id="slug" placeholder="slug" name="slug" value={slug} onChange={(e)=>setSlug(e.target.value)}/>
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="slug">Danh mục cha</label>
                            <select className="form-control" name="parent_id" value={catId} onChange={(e)=>setCatId(e.target.value)}>
                            {
                                categories.map((category, index) =>{
                                    return <option key={index} value={category.id}>{category.name}</option>
                                })
                            }
                            </select>
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="price">Đơn giá</label>
                            <input type="text" className="form-control" id="price" placeholder="price" name="price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="description">Mô tả sản phẩm</label>
                            <textarea className="form-control" rows="5" id="comment" placeholder="Mô tả sản phẩm" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-md-5 mt-5">
                        <div className="mb-3">
                            <label for="sale" className="form-label" style={{marginRight: '20px'}}>Giảm giá:</label>
                            <input type="checkbox" className="form-check-input" id="slug" name="is_on_sale" value={isOnSale} onChange={(e)=>setIsOnSale(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label for="sale_price" className="form-label">Giá khuyến mãi</label>
                            <input type="text" className="form-control"  placeholder="Nhập giá khuyến mãi" id="sale_price" name="sale_price" value={salePrice} onChange={(e)=>setSalePrice(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label for="image" className="form-label">Hình ảnh</label>
                            <input type="file" className="form-control" id="image" name="image" onChange={(e => setImage(e.target.files[0]))}/>
                        </div>
                        <div class="mb-3">
                            <label for="">Nhà cung cấp</label>
                            <select className="form-control" value={brandId} onChange={(e)=>setBrandId(e.target.value)}>
                            {
                                brands.map((brand, index)=> {
                                    return <option key={index} value={brand.id}>{brand.name}</option>
                                })
                            }
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>              
            </form>
        </div>
    );
}
export default ProductAdd;