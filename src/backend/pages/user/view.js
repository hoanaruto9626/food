import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiUser from "../../../api/apiUser";

function ViewUser(){
    const {id} = useParams();
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        apiUser.getUserId(id).then((res)=>{
            try{
                const userData = res;
                // console.log("gia tri:", userData);
                const user = {
                    id: userData.data.id,
                    username: userData.data.username,
                    email: userData.data.email,
                    address: userData.data.address,
                    phone: userData.data.phone
                }
                setUsers(user);

            }catch(e){
                console.log(e);
            }
        });
    },[]);
    return(
        <div className="product-edit-container" style={{background: 'white'}}>
            <h1 style={{textAlign: 'center', clear:'both'}}>Thông tin người dùng</h1>
            <div className="row">
                <h1>User name</h1>
                <p>{users.username}</p>
                <h1>Email</h1>
                <p>{users.email}</p>
                <h1>Address</h1>
                <p>{users.address}</p>
                <h1>Phone</h1>
                <p>{users.phone}</p>
            </div>
        </div>
    );
}
export default ViewUser;