import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './homePage.css';
import axios from "axios";
import { AdminContext } from './AdminContext';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [valid, setValid] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { setIsAdmin } = useContext(AdminContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:7000/api/adminlogin", { username, password })
            .then((response) => {
                if (response.data.message === "Login Successfull") {
                    setValid(true);
                    setIsAdmin(true);
                    localStorage.setItem('isAdmin', 'true');
                    navigate(location.state?.from || '/');
                } else {
                    setValid(false);
                }
            })
            .catch((error) => {
                setValid(false);
                console.log("Error while Verifying...");
            });
    };


    return (
        <div className="Navigation" style={{ backgroundImage: 'url(/path/to/background.jpg)', backgroundSize: 'cover' }}>
            <div className="FormBody">
                <div className="Form">
                    <div className="Login_Header">Admin Login</div>
                    <div className="InValidDetails" style={valid === false ? { display: "block" } : { display: "none" }}>Invalid Login</div>
                    <form onSubmit={handleSubmit}>
                        <div className="AdminDetails">
                            <div className="userName">
                                <label>UserName</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="Password">
                                <label>Password</label>
                                <div className="input-container">
                                    <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <div className="eye-icon" onClick={() => setShowPassword(prevState => !prevState)}>
                                        {showPassword ? "🙈" : "👁️"}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="forgotPassword" onClick={() => navigate("/ChangePassword")}>Forgot password ?</div>
                        <div className="forgotPassword" onClick={() => navigate("/ChangeUserName")}>Change UserName ?</div>
                        <div className="Submit">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;