import React, {useEffect, useContext} from "react";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";
function LogoutUser(){
    const {setUser} = useContext(UserContext);
    const navigate=useNavigate();
    useEffect(()=>{
        setUser("");
        navigate("/");
    })
    return(
        <div>
            
        </div>
    )
}
export default LogoutUser;