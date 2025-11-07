import React from 'react';
import {Link} from 'react-router-dom';
import './UserProfileComponent.css';


/**
 * @param {{ user: IUser }} props
 */
const UserProfileComponent = ({user}) => {
    const {profile} = user;

    return (
        <div>
            <Link className={'link-user-profile-component'} to={`/users/${user.id}`}>
                <h2>{profile?.name || 'No name'} {profile?.surname || ''}</h2>
            </Link>
        </div>
    );
};

export {UserProfileComponent};



