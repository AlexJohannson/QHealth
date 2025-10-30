import React from 'react';
import {LoginFormComponent} from "../../components/LoginFormConponent/LoginFormComponent";
import './LoginPage.css';




const LoginPage = () => {
    return (
        <div className={'login-page'}>
            <LoginFormComponent/>
        </div>
    );
};

export {LoginPage};