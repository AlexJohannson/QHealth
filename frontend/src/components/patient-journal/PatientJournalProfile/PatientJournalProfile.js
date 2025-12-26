import React from 'react';
import './PatientJournalProfile.css';
import {Link} from "react-router-dom";

/**
 * @param {{journal : IJournal}} props
 */
const PatientJournalProfile = ({journal}) => {
    const userProfile = journal?.user.profile;


    return (
        <Link className={'patient-journal-profile'} to={`/patient-journal/${journal.id}`}>
            <div className={'patient-journal-profile-container'}>
                <div className={'patient-journal-profile-container-items'}>
                    <h4>Patient Name:</h4>
                    <h2>{userProfile.name}</h2>
                </div>
                <div className={'patient-journal-profile-container-items'}>
                    <h4>Patient Surname:</h4>
                    <h2>{userProfile.surname}</h2>
                </div>
                <div className={'patient-journal-profile-container-items'}>
                    <h4>Diagnosis:</h4>
                    <h2>{journal.diagnosis}</h2>
                </div>
            </div>
        </Link>
    );
};

export {PatientJournalProfile};