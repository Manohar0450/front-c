import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AdminLogin from "./AdminLogin";
import "./homePage.css"

const ChangeUserName = () => {
    const [username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [ChangedUserName, setChangedUserName] = useState('');
    const [ReChangedUserName, setReChangedUserName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showChangedUserName, setshowChangedUserName] = useState(false);
    const [showReChangedUserName, setShowReChangedUserName] = useState(false);
    const [valid, setValid] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();


    const handleSubmit = (e) => {
            e.preventDefault();
            setValid(true);
            if(ChangedUserName != ReChangedUserName){
                setValid(false);
                setPassword('');
                setChangedUserName('');
                setReChangedUserName('');
                return;
            }
            else {
            const ChangeDetails = {
                userName : username,
                Password : Password,
                ChangeUserName: ChangedUserName
            }
            axios.post("http://localhost:7000/api/changeusername", ChangeDetails)
                .then((response) => {
                    if (response.data.message === "UserName Changed Successfully") {
                        setValid(true);
                        navigate(location.state?.from || '/admin');
                    } 
                    else {
                        setValid(false);
                        setPassword('');
                        setChangedUserName('');
                        setReChangedUserName('');
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
                    <div className="Login_Header">Change UserName</div>
                    <div className="InValidDetails" style={valid === false ? { display: "block" } : { display: "none" }}>InValid Details</div>
                    <form onSubmit={handleSubmit}>
                        <div className="AdminDetails">
                            <div className="userName">
                                <label>UserName</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="Password">
                                <label>Enter Password</label>
                                <div className="input-container">
                                    <input type={showPassword ? "text" : "password"} value={Password} onChange={(e) => setPassword(e.target.value)} required />
                                    <div className="eye-icon" onClick={() => setShowPassword(prevState => !prevState)}>
                                        {showPassword ? "🙈" : "👁️"}
                                    </div>
                                </div>
                            </div>
                            <div className="Password">
                                <label>Enter New UserName</label>
                                <div className="input-container">
                                    <input type={showChangedUserName ? "text" : "password"} value={ChangedUserName} onChange={(e) => setChangedUserName(e.target.value)} required />
                                    <div className="eye-icon" onClick={() => setshowChangedUserName(prevState => !prevState)}>
                                        {showChangedUserName ? "🙈" : "👁️"}
                                    </div>
                                </div>
                            </div>
                            <div className="Password">
                                <label>Re-enter New UserName</label>
                                <div className="input-container">
                                    <input type={showReChangedUserName ? "text" : "password"} value={ReChangedUserName} onChange={(e) => setReChangedUserName(e.target.value)} required />
                                    <div className="eye-icon" onClick={() => setShowReChangedUserName(prevState => !prevState)}>
                                        {showReChangedUserName ? "🙈" : "👁️"}
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

export default ChangeUserName;