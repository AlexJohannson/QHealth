import React, {useState, useEffect} from 'react';
import {useMenuByRole} from '../../hooks/useMenuByRole';
import {useNavigate, NavLink} from 'react-router-dom';
import './NavigationComponent.css';

const NavigationComponent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const menu = useMenuByRole();
    const navigate = useNavigate();


    useEffect(() => {
        const checkAuth = () => {
            const userId = localStorage.getItem('userId');
            const storedName = localStorage.getItem('username');

            setIsLoggedIn(!!userId);
            setUsername(storedName || '');
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
        localStorage.removeItem('username');


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


    if (!isLoggedIn) return null;

    return (
        <div className={'navigation-nav'}>
            <nav className={'navigation'}>
                <ul>
                    {menu.map((item, index) => (
                        <React.Fragment key={index}>
                            <li>
                                <NavLink
                                    to={item.path}
                                    className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                            {index < menu.length - 1 && <span className="nav-separator">|</span>}
                        </React.Fragment>
                    ))}
                </ul>
            </nav>
            <div className={'navigate-buttons'}>
                <button onClick={handleLogout}>
                    <img src={'/img/logout.png'} alt="logout icon" className="navigation-icon"/>
                </button>
                <button onClick={() => navigate(getHomePath())}>
                    <img src={'/img/home.png'} alt="home icon" className="navigation-icon"/>
                </button>
            </div>
            <div className={'navigate-username'}>
                <span className="username">Hello, {username}</span>
            </div>
        </div>
    );
};

export {NavigationComponent};








