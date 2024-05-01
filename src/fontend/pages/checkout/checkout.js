import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import apiCheckout from "../../../api/apiCheckout";
import apiOrderDetail from "../../../api/apiOrderDetail";
import { clearCart } from "../../../redux/action/cartAction";

function Checkout(){
    const {user} = useContext(UserContext);
    const getDataCart = useSelector((state) => state.cart.carts);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    
    const [name, setName] = useState(user.username);
    const [address, setAddress] = useState(user.address);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);

    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = {
            name: name, 
            address: address,
            email: email,
            phone: phone,
            order_date: new Date().toISOString(),
        };
        try{
            //thêm đơn hàng
            const response = await apiCheckout.payCheckoutOrder({data: orderData});
            console.log(response);
            const orderId = response.data.data.id;
            //thêm chi tiết đơn hàng
            const promises = getDataCart.map(async (item) => {
                const orderDetail = {
                    order_id: orderId.toString(), 
                    product_id: item.id.toString(),
                    quantity: parseInt(item.quantity),
                    price: parseFloat(item.price),
                    total: parseFloat(item.price*item.quantity),
                };
                const responseOrderDetail = await apiOrderDetail.payCheckoutOrder_detail({data: orderDetail});
                console.log("Order detail: ", responseOrderDetail);
            });
            await Promise.all(promises);
            dispatch(clearCart());
            alert("Đặt hàng thành công");
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div id="templatemo_main">
            {/* <div id="content" className="float_r">   */}
                <form onSubmit={handleSubmit}>
                    <div className="content_half float_l checkout" style={{marginLeft: '50px'}}>
                        <h2>Checkout</h2>
                        <h5><strong>THÔNG TIN THANH TOÁN</strong></h5>                   
                        <div>
                            <label className="control-label" for="inputFname">First name <sup>*</sup></label>
                            <div className="controls">
                                <input type="text" id="inputFname" placeholder="First Name" value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                        </div>
                        <div>
                            <label className="control-label" for="inputAddress">Address: <sup>*</sup></label>
                            <div className="controls">
                                <input type="text" id="inputAddress" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                            </div>
                        </div>
                        <div>
                            <label className="control-label" for="inputEmail">E-MAIL <sup>*</sup></label>
                            <div className="controls">
                                <input type="text" id="inputEmail" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div>
                            <label className="control-label" for="inputPhone">PHONE <sup>*</sup></label>
                            <div className="controls">
                                <input type="text" id="inputPhone" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="button button1">Thanh toán</button>                       
                        </div>
                    </div>
                    <div className="content_half float_r checkout" style={{marginRight: '90px'}}>
                        <table width="571px" cellsacing="1" cellPadding="5" style={{ float: "right"}}>
                            <thead>
                                <tr bgcolor="#ddd">
                                    <th>Tên sản phẩm</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getDataCart.map((e, index) =>{
                                        return(
                                            <tr  key={index}>
                                                <td>{e.name}</td>
                                                <td>{e.price.toLocaleString('vi-VN')}</td>
                                                <td>{e.quantity}</td>
                                                <td>{(e.price*e.quantity).toLocaleString('vi-VN')}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            <tr><th colSpan={3}>Tổng tiền</th><th>{totalAmount.toLocaleString('vi-VN')}</th></tr>
                        </table>                     
                    </div>
                </form>               
                <div className="cleaner h50"></div>
            {/* </div>  */}
            <div className="cleaner"></div>
        </div>
    );
}
export default Checkout;