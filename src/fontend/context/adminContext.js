// userContext.js
import { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null); // Thêm trạng thái userType để lưu trữ loại tài khoản

    return (
        <AdminContext.Provider value={{ isLoggedIn, setIsLoggedIn, userType, setUserType }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContext;
