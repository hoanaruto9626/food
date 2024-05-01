import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import apiOrderDetail from "../../../api/apiOrderDetail";

function OrderList(){
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(()=>{
        apiOrderDetail.getAll().then((res)=>{
            try{
                const orderDetailData = res.data.map((item)=>{
                    return{
                        id: item.id,
                        orderId: item.attributes.order_id,
                        productId: item.attributes.product_id,
                        price: item.attributes.price,
                        quantity: item.attributes.quantity,
                        total: item.attributes.total,
                    }
                })
                setOrderDetails(orderDetailData);
            }catch(e){
                console.log(e);
            }
        });
    },[]);
    return(
        <div className="container">
            <h1 style={{clear: 'both', textAlign:'center', color: 'white'}}>Đơn hàng</h1>
            <table className="table table-striped table-bordered" style={{ marginTop: "10px" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID tên khách hàng</th>
                        <th>ID sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.map((item, index)=>{
                            return(
                                <tr key = {index}>
                                    <td>{item.id}</td>
                                    <td>{item.orderId}</td>
                                    <td>{item.productId}</td>
                                    <td>{item.price.toLocaleString('vi-VN')}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.total.toLocaleString('vi-VN')}</td>
                                    <td>
                                        <Link style={{fontSize: '30px', backgroundColor: '#3cb234', color: 'white'}}><AiFillEye /></Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
export default OrderList;