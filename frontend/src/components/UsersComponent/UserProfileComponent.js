import React from 'react';
import {Link} from 'react-router-dom';

/**
 * @param {{ user: IUser }} props
 */
const UserProfileComponent = ({ user }) => {
  const {profile} = user;

  return (
    <div>
      <Link to={`/users/${user.id}`}>
        <h2>{profile?.name || 'No name'} {profile?.surname || ''}</h2>
      </Link>
    </div>
  );
};

export {UserProfileComponent};



