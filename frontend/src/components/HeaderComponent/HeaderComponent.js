import React from 'react';
import {NavigationComponent} from "../NavigationComponent/NavigationComponent";
import './HeaderComponemt.css';


const HeaderComponent = () => {


    return (
        <div className="header-component-page">
            <div className={'header-component-header'}>
                <img src={'/img/logo.png'} className={'logo-header-page'} alt="Logo"/>
                <h1>QHealth</h1>
            </div>
            <div className={'header-component-navigation'}>
                <NavigationComponent/>
            </div>
        </div>
    );
};

export {HeaderComponent};
