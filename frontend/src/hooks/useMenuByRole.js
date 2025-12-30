import {useMemo} from 'react';

const useMenuByRole = () => {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const roleId = localStorage.getItem('roleId');
    const isSuperuser = localStorage.getItem('is_superuser') === 'true';
    const isStaff = localStorage.getItem('is_staff') === 'true';
    const isUser = localStorage.getItem('is_user') === 'true';


    const menu = useMemo(() => {
        if (!userId) return [];


        if (isSuperuser) {
            return [
                {label: 'Users Cards', path: '/users'},
                {label: 'Staff QHealth', path: '/roles'},
                {label: 'Staff Registration', path: '/staff-registration'},
                {label: 'Patients Cards', path: '/patients-card'},
                {label: 'Diagnostics List', path: '/diagnostics-list'},
                {label: 'Booking Diagnostics', path: '/booking-diagnostic'},
                {label: 'Booking Doctors List', path: '/booking-doctor'},
                {label: 'Journal', path: '/patient-journal'},
                {label: 'Patient Recipes', path: '/patient-recipe'},
                {label: 'Sick Leaves', path: '/sick-leaves'},
                {label: 'Security List', path: '/security-list'},
            ];
        }

        if (isStaff) {
            return [
                {label: 'Users Cards', path: '/users'},
                {label: 'Staff QHealth', path: '/roles'},
                {label: 'Staff Registration', path: '/staff-registration'},
                {label: 'Patients Cards', path: '/patients-card'},
                {label: 'Diagnostics List', path: '/diagnostics-list'},
                {label: 'Booking Diagnostics', path: '/booking-diagnostic'},
                {label: 'Booking Doctors List', path: '/booking-doctor'},
                {label: 'Journal', path: '/patient-journal'},
                {label: 'Patient Recipes', path: '/patient-recipe'},
                {label: 'Sick Leaves', path: '/sick-leaves'},
                {label: 'Security List', path: '/security-list'},
            ];
        }

        switch (role) {
            case 'doctor':
                return [
                    {label: 'Patients Cards', path: '/patients-card'},
                    {label: 'Update My Profile', path: `/users-update/${userId}`},
                    {label: 'My Staff QHealth Profile', path: `/roles/${roleId}`},
                    {label: 'Diagnostics List', path: '/diagnostics-list'},
                    {label: 'Booking Diagnostics', path: '/booking-diagnostic'},
                    {label: 'Booking Doctors List', path: '/booking-doctor'},
                    {label: 'Journal', path: '/patient-journal'},
                    {label: 'Patient Recipes', path: '/patient-recipe'},
                    {label: 'Sick Leaves', path: '/sick-leaves'},
                ];
            case 'operator':
                return [
                    {label: 'Patients Cards', path: '/patients-card'},
                    {label: 'Update My Profile', path: `/users-update/${userId}`},
                    {label: 'Staff QHealth', path: '/roles'},
                    {label: 'Diagnostics List', path: '/diagnostics-list'},
                    {label: 'Booking Diagnostics', path: '/booking-diagnostic'},
                    {label: 'Booking Doctors List', path: '/booking-doctor'},
                    {label: 'Journal', path: '/patient-journal'},
                    {label: 'Patient Recipes', path: '/patient-recipe'},
                    {label: 'Sick Leaves', path: '/sick-leaves'},
                ];
            case 'pharmacist':
                return [
                    {label: 'Patients Cards', path: '/patients-card'},
                    {label: 'Update My Profile', path: `/users-update/${userId}`},
                    {label: 'My Staff QHealth Profile', path: `/roles/${roleId}`},
                    {label: 'Diagnostics List', path: '/diagnostics-list'},
                    {label: 'Patient Recipes', path: '/patient-recipe'},
                ];
            default:
                if (isUser) {
                    return [
                        {label: 'My card', path: `/patients-card/${userId}`},
                        {label: 'Update My Profile', path: `/users-update/${userId}`},
                        {label: 'Diagnostics', path: '/diagnostics'},
                        {label: 'Booking Diagnostics', path: '/booking-diagnostic'},
                        {label: 'Booking Doctors List', path: '/booking-doctor'},
                        {label: 'Journal', path: '/patient-journal'},
                        {label: 'My Recipes', path: '/patient-recipe'},
                        {label: 'My Sick Leaves', path: '/sick-leaves'},
                    ];
                }
                return [];
        }
    }, [role, isSuperuser, isStaff, isUser, userId, roleId]);

    return menu;
};
export {useMenuByRole};