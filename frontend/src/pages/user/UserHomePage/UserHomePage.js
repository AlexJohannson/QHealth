import React from 'react';
import {HeaderComponent} from "../../../components/HeaderComponent/HeaderComponent";
import './UserHomePage.css';
import {FooterComponent} from "../../../components/FooterComponent/FooterComponent";


const UserHomePage = () => {
    return (
    <div className={'user-home-page'}>
        <HeaderComponent/>
        <div className={'user-home-page-information'}>
            <h1>Welcome back User!</h1>
        </div>
        <FooterComponent/>
    </div>
  );
};

export { UserHomePage };





