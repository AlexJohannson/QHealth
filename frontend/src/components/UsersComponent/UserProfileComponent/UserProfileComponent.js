import React from 'react';
import {Link} from 'react-router-dom';
import './UserProfileComponent.css';


/**
 * @param {{ user: IUser }} props
 */
const UserProfileComponent = ({user}) => {
    const {profile} = user;

    return (

            <Link className={'link-user-profile-component'} to={`/users/${user.id}`}>
                <div className={'user-profile-container'}>
                    <div className={'user-profile-container-items'}>
                        <h4>Name:</h4>
                        <h2>{profile?.name || 'No Name'}</h2>
                    </div>
                    <div className={'user-profile-container-items'}>
                        <h4>Surname:</h4>
                        <h2>{profile?.surname || 'No Surname'}</h2>
                    </div>
                    <div className={'user-profile-container-items'}>
                        <h4>Date of birth:</h4>
                        <h2>{profile?.date_of_birth || 'No Date Of Birth'}</h2>
                    </div>
                    <div className={'user-profile-container-items'}>
                        <h4>Age:</h4>
                        <h2>{profile?.age || 'No Age'}</h2>
                    </div>
                    <div className={'user-profile-container-items'}>
                        <h4>City:</h4>
                        <h2>{profile?.city || 'No City'}</h2>
                    </div>
                    <div className={'user-profile-container-items'}>
                        <h4>Country:</h4>
                        <h2>{profile?.country || 'No Country'}</h2>
                    </div>
                    <div className={'user-profile-container-items'}>
                        <h4>Gender:</h4>
                        <h2>{profile?.gender || 'No Gender'}</h2>
                    </div>
                </div>
            </Link>

    );
};

export {UserProfileComponent};



