import React from 'react';
import {Link} from "react-router-dom";
import './SickLeavesProfile.css';


/**
 * @param {{sick : ISick}} props
 */

const SickLeavesProfile = ({sick}) => {
    const userProfile = sick.user?.profile;


    return (
        <Link className={'sick-leaves-profile-link'} to={`/sick-leaves/${sick.id}`}>
            <div className="sick-leaves-profile-link-container">
                <div className="sick-leaves-profile-link-container-items-id">
                    <h4>{sick.id}</h4>
                </div>
                <div className="sick-leaves-profile-link-container-items">
                    <h4>Patient Name:</h4>
                    <h2>{userProfile ? `${userProfile.name}` : 'Unknow patient'}</h2>
                </div>
                <div className="sick-leaves-profile-link-container-items">
                    <h4>Patient Surname:</h4>
                    <h2>{userProfile ? `${userProfile.surname}` : 'Unknow patient'}</h2>
                </div>
                <div className="sick-leaves-profile-link-container-items">
                    <h4>Diagnosis:</h4>
                    <h2>{sick.diagnosis}</h2>
                </div>
            </div>
        </Link>
    );
};

export {
    SickLeavesProfile
};