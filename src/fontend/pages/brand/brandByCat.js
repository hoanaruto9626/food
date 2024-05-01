import { useParams } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";
import { useEffect, useState } from "react";
import ProductItem from "../products/productItem";

const BrandByCat = () => {
    const {id} = useParams();
    const [productByCat, setProductsByCat] = useState([]);
    useEffect(()=>{
        apiProduct.getProductByCatId(id).then((res)=>{
            try{
                const data = res.data;
                //console.log("Product Data brand: ", data);
                const products = data.map((item)=>{
                    return{
                        id:item.id,
                        name:item.attributes.product_name,
                        price:item.attributes.price,
                        slug: item.attributes.slug,
                        image:item.attributes.image.data.attributes.url,
                        description:item.attributes.description,
                    };
                });
                setProductsByCat(products);
            }catch(error){
                console.log("Error",error);
            }
        })
    },[productByCat]);
    
    return(
        <div id="templatemo_main">
            {/* <div id="content" className="float_r"> */}
            <h1 style={{textAlign: 'center'}}>Thương hiệu</h1>
                {
                    productByCat.map((product, index)=>{
                        return(
                            <ProductItem key={index} product={product}/>
                        )
                    })
                }
            {/* </div> */}
            <div className="cleaner"></div>
        </div>
    );
}
export default BrandByCat;