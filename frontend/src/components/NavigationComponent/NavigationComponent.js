import React, { useState, useEffect } from 'react';
import { useMenuByRole } from '../../hooks/useMenuByRole';
import { useNavigate } from 'react-router-dom';

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
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');

    setIsLoggedIn(false);
    navigate('/');
  };

  if (!isLoggedIn || !menu.length) return null;

  return (
    <div>
      <nav>
        <ul>
          {menu.map((item, index) => (
            <li key={index}>
              <a href={item.path}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
};

export { NavigationComponent };







