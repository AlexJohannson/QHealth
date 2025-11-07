import React from 'react';
import {HeaderComponent} from "../../components/HeaderComponent/HeaderComponent";
import './AdminPage.css';
import {FooterComponent} from "../../components/FooterComponent/FooterComponent";

const AdminPage = () => {
    return (
        <div className="admin-page-container">
            <HeaderComponent/>
            <div className="admin-page-information">
                <h1>Welcome back Admin!</h1>
            </div>
            <FooterComponent/>
        </div>
    );
};

export {AdminPage};