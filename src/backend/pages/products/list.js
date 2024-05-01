import React, { useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";
import { imageURL } from "../../../api/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
function ProductList(){
    const [products, setProducts] = useState([]);
    const [delProductItem, setProductItem] = useState(0);
    const [pages, setPages] = useState(1);
    const page = parseInt(useParams().page);
    const limit = 6;

    useEffect(() => {
        apiProduct.getProductPagination(page, limit).then((res) => {
            try{
                const numberOfPages = Math.ceil(res.meta.pagination.total / res.meta.pagination.pageSize);
                setPages(numberOfPages);
                const productsData = res.data.map((item)=>{
                    return{
                        id: item.id,
                        product_name: item.attributes.product_name,
                        slug: item.attributes.slug,
                        cat_name: item.attributes.category.data.attributes.category_name,
                        description: item.attributes.description,
                        is_on_sale: item.attributes.is_on_sale,
                        price: item.attributes.price,
                        sale_price: item.attributes.sale_price,
                        image: item.attributes.image.data.attributes.url
                    }
                });
                setProducts(productsData);
                // console.log("Product List: ", productsData);
            }catch(error){
                console.log("Failed to fetch product list: ", error)
            }
        })
    },[page, delProductItem]);

    const delProduct = (id) => {
        apiProduct.delProductById(id).then((res) => {
            try{
                console.log(res);
                alert("Xóa sản phẩm thành công");
                setProductItem(id);
            }catch(e){
                console.log(e);
            }
        });
    }

    return(
        <div className="container">
            <h1 style={{clear: 'both', textAlign:'center'}}>Products List</h1>
            <Link className="btn btn-primary" to="/admin/addproducts" style={{color:'white'}}>Thêm sản phẩm</Link>
            <table className="table table-striped table-bordered" style={{ marginTop: "10px" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Danh mục</th>
                        <th>Đơn giá</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td><img src={imageURL+product.image} alt={product.product_name} style={{width:'200px', height:'150px'}}/></td>
                                <td>{product.product_name}</td>
                                <td>{product.cat_name}</td>
                                <td>{product.price.toLocaleString('vi-VN')}</td>
                                <td>
                                    <Link to={`/admin/viewproducts/${product.slug}`}><FontAwesomeIcon icon={faEye} /></Link> <Link to={`/admin/editproducts/${product.slug}`}><FontAwesomeIcon icon={faPenToSquare} /></Link> <Link onClick={(e) => delProduct(product.id)}><FontAwesomeIcon icon={faTrash} /></Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <ul className="pagination">
                <li className="page-item"><Link class="page-link" to={`/admin/products/${page-1}`}>Previous</Link></li>
                {
                    Array.from(Array(pages).keys()).map((index)=>(
                        <li key={index} className={`page-item ${index+1 === page ? "active" : ""}`}>
                            <Link className="page-link" to={`/admin/products/${index+1}`}>
                                {index+1}
                            </Link>                          
                        </li>
                    ))
                }
                <li className="page-item"><Link class="page-link" to={`/admin/products/${page+1}`}>Next</Link></li>
            </ul>
        </div>        
    );
}
export default ProductList;