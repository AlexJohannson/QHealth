import React from 'react';
import {HeaderComponent} from "../../components/HeaderComponent/HeaderComponent";
import './OperatorPage.css';
import {FooterComponent} from "../../components/FooterComponent/FooterComponent";

const OperatorPage = () => {
    return (
        <div className="operator-page">
            <HeaderComponent/>
            <div className={'operator-page-information'}>
                <h1>Welcome back Operator!</h1>
            </div>
            <FooterComponent/>
        </div>
    );
};

export {OperatorPage};