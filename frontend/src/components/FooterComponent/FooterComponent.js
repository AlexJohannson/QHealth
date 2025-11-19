import React from 'react';
import './FooterComponent.css';

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
                <a  className={'swagger'} href="http://localhost/api/doc" target="_blank" rel="noopener noreferrer">
                     Swagger
                </a>
                <p>tel: +00 00 000-00 00</p>
                <p>email: qhealth@exampl.com</p>
            </div>
        </div>
    );
};

export {FooterComponent};