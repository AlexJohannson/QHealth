import React from 'react';
import {HeaderComponent} from "../../components/HeaderComponent/HeaderComponent";
import './DoctorPage.css';
import {FooterComponent} from "../../components/FooterComponent/FooterComponent";

const DoctorPage = () => {
    return (
        <div className={'doctor-page'}>
            <HeaderComponent/>
            <div className={'doctor-page-information'}>
                <h1>Welcome back Doctor!</h1>
            </div>
            <FooterComponent/>
        </div>
    );
};

export {DoctorPage};