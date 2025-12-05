import React from 'react';
import {Navigate} from 'react-router-dom';

const RoleGuardComponent = ({children, allow = []}) => {
    const isAuthenticated = !!localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const isSuperuser = localStorage.getItem('is_superuser') === 'true';
    const isStaff = localStorage.getItem('is_staff') === 'true';
    const isUser = localStorage.getItem('is_user') === 'true';

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    let current;
    if (isSuperuser) current = 'superuser';
    else if (isStaff) current = 'admin';
    else if (role === 'doctor') current = 'doctor';
    else if (role === 'operator') current = 'operator';
    else if (role === 'pharmacist') current = 'pharmacist';
    else if (isUser) current = 'user';


    if (!allow.includes(current)) {
        return <Navigate to={`/${current}`} replace/>;
    }

    return children;
};

export {RoleGuardComponent};
