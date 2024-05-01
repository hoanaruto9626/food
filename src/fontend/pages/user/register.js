import { useState } from "react";
import apiUser from "../../../api/apiUser";
import { useNavigate } from "react-router-dom";

function Register(){
    const [username, setUserName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [phone, setPhone]=useState("");
    const [address, setAddress]=useState("");

    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        try{
            e.preventDefault();
            const user = {username: username, address: address,email: email,password: password,phone: phone};
            const response = await apiUser.createUser(user);
            console.log(response);
            console.log('Registration successful:', response);
            alert('Registration successful');
            navigate('/');
        }catch(error){
            console.error('Registration error', error);
        }
    };
    return(
        <div id="templatemo_main">
            {/* <div id="content" className="float_r"> */}
                <div className="well">
                    <form className="form-horizontal" onSubmit={handleSubmit}>
                        <h3>Your Personal Details</h3>
                        <div className="control-group">
                            <label className="control-label" for="inputFname">First name <sup>*</sup></label>
                            <div className="controls">
                                <input type="text" id="inputFname" placeholder="First Name" value={username} onChange={(e)=>setUserName(e.target.value)}/>
                            </div>
                        </div>
                        <div className="control-group">
                            <label className="control-label" for="inputEmail">Email <sup>*</sup></label>
                            <div className="controls">
                                <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                        </div>	
                        <div className="control-group">
                            <label className="control-label" for="inputAddress">Address <sup>*</sup></label>
                            <div className="controls">
                                <input type="text" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                            </div>
                        </div>
                        <div className="control-group">
                            <label className="control-label" for="inputPhone">Phone <sup>*</sup></label>
                            <div className="controls">
                                <input type="text" placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                            </div>
                        </div>  
                        <div className="control-group">
                            <label className="control-label">Password <sup>*</sup></label>
                            <div className="controls">
                                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className="control-group">
                            <div className="controls">
                                <input type="submit" name="submitAccount" value="Register" className="exclusive shopBtn"/>
                            </div>
                        </div>
                    </form>
                </div>
            {/* </div> */}
            <div className="cleaner"></div>
        </div>
    )
}
export default Register;