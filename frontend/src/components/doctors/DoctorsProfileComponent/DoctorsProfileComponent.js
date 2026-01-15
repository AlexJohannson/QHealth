import React from 'react';
import {Link} from "react-router-dom";
import './DoctorsProfileComponent.css';


/**
 * @param {{doctor : IUserWithRole}} props
 */

const DoctorsProfileComponent = ({doctor, patientId}) => {
    const {user} = doctor;
    const {profile} = user;


    return (
        <Link className={'doctors-profile-component'}
              to={`/doctors/${doctor.id}?patientId=${patientId}&userId=${user.id}`}>
            <div className="doctors-profile-container-link">
                <div className={'doctors-profile-container-item-id'}>
                    <h4>{user.id}</h4>
                </div>
                <div className="doctors-profile-container-items">
                    <h4>Name:</h4>
                    <h2>{profile.name}</h2>
                </div>
                <div className="doctors-profile-container-items">
                    <h4>Surname:</h4>
                    <h2>{profile.surname}</h2>
                </div>
                <div className="doctors-profile-container-items">
                    <h4>Specialty:</h4>
                    <h2>{doctor?.specialty}</h2>
                </div>
            </div>
        </Link>
    );
};

export {DoctorsProfileComponent};