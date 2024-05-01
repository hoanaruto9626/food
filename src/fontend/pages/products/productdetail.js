import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";
import { imageURL } from "../../../api/config";
import { useDispatch } from "react-redux";
import { ADD } from "../../../redux/action/cartAction";
import UserContext from "../../context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function Productdetail(){
    const {slug}=useParams();
    const [productDetail, setProductDetail]=useState([]);
    const [amountItem,setAmountItem]=useState(1);
    const dispatch=useDispatch();
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(()=>{
        apiProduct.getDetailProductBySlug(slug).then((res)=>{
            try{
                const productAttributes=res.data[0].attributes;
                const product={
                    id:res.data[0].id,
                    name:productAttributes.product_name,
                    price:productAttributes.price,
                    slug:productAttributes.slug,
                    image:productAttributes.image.data.attributes.url,
                    description: productAttributes.description,
                }
                setProductDetail(product);
                console.log("productdetail:", product);
            }catch(err){
                console.log("Error",err.message);
            }
        });
    },[]);
    const handleAddToCart = (amountItem)=>{
        if(user){
            const product={
                ...productDetail,
                amount: amountItem    
            };
            dispatch(ADD(product));
        }
        else{
            navigate("/login");
        }
    }
    const handleAmountChange = (e) => {
        // Kiểm tra nếu số lượng xuống dưới 1 thì đặt lại số lượng là 1
        const newAmount = e.target.value <= 0 ? 1 : e.target.value;
        setAmountItem(newAmount);
    };

    const increaseItemCart = () => {
        setAmountItem(amountItem + 1);
    }

    const decreaseItemCart = () => {
        if(amountItem > 1){
            setAmountItem(amountItem - 1);
        }
    }
    return(
        <div id="templatemo_main">
            <div style={{marginLeft: '80px'}}>
                <h1>Chi tiết sản phẩm</h1>
                <div className="content_half float_l" style={{width:`200px`, height:`150px`}}>
                    <a href={imageURL + productDetail.image} alt={productDetail.name}>
                        <img src={imageURL+productDetail.image} alt={productDetail.name}/>
                    </a>
                </div>
                <div className="content_half float_r" style={{marginRight:'170px'}}>
                    <table>
                        <tr>
                            <td width="160">Price:</td>
                            <td>{productDetail.price}</td>
                        </tr>
                        <tr>
                            <td>Availability:</td>
                            <td>{productDetail.name}</td>
                        </tr>
                        <tr>
                            <td>Manufacturer:</td>
                            <td>{productDetail.slug}</td>
                        </tr>
                        <tr>
                            <td>Quantity</td>
                            <td>
                                <div className="input-group-btn">
                                    <button className="btn btn-primary btn-minus" onClick={()=>decreaseItemCart()}>
                                    <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <input type="text" className="form-control text-center input-amount" value={amountItem} onChange={(e)=>setAmountItem(e.target.value)}/>
                                    <button className="btn btn-primary btn-plus" onClick={(e)=>increaseItemCart()}>
                                    <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div className="cleaner h20"></div>
                    <a href="#" className="addtocart" onClick={() => handleAddToCart(amountItem)}></a>
                </div>
                <div className="cleaner h30"></div>
                <div className="cleaner h50"></div>
                <h5>Product Description</h5>
                <p>{productDetail.description}</p>
                <div className="cleaner h50"></div>
            </div> 
            <div className="cleaner"></div>
        </div>
    );
}
export default Productdetail;