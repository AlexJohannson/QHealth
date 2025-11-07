import {useMemo} from 'react';

const useMenuByRole = () => {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const isSuperuser = localStorage.getItem('is_superuser') === 'true';
    const isStaff = localStorage.getItem('is_staff') === 'true';
    const isUser = localStorage.getItem('is_user') === 'true';


    const menu = useMemo(() => {
        if (!userId) return [];


        if (isSuperuser) {
            return [
                {label: 'Users Cards', path: '/users'},

            ];
        }

        if (isStaff) {
            return [
                {label: 'Users Cards', path: '/users'},
                {label: 'My profile', path: `/users/${userId}`}
            ];
        }

        switch (role) {
            case 'doctor':
                return [
                    {label: 'Users Cards', path: '/users'},
                    {label: 'My profile', path: `/users/${userId}`},
                    {label: 'Update My Profile', path: `users-update/${userId}`}
                ];
            case 'operator':
                return [
                    {label: 'Users Cards', path: '/users'},
                    {label: 'My profile', path: `/users/${userId}`},
                    {label: 'Update My Profile', path: `users-update/${userId}`}
                ];
            case 'pharmacist':
                return [
                    {label: 'Users Cards', path: '/users'},
                    {label: 'My profile', path: `/users/${userId}`},
                    {label: 'Update My Profile', path: `users-update/${userId}`}
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
    }, [role, isSuperuser, isStaff, isUser, userId]);

    return menu;
};
export {useMenuByRole};