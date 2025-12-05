import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicOnlyGuard = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("userId");

    if (isAuthenticated) {
        const isSuperuser = localStorage.getItem("is_superuser") === "true";
        const isStaff = localStorage.getItem("is_staff") === "true";
        const role = localStorage.getItem("role");
        const isUser = localStorage.getItem("is_user") === "true";

        let home = "/";
        if (isSuperuser) home = "/superuser";
        else if (isStaff) home = "/admin";
        else if (role === "doctor") home = "/doctor";
        else if (role === "operator") home = "/operator";
        else if (role === "pharmacist") home = "/pharmacist";
        else if (isUser) home = "/user-home-page";


        return <Navigate to={home} replace />;
    }
    return children;
};

export { PublicOnlyGuard };
