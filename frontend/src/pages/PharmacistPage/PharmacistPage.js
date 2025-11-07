import React from 'react';
import './PharmacistPage.css';
import {HeaderComponent} from "../../components/HeaderComponent/HeaderComponent";
import {FooterComponent} from "../../components/FooterComponent/FooterComponent";

const PharmacistPage = () => {
    return (
        <div className={'pharmacist-page'}>
            <HeaderComponent/>
            <div className="pharmacist-page-information">
                <h1>Welcome back Pharmacist!</h1>
            </div>
            <FooterComponent/>
        </div>
    );
};

export {PharmacistPage};