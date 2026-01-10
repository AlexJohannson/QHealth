import React from 'react';
import './HeaderComponemt.css';
import {Link, useLocation} from "react-router-dom";


const HeaderComponent = () => {
    const location = useLocation();

    const isHomePage = location.pathname === "/"


    return (
        <div className="header-component-page">
            <div className={'header-component-header'}>
                <img src={'/img/logo.png'} className={'logo-header-page'} alt="Logo"/>
                <h1>QHealth</h1>
                {isHomePage && (
                    <Link className="login-button" to="/login">
                        <img src="/img/log-in.png" alt="login icon" className="login-icon"/>
                    </Link>
                )}
            </div>
        </div>
    );
};

export {HeaderComponent};

