import { useDispatch, useSelector } from "react-redux";
import cartReducer from "../../../redux/reducers/cartReducer";
import CartItem from "./cartItem";
import { CLEAR, TOTAL } from "../../../redux/action/cartAction";
import { Link } from "react-router-dom";
function Shoppingcart(){
    const getDataCart = useSelector(state=>state.cart.carts);
    const dispatch = useDispatch();
    dispatch(TOTAL());
    
    const clearCart = () =>{
        dispatch(CLEAR());
    }
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    console.log("getDataCart:", getDataCart);
    return(
        <div id="templatemo_main">
            <div>
                <h1 style={{textAlign: 'center'}}>Shopping Cart</h1>
                <table width="880px" cellspacing="0" cellpadding="5" style={{margin: 'auto'}}>
                    <tr bgcolor="#ddd">
                        <th width="220" align="left">Image </th> 
                        <th width="180" align="left">Description </th> 
                        <th width="100" align="center">Quantity </th> 
                        <th width="60" align="right">Price </th> 
                        <th width="60" align="right">Total </th> 
                        <th width="90">Hanh dong</th>                            
                    </tr>
                    {
                        getDataCart.map((e) => {
                            return(
                                <CartItem item={e}/>
                            )
                        })
                    }
                    <tr>
                        <td colSpan={3} align="right"  height="30px"><a href="shoppingcart.html"><button className="button2">Update</button></a></td>
                        <td align="right" style={{background:'#ddd', fontWeight:'bold'}}> Total đ</td>
                        <td align="right" style={{background:'#ddd', fontWeight:'bold'}}>{totalAmount.toLocaleString('vi-VN')}</td>
                        <td style={{background:'#ddd', fontWeight:'bold'}}></td>
                    </tr>
                </table>
                <div className="button-container" style={{float:'right', width: '215px', marginTop: '20px'}}>
                    <button type="submit" className="button button1" onClick={() =>clearCart()}>Clear all carts</button>
                    <Link to="/checkout"><button type="submit" className="button button1">Thanh toán</button></Link>                           
                </div>
                {/* <div style={{float:'right', width: '215px', marginTop: '20px'}}>                        
                    <p><a href="checkout.html">Proceed to checkout</a></p>
                    <p><a href="javascript:history.back()">Continue shopping</a></p>                            
                </div> */}
            </div>
            <div class="cleaner"></div>
        </div>
    );
}
export default Shoppingcart;