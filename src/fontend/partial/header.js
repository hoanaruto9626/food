import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
function Header(){
    const {user, setUser} = useContext(UserContext);
    const getData = useSelector((state)=> state.cart.carts);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser && !user) {
        const user = JSON.parse(loggedInUser);
        setUser(user);
        }
    }, [setUser]);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return(
        <div id="templatemo_header">
            <div id="site_title"><h1><a href="#">Online Shoes Store</a></h1></div>
            <div id="header_right">
                <p>
                    <a href="#"><FontAwesomeIcon icon={faUser} /> {user ? user.username : ""}</a> | <a href="#">My Wishlist</a> | <a href="#">My Cart</a> | <a href="#">Checkout</a> |{" "}
                    {
                        user?(
                            <a href="#" onClick={handleLogout}>
                                Log Out
                            </a>
                        ):(
                            <Link to="/login">Log In</Link>
                        )
                    }
                </p>                    
                <p>
                    Shopping Cart: <strong>{getData.length} item</strong>
                    ( 
                        {user?(
                            <Link to="/shoppingcart">Show Cart</Link>
                        ):(
                            <Link to="/login">Show Cart</Link>
                        )
                        } 
                    )
                </p>
            </div>
            <div className="cleaner"></div>
            {/* <!-- END of templatemo_header -->     */}
        </div> 
    );
}
export default Header;