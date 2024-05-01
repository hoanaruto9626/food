import CategoryList from "../backend/pages/category/list";
import Home from "../backend/home/home";
import CategoryAdd from "../backend/pages/category/add";
import CategoryEdit from "../backend/pages/category/edit";
import ProductList from "../backend/pages/products/list";
import ProductAdd from "../backend/pages/products/add";
import ProductEdit from "../backend/pages/products/edit";
import ProductView from "../backend/pages/products/view";
import User from "../backend/pages/user/list";
import ViewUser from "../backend/pages/user/view";
import BrandList from "../backend/pages/brand/list";
import BrandAdd from "../backend/pages/brand/add";
import BrandEdit from "../backend/pages/brand/edit";
import OrderList from "../backend/pages/order.js/list";
import LoginAdmin from "../backend/user/loginadmin";
const BackendRoute = [
    {'path':'/admin', 'component': Home},
    {'path':'/admin/category', 'component': CategoryList},
    {'path':'/admin/addCategory', 'component': CategoryAdd},
    {'path':'/admin/editCategory/:id', 'component': CategoryEdit},
    {'path':'/admin/products/:page', 'component': ProductList},
    {'path':'/admin/addproducts', 'component': ProductAdd},
    {'path':'/admin/editproducts/:slug', 'component': ProductEdit},
    {'path':'/admin/viewproducts/:slug', 'component': ProductView},
    {'path':'/admin/user', 'component': User},
    {'path':'/admin/viewuser/:id', 'component': ViewUser},
    {'path':'/admin/brands', 'component': BrandList},
    {'path':'/admin/addbrand', 'component': BrandAdd},
    {'path':'/admin/editbrand/:id', 'component': BrandEdit},
    {'path':'/admin/orderlist', 'component': OrderList},
    {'path':'/admin/loginadmin', 'component': LoginAdmin},
];
export default BackendRoute;