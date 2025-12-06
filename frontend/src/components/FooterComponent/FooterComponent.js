import React from 'react';
import './FooterComponent.css';
import {Link} from "react-router-dom";

const FooterComponent = () => {
    return (
        <div className={'footer-component'}>
            <div className={'footer-img'}>
                <img src={'/img/logo.png'} className={'footer-img'} alt={'Logo'}/>
            </div>
            <div className={'footer-dev-information'}>
                <p>QHealth</p>
                <p>Developed by Oleksandr Mekhed</p>
                <p>© Copyright 2025</p>
            </div>
            <div className={'footer-contact'}>
                <Link  className={'swagger'} to="http://localhost/api/doc" target="_blank" rel="noopener noreferrer">
                     Swagger
                </Link>
                <p>tel: +00 00 000-00 00</p>
                <p>email: qhealth@exampl.com</p>
            </div>
        </div>
    );
};

export {FooterComponent};