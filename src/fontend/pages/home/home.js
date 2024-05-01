import React, {useEffect, useState} from "react";
import apiProduct from "../../../api/apiProduct";
import ProductItem from "../products/productItem";
function Home(){
    const [products, setProducts]=useState([]);
    const [promotionProducts, setPromotionProduct]=useState([]);
    useEffect(()=>{
        apiProduct.getNewest().then((res)=>{
            try{
                const newProducts=res.data.map((product)=>{
                    return{
                        id:product.id,
                        name:product.attributes.product_name,
                        price:product.attributes.price,
                        slug:product.attributes.slug,
                        image:product.attributes.image.data.attributes.url,
                        description:product.attributes.description,
                    };
                });
                setProducts(newProducts);
                // console.log("newProduct:",newProducts);
            }catch(err){
                console.log(err);
            }
        });
    },[]);
    //lấy 6 sản phẩm khuyến mãi
    useEffect(()=>{
        apiProduct.getPromotion().then((res)=>{
            try{
                const promotionProductsData=res.data.map((product)=>{
                    return{
                        id:product.id,
                        name:product.attributes.product_name,
                        price:product.attributes.price,
                        slug:product.attributes.slug,
                        image:product.attributes.image.data.attributes.url,
                    };
                });
                setPromotionProduct(promotionProductsData);
            }catch(err){
                console.log(err);
            }
        });
    },[]);
    return(
        <div id="templatemo_main">
            {/* <div id="content" className="float_r">
                <div id="slider-wrapper">
                    <div id="slider" className="nivoSlider">
                        <img className="mySlides" src={require("../../assets/images/slider/02.jpg")} alt="" />
                        <a href="#"><img className="mySlides" src={require("../../assets/images/slider/01.jpg")} alt="This is an example of a caption" title="This is an example of a caption" /></a>
                        <img className="mySlides" src={require("../../assets/images/slider/03.jpg")} alt="" />
                        <img className="mySlides" src={require("../../assets/images/slider/04.jpg")} alt="" title="#htmlcaption" />
                        <a class="prev" onclick="plusSlides(-1)">❮</a>
                        <a class="next" onclick="plusSlides(1)">❯</a>
                    </div>
                </div>                 */}
                
                {/* <div id="slider-wrapper">
                    <div id="slider" className="nivoSlider">
                        <img src={require("../../assets/images/slider/02.jpg")} alt="" />
                        <a href="#"><img src={require("../../assets/images/slider/01.jpg")} alt="" title="This is an example of a caption" /></a>
                        <img src={require("../../assets/images/slider/03.jpg")} alt="" />
                        <img src={require("../../assets/images/slider/04.jpg")} alt="" title="#htmlcaption" />
                    </div>
                    <div id="htmlcaption" className="nivo-html-caption">
                        <strong>This</strong> is an example of a <em>HTML</em> caption with <a href="#">a link</a>.
                    </div>
                </div> */}
                <h1 style={{textAlign:`center`}}>Sản phẩm mới nhất</h1>
                {
                    products.map((product, index)=>{
                        return(
                            <ProductItem key={index} product={product}/>
                        );
                    })
                }
                
            {/* </div> */}
            {/* <div id="content" className="float_r"> */}
                <h1 style={{textAlign:`center`}}>Sản phẩm khuyến mãi</h1>
                {
                    promotionProducts.map((product, index)=>{
                        return(
                            <ProductItem key={index} product={product}/>
                        );  
                    })
                } 
            {/* </div>  */}
            <div className="cleaner"></div>
        </div>
    );
}
export default Home;