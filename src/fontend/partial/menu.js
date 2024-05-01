import { useContext, useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import apiCategory from '../../api/apiCategory';
import UserContext from "../context/userContext";
import apiBrand from '../../api/apiBrand';

function Menu(){
    const [subMenu, setSubMenu] = useState([]);
    const {user} = useContext(UserContext);
    const [brands, setBrands] = useState([]);

    useEffect(()=>{
        apiCategory.getAll().then((res)=>{
            try{
                const menuData=res.data.map((item)=>{
                    return{
                        id:item.id,
                        name:item.attributes.category_name,
                        slug:item.attributes.slug,
                        parent:item.attributes.parent_id
                    }
                })
                setSubMenu(menuData);
                // console.log(menuData);
            }catch(e){
                console.log(e);
            }
        })
    },[]);
    useEffect(()=>{
        apiBrand.getAll().then((res)=>{
            try{
                const menuData = res.data.map((item)=>{
                    return{
                        id: item.id,
                        name: item.attributes.brand_name,
                        slug: item.attributes.slug,                       
                    }
                })
                setBrands(menuData);
                // console.log("menu data: ", menuData);
            }catch(e){
                console.log(e);
            }
        })
    },[]);
    return(
        <div id="templatemo_menubar" style={{backgroundImage: '../assets/images/templatemo_body.jpg'}}>
            <div id="top_nav" className="ddsmoothmenu">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link>
                        <ul>
                            {
                                subMenu.map((submenu, index)=>{
                                    return (
                                        <li key={index}><Link style={{background: '#222'}} to={`/product-by-cat/${submenu.slug}`}>{submenu.name}</Link></li>
                                    )
                                })
                            }                            
                        </ul>
                    </li>
                    <li><Link to="/products">Thương hiệu</Link>
                        <ul>
                            {
                                brands.map((brand, index)=>{
                                    return(
                                        <li key={index}><Link style={{background: '#222'}} to={`/brand-by-cat/${brand.id}`}>{brand.name}</Link></li>
                                    )
                                })
                            }
                        </ul>
                    </li>
                    <li><Link to="/faqs">FAQs</Link></li>
                    <li>
                        {user?(
                            <Link to="/checkout">Checkout</Link>
                        ):(
                            <Link to="/login">Checkout</Link>                        )
                        }
                        
                    </li>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>
                <br style={{clear: 'left'}} />
            </div> 
            {/* <!-- end of ddsmoothmenu --> */}
            <div id="templatemo_search">
                <form action="#" method="get">
                    <input type="text" name="keyword" id="keyword" title="keyword" className="txt_field" />
                    <input type="submit" name="Search" value=" " alt="Search" id="searchbutton" title="Search" className="sub_btn" />
                </form>
            </div>
        </div> 
    );   
}
export default Menu;