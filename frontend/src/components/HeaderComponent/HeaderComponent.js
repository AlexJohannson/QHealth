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
                    <button className={'login-button'}>
                        <Link className={'login-link'} to="/login">LOGIN</Link>
                    </button>
                )}
            </div>
        </div>
    );
};

export {HeaderComponent};

