
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";
import ProductItem from "./productItem";

const ProductsByCat = () =>{
    const {slug}=useParams();
    const [productByCat, setProductsByCat]=useState([]);
    useEffect(()=>{
        apiProduct.getProductByCatSlug(slug).then((res)=>{
            try{
                const data = res.data;
                const products = data.map((item)=>{
                    return{
                        id:item.id,
                        name:item.attributes.product_name,
                        slug:item.attributes.slug,
                        price:item.attributes.price,
                        image:item.attributes.image.data.attributes.url,
                        description:item.attributes.description,
                    };
                });
                // console.log("Product data:", data);
                setProductsByCat(products);
            }catch(e){
                console.log("Error",e);
            }
        })
    },[productByCat]);
    return(
        <div id="templatemo_main">
            {/* <div id="content" className="float_r"> */}
            <h1 style={{textAlign: 'center'}}>Products By Category</h1>
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
    )
}
export default ProductsByCat;