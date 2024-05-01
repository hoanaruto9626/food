import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiUser from "../../../api/apiUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {BsCart4} from 'react-icons/bs'
function User(){
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        apiUser.getAll().then((res)=>{
            try{
                    const userData = res.map((user)=>{
                        return{
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            address: user.address,
                            phone: user.phone
                        };
                    });
                    setUsers(userData);
            }catch(e){
                console.log(e);
            }
        });
    },[]);
    return(
        <div className="container">
            <h1 style={{clear: 'both', textAlign:'center'}}>Danh sách người dùng</h1>
            <table className="table table-striped table-bordered" style={{ marginTop: "10px" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.phone}</td>
                                <td>
                                <Link to={`/admin/viewuser/${user.id}`}><FontAwesomeIcon icon={faEye} style={{fontSize: '30px'}}/></Link>{" "}
                                <a><BsCart4 style={{fontSize: '30px'}}/></a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
export default User;