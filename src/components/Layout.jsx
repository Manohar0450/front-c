import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { AdminContext } from './AdminContext'; // Import AdminContext
import './homePage.css';
import { MdLogin, MdLogout } from "react-icons/md";

const Layout = () => {
    const { isAdmin, clearAdminStatus } = useContext(AdminContext); // Access admin status and clear function
    const location = useLocation(); // Get the current location
    const navigate = useNavigate(); // Initialize useNavigate
    const [isWidth, setIsWidth] = useState(window.innerWidth);

    const handleLogout = () => {
        clearAdminStatus(); // Clear admin status
        navigate('/'); // Redirect to homepage
    };

    const handleLoginClick = () => {
        navigate('/admin', { state: { from: location } }); // Navigate to admin login with current location
    };

    useEffect(() => {
        const handleResize = () => setIsWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <div className="Image">
                <img src="https://info.aec.edu.in/ACET/collegeimages/title_head.jpg" alt="College" />
            </div>
            <div className="Buttons">
                <div style={{ display: 'flex' , flexDirection: 'column', alignItems: 'center'}}>
                    <div className='department'>DEPARTMENT OF CSE(AIML & IOT)</div>
                    <div className="meda">MEDA</div>
                </div>
                {isAdmin ? (
                    <div className="Logout" onClick={handleLogout}>Logout<span style={{fontSize: '25px', marginTop: "5px", marginLeft: "5px"}}><MdLogout /></span></div>
                ) : (
                    <div className="Login" onClick={handleLoginClick}>{isWidth >= 500 ? "Admin Login" : "Login"}<span style={{fontSize: '25px', marginTop: "5px", marginLeft: "5px"}}><MdLogin /></span></div> // Use handleLoginClick
                )}
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;