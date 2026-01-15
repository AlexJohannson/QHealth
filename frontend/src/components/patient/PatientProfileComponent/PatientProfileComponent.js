import React from 'react';
import {Link} from "react-router-dom";
import './PatientProfileComponent.css';


/**
 * @param {{ patient: IUser }} props
 */

const PatientProfileComponent = ({patient}) => {
    const {profile} = patient;


    return (
        <Link className={'patient-profile-component-link'} to={`/patients-card/${patient.id}`}>
            <div className={'patient-profile-component-link-container'}>
                <div className={'patient-profile-component-link-items-id'}>
                    <h4>{patient.id}</h4>
                </div>
                <div className={'patient-profile-component-link-items'}>
                    <h4>Name:</h4>
                    <h2>{profile?.name || 'No name'}</h2>
                </div>
                <div className={'patient-profile-component-link-items'}>
                    <h4>Surname:</h4>
                    <h2>{profile?.surname || 'No Surname'}</h2>
                </div>
                <div className={'patient-profile-component-link-items'}>
                    <h4>Date of birth:</h4>
                    <h2>{profile?.date_of_birth || 'No Date Of Birth'}</h2>
                </div>
                <div className={'patient-profile-component-link-items'}>
                    <h4>Age:</h4>
                    <h2>{profile?.age || 'No Age'}</h2>
                </div>
                <div className={'patient-profile-component-link-items'}>
                    <h4>City:</h4>
                    <h2>{profile?.city || 'No City'}</h2>
                </div>
                <div className={'patient-profile-component-link-items'}>
                    <h4>Country:</h4>
                    <h2>{profile?.country || 'No Country'}</h2>
                </div>
                <div className={'patient-profile-component-link-items'}>
                    <h4>Gender:</h4>
                    <h2>{profile?.gender || 'No Gender'}</h2>
                </div>
            </div>
        </Link>
    );
};

export {PatientProfileComponent};