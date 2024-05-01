import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiBrand from "../../../api/apiBrand";

function BrandAdd(){
    const [brandName, setBrandName] = useState("");
    const [slug, setSlug] = useState("");
    const [address, setAddres] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const brand = {brand_name: brandName, slug: slug, address: address};
        console.log(brand);
        try{            
            const response = await apiBrand.createBrand({data: brand});
            //console.log(response);
            alert("Thêm thành công");
            navigate("/admin/brands");
        }catch(error){
            console.error(error);
        }
    };
    return(
        <div className="category-edit-container" style={{width: "50%", margin: "70px"}}>
            <h1>Thêm nhà cung cấp</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="control-label" for="inputName">Tên nhà cung cấp</label>
                    <div className="controls">
                        <input type="text" id="inputFname" className="form-control" placeholder="Name" value={brandName} onChange={(e) => setBrandName(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label className="control-label" for="inputSlug">Slug</label>
                    <div className="controls">
                        <input type="text" id="inputSlug" className="form-control" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label className="control-label" for="inputAdd">Địa chỉ</label>
                    <div className="controls">
                        <input type="text" id="inputAdd" className="form-control" placeholder="Address" value={address} onChange={(e) => setAddres(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <button type="submit" className="button button1">Thêm</button>                       
                </div>
            </form>
        </div>
    );
}
export default BrandAdd;