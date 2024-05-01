import { Link } from "react-router-dom";

function Menu(){
    
    return(
        <div id="top_nav" className="ddsmoothmenu" >
            <ul>
                <li><a href="#submenu1">Home</a></li>
                <li><Link to="/admin">Quản lý danh sách</Link>
                    <ul>
                        <li><Link to="/admin/category">Danh mục</Link></li>
                        <li><Link to="/admin/products/1">Sản phẩm</Link></li>
                        <li><Link to="/admin/user">Nguời dùng</Link></li>
                        <li><Link to="/admin/orderlist">Đơn hàng</Link></li>
                        <li><Link to="/admin/brands">Nhà cung cấp</Link></li>
                    </ul>
                </li>
            </ul>
        </div> 
    );
}
export default Menu;