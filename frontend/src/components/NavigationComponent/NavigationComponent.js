import React, {useState, useEffect} from 'react';
import {useMenuByRole} from '../../hooks/useMenuByRole';
import {Link, useNavigate} from 'react-router-dom';
import './NavigationComponent.css';

const NavigationComponent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const menu = useMenuByRole();
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        setIsLoggedIn(!!userId);

        const handleStorageChange = () => {
            const userId = localStorage.getItem('userId');
            setIsLoggedIn(!!userId);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
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

    if (!isLoggedIn || !menu.length) return null;

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
            <div>
                <button onClick={handleLogout}>LOGOUT</button>
            </div>
        </div>
    );
};

export {NavigationComponent};







