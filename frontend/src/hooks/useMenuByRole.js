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
                {label: 'Security List', path: '/security-list'},

            ];
        }

        if (isStaff) {
            return [
                {label: 'Users Cards', path: '/users'},
                {label: 'My profile', path: `/users/${userId}`},
                {label: 'Staff QHealth', path: '/roles'},
                {label: 'Staff Registration', path: '/staff-registration'},
                {label: 'Security List', path: '/security-list'},
            ];
        }

        switch (role) {
            case 'doctor':
                return [
                    {label: 'Users Cards', path: '/users'},
                    {label: 'My profile', path: `/users/${userId}`},
                    {label: 'Update My Profile', path: `users-update/${userId}`},
                    {label: 'My Staff QHealth Profile', path: `roles/${roleId}`},
                ];
            case 'operator':
                return [
                    {label: 'Users Cards', path: '/users'},
                    {label: 'My profile', path: `/users/${userId}`},
                    {label: 'Update My Profile', path: `users-update/${userId}`},
                    {label: 'Staff QHealth', path: '/roles'}
                ];
            case 'pharmacist':
                return [
                    {label: 'Users Cards', path: '/users'},
                    {label: 'My profile', path: `/users/${userId}`},
                    {label: 'Update My Profile', path: `users-update/${userId}`},
                    {label: 'My Staff QHealth Profile', path: `roles/${roleId}`},
                ];
            default:
                if (isUser) {
                    return [
                        {label: 'My profile', path: `/users/${userId}`},
                        {label: 'Update My Profile', path: `users-update/${userId}`}
                    ];
                }
                return [];
        }
    }, [role, isSuperuser, isStaff, isUser, userId, roleId]);

    return menu;
};
export {useMenuByRole};