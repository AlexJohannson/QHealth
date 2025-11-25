import React from 'react';
import {userService} from "../../../services/userService";
import './UserManagerComponent.css';


const UsersManagerComponent = ({user, onUpdate}) => {

    const handleBlockToggle = async () => {
        try {
            const updatedUser = user.is_active
                ? await userService.blockUser(user.id)
                : await userService.unblockUser(user.id);

            onUpdate(updatedUser);
        } catch (err) {
            console.error('Block/unblock error:', err);
        }
    };


    const handleAdminToggle = async () => {
        try {
            const updatedUser = user.is_staff
                ? await userService.revokeAdmin(user.id)
                : await userService.userToAdmin(user.id);

            onUpdate(updatedUser);
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