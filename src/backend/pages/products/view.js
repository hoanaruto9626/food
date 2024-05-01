import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";
import apiBrand from "../../../api/apiBrand";
import { imageURL } from "../../../api/config";

function ProductView(){
    const {slug} = useParams();
    const [products, setProducs] = useState([]);
    const [brands, setBrands] = useState([]);
    useEffect (() => {
        apiProduct.getDetailProductBySlug(slug).then((res)=>{
            try{
                const productAttributes = res.data[0].attributes;
                const product = {
                    id: res.data[0].id,
                    product_name: productAttributes.product_name,
                    slug: productAttributes.slug,
                    price: productAttributes.price,
                    description: productAttributes.description,

                    sale_price: productAttributes.sale_price,
                    image: productAttributes.image.data.attributes.url,
                    brand_id: productAttributes. brand_id
                }
                setProducs(product);
            }catch(err){
                console.log(err.message);
            }
        });
    },[]);

    useEffect(() => {
        apiBrand.getAll().then(res=>{
            try{
                const brandData = res.data.map((item)=>{
                    return{
                        id: item.id,
                        name: item.attributes.brand_name
                    }
                })
                setBrands(brandData);
                console.log("Brand :", brandData);
            }catch(e){
                console.log(e)
            }
        });
    },[]);

    return(
        <div  className="product-edit-container">
            <h1 style={{textAlign: 'center', clear:'both'}}>Xem sản phẩm</h1>
            <div className="row" style={{color: 'white', margin: 'auto'}}>
                <div className="col-md-7">
                    <div class="mb-3 mt-3">
                        <label for="product_name">Tên sản phẩm</label>
                        <input type="text" className="form-control" id="product_name" name="product_name" value={products.product_name}/>
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="slug">Slug</label>
                        <input type="text" className="form-control" id="slug" name="slug" value={products.slug}/>
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="price">Đơn giá</label>
                        <input type="text" className="form-control" id="price" name="price" value={products.price}/>
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="description">Mô tả sản phẩm</label>
                        <textarea className="form-control" rows="5" id="comment" value={products.description}/>
                    </div>
                </div>
                <div className="col-md-5 mt-5">
                    <div className="mb-3">
                        <label for="sale_price" className="form-label">Giá khuyến mãi</label>
                        <input type="text" className="form-control" id="sale_price" name="sale_price" value={products.sale_price}/>
                    </div>
                    <div className="mb-3">
                        <label for="image" className="form-label">Hình ảnh</label><br/>
                        <img src={imageURL+products.image} style={{width: '200px', height: '150px'}}/>
                    </div>
                    <div class="mb-3">
                        <label for=''>Nhà cung cấp</label>
                        <select className="form-control" value={products.brand_id}>
                        {
                            brands.map((brand, index)=> {
                                return <option key={index} value={brand.id}>{brand.name}</option>
                            })
                        }
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductView;