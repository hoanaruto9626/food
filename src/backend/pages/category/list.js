import { useEffect, useState } from "react";
import apiCategory from "../../../api/apiCategory"
import { Link } from "react-router-dom";
function CategoryList(){
    const [categories, setCategories] = useState([]);
    const [delCategoryItem, setDelCategoryItem] = useState(false);
    useEffect(()=>{
        apiCategory.getAll().then(res => {
            try {
                const categoryData = res.data.map((item) => {
                    return{
                        id: item.id,
                        name: item.attributes.category_name,
                        parent_id: item.attributes.parent_id,
                        slug: item.attributes.slug
                    }
                })
                setCategories(categoryData);
            }catch(e){
                console.log(e);
            }
        })
    },[delCategoryItem]);
    const delCategory = async (id) => {
        apiCategory.delCategoryById(id).then(res => {
            try{
                alert("Xóa thành công");
                setDelCategoryItem(id);
            }catch(e){
                console.log(e);
            }
        });
    }
    return(
        <div className="container">
            <h1 style={{clear: 'both', textAlign:'center'}}>Danh sách danh mục</h1>
            <Link className="btn btn-primary" to="/admin/addCategory" style={{ color: "white" }}>Thêm danh mục</Link>
            <table className="table table-bordered" style={{ marginTop: "10px" }}>
                <thead><tr><th>ID</th><th>Danh mục</th><th>Danh mục cha</th><th>Slug</th><th>Hành động </th></tr></thead>
                <tbody>
                    {
                        categories.map((item, index) => {
                            return(
                                <tr key = {index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        {
                                            categories.map((category, index) => {
                                                if(category.id === item.parent_id){
                                                    return category.name;
                                                }
                                            })
                                        }
                                    </td>
                                    <td>{item.slug}</td>
                                    <td>
                                        <Link  className="btn btn-success" to={`/admin/editCategory/${item.id}`} style={{ color: "white" }}>Sửa</Link>{"  "}
                                        <button className="btn btn-info" onClick={() => delCategory(item.id)} style={{ color: "white" }}>Xóa</button>
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
export default CategoryList;