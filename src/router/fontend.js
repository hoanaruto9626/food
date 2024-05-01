import Home from "../fontend/pages/home/home";
import Products from "../fontend/pages/products/products";
import Faqs from "../fontend/pages/faqs/faqs";
import Checkout from "../fontend/pages/checkout/checkout";
import Contact from "../fontend/pages/contact/contact";
import Shoppingcart from "../fontend/pages/shoppingcart/shoppingcart";
import Productdetail from "../fontend/pages/products/productdetail";
import ProductsByCat from "../fontend/pages/products/productByCat";
import Register from "../fontend/pages/user/register";
import LoginUser from "../fontend/pages/user/login";
import LogoutUser from "../fontend/pages/user/logout";
import BrandByCat from "../fontend/pages/brand/brandByCat";
const FontendRouter=[
    {'path':'/', 'component': Home},
    {'path':'/products', 'component': Products},
    {'path':'/faqs', 'component': Faqs},
    {'path':'/checkout', 'component': Checkout},
    {'path':'/contact', 'component': Contact},
    {'path':'/shoppingcart', 'component': Shoppingcart},
    {'path':'/productdetail/:slug', 'component': Productdetail},
    {'path':'/product-by-cat/:slug', 'component': ProductsByCat},
    {'path':'/register', 'component': Register},
    {'path':'/login', 'component': LoginUser},
    {'path':'/logout', 'component': LogoutUser},
    {'path':'/brand-by-cat/:id', 'component': BrandByCat},
];
export default FontendRouter;