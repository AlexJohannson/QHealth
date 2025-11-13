import React from 'react';
import {Link} from "react-router-dom";
import './RoleProfileComponent.css';

/**
 * @param {{role : IUserWithRole}} props
 */

const RolesProfileComponent = ({role}) => {
    const { user } = role;
    const { profile } = user;

    
    
    return (
        <div>
            <Link className={'role-profile-component-link'} to={`/roles/${role.id}`}>
                <h2>{profile.name} {profile.surname}</h2>
            </Link>
        </div>
    );
};

export {RolesProfileComponent};