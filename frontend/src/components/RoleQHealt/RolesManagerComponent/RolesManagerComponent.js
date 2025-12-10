import React from 'react';
import {roleService} from "../../../services/roleService";
import './RoleManagerComponent.css';

const RolesManagerComponent = ({role, onUpdate}) => {


    const handleBlockToggleDoctor = async () => {
        try {
            if (role.is_available_for_booking) {
                await roleService.blockRoleDoctor(role.id);
            } else {
                await roleService.unblockRoleDoctor(role.id);
            }
            onUpdate();
        } catch (err) {
            console.error('Block/unblock error', err);
        }
    }

    return (
        <div className={'role-manager-component'}>
            <button onClick={handleBlockToggleDoctor}>
                {role.is_available_for_booking ? 'Block' : 'Unblock'}
            </button>
        </div>
    );
};

export {RolesManagerComponent};