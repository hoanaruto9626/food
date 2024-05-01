import apiCategory from "../../../api/apiCategory";
import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
function CategoryAdd(){
    const [catName, setCatName] = useState("");
    const [parentID, setParentID] = useState("");
    const [slug, setSlug] = useState("");
    const [categories, setCategories] =useState([]);
    const navigate = useNavigate();
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
    },[]);
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const category = {category_name: catName, parent_id: parseInt(parentID), slug: slug};
        console.log(category);
        try{            
            const response = await apiCategory.createCategory({data: category});
            //console.log(response);
            navigate("/admin/category");
        }catch(error){
            console.error(error);
        }
    };
    return(
        <div className="category-edit-container" style={{width: "50%", margin: "70px"}}>
            <h1>Thêm danh mục</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="control-label" for="inputName">Tên danh mục <sup>*</sup></label>
                    <div className="controls">
                        <input type="text" id="inputFname" className="form-control" placeholder="Name" value={catName} onChange={(e) => setCatName(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label className="control-label" for="input">Danh mục cha <sup>*</sup></label>
                    <select className="form-control" name="parent_id" value={parentID} onChange={(e) => setParentID(e.target.value)}>
                        <option value="0">Không có danh mục cha</option>
                        {
                            categories.map((item, index) => {
                                return (
                                    <option key = {index} value={item.id}>{item.name}</option>
                                );
                            })
                        }
                    </select>
                </div>
                <div>
                    <label className="control-label" for="inputSlug">Slug <sup>*</sup></label>
                    <div className="controls">
                        <input type="text" id="inputSlug" className="form-control" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <button type="submit" className="button button1">Thêm</button>                       
                </div>
            </form>
        </div>
    );
}
export default CategoryAdd;