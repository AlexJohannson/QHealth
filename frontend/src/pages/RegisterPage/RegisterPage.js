import React from 'react';
import {RegistrationFormComponent} from "../../components/RegistrationFormComponent/RegistrationFormComponent";
import './RegisterPage.css';

const RegisterPage = () => {
    return (
        <div className="register-page">
            <RegistrationFormComponent/>
        </div>
    );
};

export {RegisterPage};