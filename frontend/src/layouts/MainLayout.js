import React from 'react';
import {Outlet} from "react-router-dom";
import {HeaderComponent} from "../components/HeaderComponent/HeaderComponent";

const MainLayout = () => {
    return (
        <div>
            <HeaderComponent/>
            <hr/>
            <Outlet/>
        </div>
    );
};

export {MainLayout};