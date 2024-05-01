import { useDispatch } from "react-redux";
import { imageURL } from "../../../api/config";
import { REMOVE } from "../../../redux/action/cartAction";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
function CartItem(props){
    const dispatch = useDispatch();
    const removeItem = (item)=>{
        // console.log("Removing item:", item);
        dispatch(REMOVE(item));
    }
    return(
        <tr>
            <td><img src={imageURL+props.item.image} alt="image 1" style={{width:'200px', height:'150px'}} /></td> 
            <td>{props.item.description}</td> 
            <td align="center">{props.item.quantity}</td>
            <td align="right">{props.item.price.toLocaleString('vi-VN')}</td> 
            <td align="right">{(props.item.price*props.item.quantity).toLocaleString('vi-VN')}</td>
            <td align="center">
                <a style={{color: 'black', fontSize: '30px'}} onClick = {() => removeItem(props.item)}><FontAwesomeIcon icon={faTrashCan} /></a>
            </td>
        </tr>
    )
}
export default CartItem;