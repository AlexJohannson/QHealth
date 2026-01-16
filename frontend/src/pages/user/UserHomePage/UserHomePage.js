import React from 'react';
import './UserHomePage.css';


const UserHomePage = () => {
    return (
        <div className={'user-home-page'}>
            <div className={'user-home-page-information'}>
                <h3>QHealth Clinic is a modern medical center that combines digital technologies with evidence-based
                    healthcare. We are designed to provide patients with fast access to high-quality care, convenient
                    appointment management, and transparent communication with medical staff.
                    Our clinic operates on a digital-first principle: every process - from registration to maintaining
                    medical records - is optimized for maximum efficiency and security. We support healthcare
                    professionals in their daily work by offering tools for precise planning, analytics, and patient
                    interaction.
                </h3>
                <h3>This is the Patient dashboard of the clinic.</h3>
            </div>
            <div className={'clinic-photo-patient-page'}>
                <img src={'/img/photo-clinik.png'} alt="clinic-photo" className={'clinic-photo-patient'} />
            </div>
        </div>
    );
};

export {UserHomePage};





