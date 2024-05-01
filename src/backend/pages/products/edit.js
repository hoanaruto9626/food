import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";
import apiBrand from "../../../api/apiBrand";
import apiCategory from "../../../api/apiCategory";
import axiosInstance from "../../../api/axios";
import { imageURL } from "../../../api/config";

function  ProductEdit(){
    const {slug} = useParams();
    const [productName, setProductName] = useState('');
    const [catID, setCatID] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [isOnSale, setIsOnSale] = useState(false);
    const [image, setImage] = useState(null);
    const [slugs, setSlugs] = useState('');
    const [category, setCategory] = useState('');
    const [brandID, setBrandID] = useState('');
    const [salePrice, setSalePrice] = useState(0);
    const [imageId, setImageId] = useState(null);
    const [productId, setProductId] = useState(0);

    // const [products, setProducts] =useState([]);
    const [categories, setCategories] =useState([]);
    const [brands, setBrands] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        apiProduct.getDetailProductBySlug(slug).then((res) => {
            try {
                console.log("Product Detail: ",res); 
                const productAttributes = res.data[0].attributes;
                setProductId(res.data[0].id);
                setProductName(productAttributes.product_name);
                setCatID(productAttributes.cat_id);
                setDescription(productAttributes.description);
                setPrice(productAttributes.price);
                setIsOnSale(productAttributes.is_on_sale);
                setImage(productAttributes.image.data.attributes.url);
                setSlugs(productAttributes.slug);
                setCategory(productAttributes.category);
                setBrandID(productAttributes.brand_id);
                setSalePrice(productAttributes.sale_price);
                setImageId(productAttributes.image.data.id);

            }catch(err){
                console.log("Error: ",err.message);
            }
        });
    },[]);

    useEffect(()=>{
        apiCategory.getAll().then(res => {
            try {
                const categoryData = res.data.map((item) => {
                    return{
                        id: item.id,
                        name: item.attributes.category_name,
                    }
                })
                setCategories(categoryData);
            }catch(e){
                console.log(e);
            }
        })
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            id: productId,
            product_name: productName,
            cat_id: catID,
            description: description,
            price: parseInt(price),
            is_on_sale: isOnSale,
            image: [imageId],
            slug:slugs,
            category: category,
            brand_id: brandID,
            sale_price: salePrice
        }
        console.log("Product Data: ",productData);
        let file = new FormData();
        file.append('files', image);
        const fileObject = file.get("files");
        if(fileObject instanceof File){
            // console.log("File object name: ", fileObject.name);
            if(fileObject !==""){
                axiosInstance.enableUploadFile();
                const res = await axiosInstance.post('/upload', file);
                const fileId = res.data[0].id;
                productData.image[0] = fileId;
                console.log("File ID: ", productData.image[0]);
            }else{
                console.log("No file selected")
            }
        }else{
            console.log("File object is not a file");
        }
        axiosInstance.enableJson();
        const responseProduct = await apiProduct.editProduct(productData.id, {data:productData});
        console.log("Respone Product: ", responseProduct);
        navigate("/admin/products/1");
    };

    return (
        <div className="product-edit-container" style={{width: "50%", margin: "70px"}}>
            <h1>Sửa sản phẩm</h1>
            <form onSubmit={handleSubmit}>
                <div className="row" style={{color: 'white'}}>
                    <div className="col-md-7">
                        <div class="mb-3 mt-3">
                            <label for="product_name">Tên sản phẩm</label>
                            <input type="text" className="form-control" id="product_name" name="product_name" value={productName} onChange={(e)=>setProductName(e.target.value)}/>
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="slug">Slug</label>
                            <input type="text" className="form-control" id="slug" name="slug" value={slugs} onChange={(e)=>setSlugs(e.target.value)}/>
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="slug">Danh mục cha</label>
                            <select className="form-control" name="parent_id" value={catID} onChange={(e)=>setCatID(e.target.value)}>
                            {
                                categories.map((category, index)=> {
                                    return <option key={index} value={category.id}>{category.name}</option>
                                })
                            }
                            </select>
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="price">Đơn giá</label>
                            <input type="text" className="form-control" id="price" name="price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="description">Mô tả sản phẩm</label>
                            <textarea className="form-control" rows="5" id="comment" value={description} onChange={(e)=>setDescription(e.target.value)}/>
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
                            <img src={imageURL+image} style={{width: '200px', height: '150px'}}/>
                            <input type="file" className="form-control" id="image" name="image" onChange={(e => setImage(e.target.files[0]))}/>
                        </div>
                        <div class="mb-3">
                            <label for=''>Nhà cung cấp</label>
                            <select className="form-control" value={brandID} onChange={(e)=>setBrandID(e.target.value)}>
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
export default ProductEdit;