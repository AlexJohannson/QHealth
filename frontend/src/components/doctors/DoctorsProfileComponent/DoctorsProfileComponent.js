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
        <div>
            <Link className={'doctors-profile-component'}
                  to={`/doctors/${doctor.id}?patientId=${patientId}&userId=${user.id}`}>
                <h2>{profile.name} {profile.surname}</h2>
            </Link>
        </div>
    );
};

export {DoctorsProfileComponent};