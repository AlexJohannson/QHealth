import React from 'react';
import {Outlet} from "react-router-dom";
import './MainLayout.css';


const MainLayout = () => {
    return (
        <div className={'wrapper'}>
            <Outlet/>
        </div>
    );
};

export {MainLayout};

