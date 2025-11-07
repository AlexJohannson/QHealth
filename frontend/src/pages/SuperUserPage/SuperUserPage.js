import React from 'react';
import {HeaderComponent} from "../../components/HeaderComponent/HeaderComponent";
import './SuperUserPage.css';
import {FooterComponent} from "../../components/FooterComponent/FooterComponent";


const SuperUserPage = () => {
    return (
        <div className="super-user-page">
            <HeaderComponent/>
            <div className="super-user-information">
                <h1>Welcome back Super User!</h1>
            </div>
            <FooterComponent/>
        </div>
    );
};

export {SuperUserPage};