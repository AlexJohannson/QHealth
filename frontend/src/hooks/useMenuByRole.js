import { useMemo } from 'react';

const useMenuByRole = () => {
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');
  const isSuperuser = localStorage.getItem('is_superuser') === 'true';
  const isStaff = localStorage.getItem('is_staff') === 'true';
  const isUser = localStorage.getItem('is_user') === 'true';



  const menu = useMemo(() => {
    if (!userId) return [];

    const result = [];


    if (isSuperuser) {
      return [
          { label: 'Users', path: '/users' },
      ];
    }

    if (isStaff) {
      return [
        { label: 'Admin Panel', path: '/admin' },
        { label: 'User Management', path: '/users' },
      ];
    }


    if (isUser) {
      return [
        { label: 'My profile', path: `/users/${userId}` },

      ];
    }


    switch (role) {
      case 'doctor':
        return [
          { label: 'My Patients', path: '/doctor/patients' },
          { label: 'Schedule', path: '/doctor/schedule' },
        ];
      case 'operator':
        return [
          { label: 'Incoming Requests', path: '/operator/requests' },
          { label: 'Call Logs', path: '/operator/calls' },
        ];
      case 'pharmacist':
        return [
          { label: 'Prescriptions', path: '/pharmacist/prescriptions' },
          { label: 'Inventory', path: '/pharmacist/inventory' },
        ];
      default:
        return result;
    }
  }, [role, isSuperuser, isStaff, isUser, userId]);

  return menu;
};
export {useMenuByRole};