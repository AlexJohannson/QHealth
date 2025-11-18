import React from 'react';
import './PatientJournalProfile.css';
import {Link} from "react-router-dom";

/**
 * @param {{journal : IJournal}} props
 */
const PatientJournalProfile = ({journal}) => {


    return (
        <div>
            <Link className={'patient-journal-profile'} to={`/patient-journal/${journal.id}`}>
                <h3>{journal.diagnosis}</h3>
            </Link>
        </div>
    );
};

export {PatientJournalProfile};