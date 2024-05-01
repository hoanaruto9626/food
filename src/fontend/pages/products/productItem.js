import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { imageURL } from "../../../api/config";
import { useDispatch } from "react-redux";
import { ADD } from "../../../redux/action/cartAction";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";
function ProductItem(props){
    const dispatch = useDispatch();
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const handleAddToCart = () => {
        if(user){
            const product = {
            id: props.product.id,
            name: props.product.name,
            price: props.product.price,
            slug: props.product.slug,
            image: props.product.image,
            description: props.product.description,
            brand_id: props.product.brand_id,
            amount: 1 // Số lượng ban đầu là 1
            };
            dispatch(ADD(product));
        }else{
            navigate("/login");
        }
    };

    return(
        <div className="product_box">
            <Link to={`/productdetail/${props.product.slug}`} key={props.key}>
                <a><img src={imageURL+props.product.image} alt={props.product.name}/></a>              
            </Link>
            <p>{props.product.name}</p>
            <p className="product_price" key={props.key}>{props.product.price.toLocaleString('vi-VN')}</p>
            <a className="addtocart" onClick={handleAddToCart}></a>
            <Link to={`/productdetail/${props.product.slug}`} className="detail"></Link>
        </div>
    );
}
export default ProductItem;