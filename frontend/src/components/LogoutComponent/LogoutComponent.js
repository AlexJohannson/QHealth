import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('is_superuser');
        localStorage.removeItem('is_staff');
        localStorage.removeItem('is_user');
        localStorage.removeItem('userId');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');

        navigate('/');
    };

    return (
        <button onClick={handleLogout}>
            LOGOUT
        </button>
    );
};

export { LogoutComponent };
