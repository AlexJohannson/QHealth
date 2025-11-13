import React from 'react';
import {Link} from "react-router-dom";
import './PatientProfileComponent.css';


/**
 * @param {{ patient: IUser }} props
 */

const PatientProfileComponent = ({patient}) => {
    const { profile } = patient;



    return (
        <div>
            <Link className={'patient-profile-component-link'} to={`/patients-card/${patient.id}`}>
                <h2>{profile?.name || 'No name'} {profile?.surname || ''}</h2>
            </Link>
        </div>
    );
};

export {PatientProfileComponent};