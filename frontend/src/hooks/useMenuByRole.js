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
                {label: 'Accounts', path: '/users'},
                {label: 'Staff', path: '/roles'},
                {label: 'Staff Registration', path: '/staff-registration'},
                {label: 'Patients', path: '/patients-card'},
                {label: 'Diagnostics', path: '/diagnostics-list'},
                {label: 'Booking Diagnostics', path: '/booking-diagnostic'},
                {label: 'Booking Doctors', path: '/booking-doctor'},
                {label: 'Journal', path: '/patient-journal'},
                {label: 'Recipes', path: '/patient-recipe'},
                {label: 'Sick Leaves', path: '/sick-leaves'},
                {label: 'Security', path: '/security-list'},
            ];
        }

        if (isStaff) {
            return [
                {label: 'Accounts', path: '/users'},
                {label: 'Staff', path: '/roles'},
                {label: 'Staff Registration', path: '/staff-registration'},
                {label: 'Patients', path: '/patients-card'},
                {label: 'Diagnostics', path: '/diagnostics-list'},
                {label: 'Booking Diagnostics', path: '/booking-diagnostic'},
                {label: 'Booking Doctors', path: '/booking-doctor'},
                {label: 'Journal', path: '/patient-journal'},
                {label: 'Recipes', path: '/patient-recipe'},
                {label: 'Sick Leaves', path: '/sick-leaves'},
                {label: 'Security', path: '/security-list'},
            ];
        }

        switch (role) {
            case 'doctor':
                return [
                    {label: 'Patients', path: '/patients-card'},
                    {label: 'Update Profile', path: `/users-update/${userId}`},
                    {label: 'Profile', path: `/roles/${roleId}`},
                    {label: 'Diagnostics', path: '/diagnostics-list'},
                    {label: 'Booking Diagnostics', path: '/booking-diagnostic'},
                    {label: 'Booking Doctors', path: '/booking-doctor'},
                    {label: 'Journal', path: '/patient-journal'},
                    {label: 'Recipes', path: '/patient-recipe'},
                    {label: 'Sick Leaves', path: '/sick-leaves'},
                ];
            case 'operator':
                return [
                    {label: 'Patients', path: '/patients-card'},
                    {label: 'Update Profile', path: `/users-update/${userId}`},
                    {label: 'Staff', path: '/roles'},
                    {label: 'Diagnostics', path: '/diagnostics-list'},
                    {label: 'Booking Diagnostics', path: '/booking-diagnostic'},
                    {label: 'Booking Doctors', path: '/booking-doctor'},
                    {label: 'Journal', path: '/patient-journal'},
                    {label: 'Recipes', path: '/patient-recipe'},
                    {label: 'Sick Leaves', path: '/sick-leaves'},
                ];
            case 'pharmacist':
                return [
                    {label: 'Patients', path: '/patients-card'},
                    {label: 'Update Profile', path: `/users-update/${userId}`},
                    {label: 'Profile', path: `/roles/${roleId}`},
                    {label: 'Diagnostics', path: '/diagnostics-list'},
                    {label: 'Recipes', path: '/patient-recipe'},
                ];
            default:
                if (isUser) {
                    return [
                        {label: 'Profile', path: `/patients-card/${userId}`},
                        {label: 'Update Profile', path: `/users-update/${userId}`},
                        {label: 'Diagnostics', path: '/diagnostics'},
                        {label: 'Booking Diagnostics', path: '/booking-diagnostic'},
                        {label: 'Booking Doctors', path: '/booking-doctor'},
                        {label: 'Journal', path: '/patient-journal'},
                        {label: 'Recipes', path: '/patient-recipe'},
                        {label: 'Sick Leaves', path: '/sick-leaves'},
                    ];
                }
                return [];
        }
    }, [role, isSuperuser, isStaff, isUser, userId, roleId]);

    return menu;
};
export {useMenuByRole};