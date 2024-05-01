import React, { useEffect, useState } from 'react';
import apiProduct from "../../../api/apiProduct"
import ProductItem from './productItem';
function Products(){
    const [products, setProducts]=useState([]);
    useEffect(()=>{
        apiProduct.getAll().then((res)=>{
            try{
                // console.log("resimage:", res.data)
                const productData=res.data.map((product)=>{
                    return{
                        id:product.id,
                        name:product.attributes.product_name,
                        price:product.attributes.price,
                        slug: product.attributes.slug,
                        image:product.attributes.image.data.attributes.url,
                        description: product.attributes.description,
                    };
                });
                // console.log("productData:", productData);
                setProducts(productData);
            }catch(err){
                console.log("Error:",err.messsage);
            }
        });
    },[])
    return( 
        <div id="templatemo_main">
            {/* <div id="content" className="float_r"> */}
                <h1 style={{textAlign: 'center'}}>Products</h1>
                {
                    products.map((product, index)=>{
                        return(
                            <ProductItem key={index} product={product}/>
                        );
                    })
                }   
            {/* </div> */}
            <div className="cleaner"></div>
        </div> 
    );
}
export default Products;