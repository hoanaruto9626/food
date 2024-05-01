import React,{useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import apiUser from "../../api/apiUser";
import AdminContext from "../../fontend/context/adminContext";
function LoginAdmin(){
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const {setIsLoggedIn} = useContext(AdminContext);
    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const data={
            identifier:email,
            password:password
        };
        try{
            const response = await apiUser.loginUser(data);
            console.log(response);
            var user = response.data.user;

            setIsLoggedIn(user);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/admin");
        }catch(error){
            console.log(error);
        }
    }
    return(
        <div id="templatemo_main">
            {/* <div id="content" className="float_r"> */}
                <div id="wrapper">
                    <form action="" id="form-login" onSubmit={handleSubmit}>
                        <h1 className="form-heading">Form đăng nhập</h1>
                        <div className="form-group">
                            <i className="far fa-user"></i>
                            <input type="text" className="form-input" placeholder="Tên đăng nhập" onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <i className="fas fa-key"></i>
                            <input type="password" className="form-input" placeholder="Mật khẩu" onChange={(e)=>setPassword(e.target.value)}/>
                            <div id="eye">
                                <i className="far fa-eye"></i>
                            </div>
                        </div>
                        <input type="submit" value="Đăng nhập" className="form-submit"/>
                        <Link to={'/register'} className="register" href="">Register an account</Link>
                    </form>
                </div>
            {/* </div> */}
            <div className="cleaner"></div>
        </div>
    )
}
export default LoginAdmin;