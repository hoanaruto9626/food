import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiBrand from "../../../api/apiBrand";

function BrandEdit(){
    const {id} = useParams();
    const [brandName, setBrandName] = useState("");
    const [slug, setSlug] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        apiBrand.getBrandById(id).then(res => {
            try{
                console.log(res);
                const brandData = res.data.data.attributes;
                setBrandName(brandData.brand_name);
                setSlug(brandData.slug);
                setAddress(brandData.address);
            }catch(e){
                console.log(e);
            }
        });
    },[]);
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const brand = {
            brand_name: brandName,
            slug: slug,
            address: address,
        };
        console.log(brand);
        try{
            const response = await apiBrand.editBrand(id, {data: brand});
            console.log(response)
            alert("Sửa thành công");
            navigate("/admin/brands");
        }catch (error){
            console.log(error);
        }
    };
    return(
        <div className="category-edit-container" style={{width: "50%", margin: "70px"}}>
            <h1>Sửa</h1>
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
                        <input type="text" id="inputAdd" className="form-control" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <button type="submit" className="button button1">Sửa</button>                       
                </div>
            </form>
        </div>
    );
}
export default BrandEdit;