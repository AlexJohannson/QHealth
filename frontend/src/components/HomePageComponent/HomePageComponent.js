import React from 'react';
import './HomePageComponent.css';


const HomePageComponent = () => {
    return (
        <div className={'home-page'}>
            <div className={'home-page-content'}>
                <h2 className={'home-page-content-h2'}>QHealth — A Private Clinic of the Future</h2>
                <h4>QHealth is a modern medical facility designed for those who value quality, speed, and compassion in
                    healthcare. We combine physical presence with digital solutions to ensure every patient receives
                    care in the way that suits them best — whether in person or online.</h4>
                <div className={'about-us-offer'}>
                    <div className={'about-us-offer-block'}>
                    <h2 className={'about-us-offer-block-h2'}>What We Offer:</h2>
                    <ul>
                        <li>A full range of medical services</li>
                        <li>Online consultations with doctors across all specialties</li>
                        <li>Easy booking for diagnostics and in-person appointments via app or website</li>
                        <li>Secure electronic medical records with patient access</li>
                        <li>Highly qualified staff focused on both health and comfort</li>
                    </ul>
                    </div>
                    <img src={'/img/qhealth-one.png'} className={'qhealt-one'} alt="QHealth One"/>
                </div>
                <div className={'about-us-values'}>
                    <img src={'/img/qhealth-two.png'} className={'qhealth-two'} alt="QHealth Two"/>
                    <div className={'about-us-value-block'}>
                    <h2>Our Core Values:</h2>
                    <ul>
                        <li><strong>Accessibility —</strong> healthcare should be simple and understandable</li>
                        <li><strong>Compassion —</strong> we listen, support, and never leave you alone</li>
                        <li><strong>Precision —</strong> every diagnosis and decision is based on facts</li>
                        <li><strong>Innovation —</strong> we implement technologies that truly improve lives</li>
                        <li><strong>Trust —</strong> we build long-term relationships with our patients</li>
                    </ul>
                    </div>
                </div>
                <div className={'about-us-slogan'}>
                    <h2>QHealth is more than a clinic. It’s a place where health becomes a partnership.</h2>
                </div>
            </div>
        </div>
    );
};




export {HomePageComponent};