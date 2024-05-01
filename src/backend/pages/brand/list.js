import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiBrand from "../../../api/apiBrand";
import { LiaEdit } from "react-icons/lia";
import { MdDelete } from "react-icons/md";

function BrandList(){
    const [brands, setBrands] = useState([]);
    const [delBrand, setDelBrand] = useState(false);
    useEffect(()=>{
        apiBrand.getAll().then((res)=>{
            try{
                const brandData = res.data.map((item)=>{
                    return{
                        id: item.id,
                        name: item.attributes.brand_name,
                        slug: item.attributes.slug,
                        address: item.attributes.address
                    }
                })
                setBrands(brandData);
            }catch(e){
                console.log(e);
            }
        });
    },[delBrand]);

    const delBrands = async (id) =>{
        apiBrand.delBrandById(id).then(res => {
            try {
                alert('Xóa thành công');
                setDelBrand(id);
            }catch(e){
                console.log(e);
            }
        });
    }

    return(
        <div className="container">
            <h1 style={{clear: 'both', textAlign:'center'}}>Nhà cung cấp</h1>
            <Link className="btn btn-primary" to="/admin/addbrand" style={{color:'white'}}>Thêm</Link>
            <table className="table table-striped table-bordered" style={{ marginTop: "10px" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên nhà cung cấp</th>
                        <th>Slug</th>
                        <th>Địa chỉ</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        brands.map((item, index)=>{
                            return(
                                <tr key = {index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.slug}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <Link to={`/admin/editbrand/${item.id}`} style={{fontSize: '30px', backgroundColor: '#3cb234', color: '#0b0a09'}}><LiaEdit/></Link>{" "}
                                        <Link  onClick={() => delBrands(item.id)} style={{fontSize: '30px', backgroundColor: '#cd2323', color: '#fcfcfc'}}><MdDelete /></Link>{" "}
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
export default BrandList;