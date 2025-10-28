import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {userService} from '../../services/userService';

const UserDetailsComponent = () => {
  const {id} = useParams();
   const userId = id || localStorage.getItem('userId');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userService.getById(userId);
        setUser(res.data);
      } catch (e) {
        console.error('Failed to fetch user:', e);
        setError('User not found');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);


  if (loading) return <p>Loading user...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return null;

  const { email, profile } = user;

  const getNameStyle = () => {
    if (user.is_superuser) return { color: '#d32f2f', fontWeight: 'bold' };
    if (user.is_staff) return { color: '#1976d2', fontWeight: 'bold' };
    return {};
  };

  return (
    <div>
      <h3 style={getNameStyle()}>
        {profile?.name || 'No name'} {profile?.surname || ''}
      </h3>
      <p><strong>UserID:</strong> {user.id}</p>
      <p>Email: {email}</p>
      <p>Active: {user.is_active ? 'Yes' : 'No'}</p>

      {profile ? (
        <>
          <p>Phone Number: {profile.phone_number}</p>
          <p>Date of birth: {profile.date_of_birth}</p>
          <p>Height: {profile.height}</p>
          <p>Weight: {profile.weight}</p>
          <p>Street: {profile.street}</p>
          <p>House: {profile.house}</p>
          <p>City: {profile.city}</p>
          <p>Region: {profile.region}</p>
          <p>Country: {profile.country}</p>
          <p>Gender: {profile.gender}</p>
          <p>Create: {profile.created_at}</p>
          <p>Update: {profile.updated_at}</p>
        </>
      ) : (
        <p style={{ color: 'gray' }}>No profile data available</p>
      )}
    </div>
  );
};

export {UserDetailsComponent};