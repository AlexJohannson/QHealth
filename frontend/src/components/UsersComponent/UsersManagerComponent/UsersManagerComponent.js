import React from 'react';
import {userService} from "../../../services/userService";
import './UserManagerComponent.css';



const UsersManagerComponent = ({user, onUpdate}) => {



  const handleBlockToggle = async () => {
    try {
      if (user.is_active) {
        await userService.blockUser(user.id);
      } else {
        await userService.unblockUser(user.id);
      }
      onUpdate();
    } catch (err) {
      console.error('Block/unblock error:', err);
    }
  };

  const handleAdminToggle = async () => {
    try {
      if (user.is_staff) {
        await userService.revokeAdmin(user.id);
      } else {
        await userService.userToAdmin(user.id);
      }
      onUpdate();
    } catch (err) {
      console.error('Admin toggle error:', err);
    }
  };

  return (
    <div className="user-manager-component">
      <button onClick={handleBlockToggle}>
        {user.is_active ? 'Block' : 'Unblock'}
      </button>
      <button onClick={handleAdminToggle}>
        {user.is_staff ? 'Revoke Admin' : 'Make Admin'}
      </button>
    </div>
  );
};

export {UsersManagerComponent};