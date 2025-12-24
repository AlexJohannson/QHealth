import React, {useState, useEffect} from 'react';
import {useMenuByRole} from '../../hooks/useMenuByRole';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import './NavigationComponent.css';

const NavigationComponent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const menu = useMenuByRole();
    const navigate = useNavigate();
    const location = useLocation();




    useEffect(() => {
        const checkAuth = () => {
            const userId = localStorage.getItem('userId');
            setIsLoggedIn(!!userId);
        };

        checkAuth();

        window.addEventListener("authChanged", checkAuth);

        return () => {
            window.removeEventListener("authChanged", checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('is_superuser');
        localStorage.removeItem('is_staff');
        localStorage.removeItem('is_user');
        localStorage.removeItem('userId');
        localStorage.removeItem('roleId');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');


        setIsLoggedIn(false);
        navigate('/');
    };

    const getHomePath = () => {
        const role = localStorage.getItem('role');
        const isSuper = localStorage.getItem('is_superuser') === 'true';
        const isStaff = localStorage.getItem('is_staff') === 'true';
        const isUser = localStorage.getItem('is_user') === 'true';

        if (isSuper) return '/superuser';
        if (isStaff) return '/admin';
        if (role === 'doctor') return '/doctor';
        if (role === 'operator') return '/operator';
        if (role === 'pharmacist') return '/pharmacist';
        if (isUser) return '/user-home-page';

        return '/';
    };

    const isUserHome = location.pathname === getHomePath();

    if (!isLoggedIn) return null;

    return (
        <div className={'navigation-nav'}>
            <nav className={'navigation'}>
                <ul>
                    {menu.map((item, index) => (
                        <React.Fragment key={index}>
                            <li>
                                <Link to={item.path}>{item.label}</Link>
                            </li>
                            {index < menu.length - 1 && <span className="nav-separator">|</span>}
                        </React.Fragment>
                    ))}
                </ul>
            </nav>
            <div className={'navigate-buttons'}>
                <button onClick={handleLogout}>LOGOUT</button>
                <button onClick={() => {
                    if (!isUserHome) navigate(-1);
                }}>
                    BACK
                </button>
                <button onClick={() => navigate(getHomePath())}>
                    HOME
                </button>
            </div>
        </div>
    );
};

export {NavigationComponent};








