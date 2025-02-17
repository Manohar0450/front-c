import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AdminLogin from "./AdminLogin";
import "./homePage.css"

const ChangePassword = () => {
    const [username, setUsername] = useState('');
    const [Mainpassword, setMainPassword] = useState('');
    const [Changedpassword, setChangedPassword] = useState('');
    const [ReChangedpassword, setReChangedPassword] = useState('');
    const [showMainpassword, setShowMainPassword] = useState(false);
    const [showChangedpassword, setshowChangedpassword] = useState(false);
    const [showReChangedpassword, setShowReChangedPassword] = useState(false);
    const [valid, setValid] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();


    const handleSubmit = (e) => {
            e.preventDefault();
            setValid(true);
            if(Changedpassword != ReChangedpassword){
                setValid(false);
                setMainPassword('');
                setChangedPassword('');
                setReChangedPassword('');
                return;
            }
            else {
            const ChangeDetails = {
                userName : username,
                MainPassword : Mainpassword,
                ChangePassword: Changedpassword
            }
            axios.post("http://localhost:7000/api/changepassword", ChangeDetails)
                .then((response) => {
                    if (response.data.message === "Password Changed Successfully") {
                        setValid(true);
                        navigate(location.state?.from || '/admin');
                    } 
                    else {
                        setValid(false);
                        setMainPassword('');
                        setChangedPassword('');
                        setReChangedPassword('');
                    }
                })
                .catch((error) => {
                    setValid(false);
                    console.log("Error while Verifying...");
                });
            }
        };
    return (
        <div className="Navigation" style={{ backgroundImage: 'url(/path/to/background.jpg)', backgroundSize: 'cover' }}>
            <div className="FormBody">
                <div className="Form" style={{height: 400}}>
                    <div className="Login_Header">Forgot Password</div>
                    <div className="InValidDetails" style={valid === false ? { display: "block" } : { display: "none" }}>InValid Details</div>
                    <form onSubmit={handleSubmit}>
                        <div className="AdminDetails">
                            <div className="userName">
                                <label>UserName</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="Password">
                                <label>Main Password</label>
                                <div className="input-container">
                                    <input type={showMainpassword ? "text" : "password"} value={Mainpassword} onChange={(e) => setMainPassword(e.target.value)} required />
                                    <div className="eye-icon" onClick={() => setShowMainPassword(prevState => !prevState)}>
                                        {showMainpassword ? "🙈" : "👁️"}
                                    </div>
                                </div>
                            </div>
                            <div className="Password">
                                <label>Enter New Password</label>
                                <div className="input-container">
                                    <input type={showChangedpassword ? "text" : "password"} value={Changedpassword} onChange={(e) => setChangedPassword(e.target.value)} required />
                                    <div className="eye-icon" onClick={() => setshowChangedpassword(prevState => !prevState)}>
                                        {showChangedpassword ? "🙈" : "👁️"}
                                    </div>
                                </div>
                            </div>
                            <div className="Password">
                                <label>Re-enter New Password</label>
                                <div className="input-container">
                                    <input type={showReChangedpassword ? "text" : "password"} value={ReChangedpassword} onChange={(e) => setReChangedPassword(e.target.value)} required />
                                    <div className="eye-icon" onClick={() => setShowReChangedPassword(prevState => !prevState)}>
                                        {showReChangedpassword ? "🙈" : "👁️"}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Submit">
                            <button type="submit">Change</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;