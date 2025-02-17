import React, { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(() => {
        // Check local storage for admin status on initial load
        return localStorage.getItem('isAdmin') === 'true';
    });

    const clearAdminStatus = () => {
        setIsAdmin(false);
        localStorage.removeItem('isAdmin'); // Clear admin status from local storage
    };

    return (
        <AdminContext.Provider value={{ isAdmin, setIsAdmin, clearAdminStatus }}>
            {children}
        </AdminContext.Provider>
    );
};