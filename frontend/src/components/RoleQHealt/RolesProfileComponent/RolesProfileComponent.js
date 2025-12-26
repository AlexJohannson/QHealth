import React from 'react';
import {Link} from "react-router-dom";
import './RoleProfileComponent.css';

/**
 * @param {{role : IUserWithRole}} props
 */

const RolesProfileComponent = ({role}) => {
    const {user} = role;
    const {profile} = user;



    return (
        <Link className={'role-profile-component-link'} to={`/roles/${role.id}`}>
            <div className="role-profile-container">
                <div className="role-profile-container-items">
                    <h4>Name:</h4>
                    <h2>{profile.name}</h2>
                </div>
                <div className="role-profile-container-items">
                    <h4>Surname:</h4>
                    <h2>{profile.surname}</h2>
                </div>
                <div className="role-profile-container-items">
                    <h4>Role:</h4>
                    <h2>{role?.role}</h2>
                </div>
                <div className="role-profile-container-items">
                    <h4>Specialty:</h4>
                    <h2>{role?.specialty || 'Only for doctor'}</h2>
                </div>
            </div>
        </Link>
    );
};

export {RolesProfileComponent};