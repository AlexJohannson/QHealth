import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {UserEditFormComponent} from "../../../components/UsersComponent/UserEditRormComponent/UserEditFormComponent";

const UserEditFormPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const currentUserId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const isSuperuser = localStorage.getItem('is_superuser') === 'true';
    const isStaff = localStorage.getItem('is_staff') === 'true';

    const canEdit = isSuperuser || isStaff || currentUserId === id ||
        ['doctor', 'operator', 'pharmacist'].includes(role) && currentUserId === id;


    const handleDeleteRedirect = () => {
        if (isSuperuser || isStaff) {
            navigate(-2);
        } else {
            localStorage.clear();
            navigate('/login');
        }

    };


    return (
        <div>
            <UserEditFormComponent userId={id} canEdit={canEdit} role={role} onDelete={handleDeleteRedirect}/>
        </div>
    );
};

export {UserEditFormPage};