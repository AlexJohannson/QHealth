import React from 'react';
import './PharmacistPage.css';


const PharmacistPage = () => {
    return (
        <div className={'pharmacist-page'}>
            <div className="pharmacist-page-information">
                <h3>QHealth Clinic is a modern medical center that combines digital technologies with evidence-based
                    healthcare. We are designed to provide patients with fast access to high-quality care, convenient
                    appointment management, and transparent communication with medical staff.
                    Our clinic operates on a digital-first principle: every process - from registration to maintaining
                    medical records - is optimized for maximum efficiency and security. We support healthcare
                    professionals in their daily work by offering tools for precise planning, analytics, and patient
                    interaction.
                </h3>
                <h3>This is the Pharmacist dashboard of the clinic.</h3>
            </div>
            <div className={'clinic-photo-pharmacist-page'}>
                <img src={'/img/photo-clinik.png'} alt="clinic-photo" className={'clinic-photo-pharmacist'} />
            </div>
        </div>
    );
};

export {PharmacistPage};