import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {userService} from "../../../services/userService";
import {UsersManagerComponent} from "../UsersManagerComponent/UsersManagerComponent";
import './UserDetailsComponent.css';
import {formatDate} from "../../../untils/formatDate";


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
                setError('User not found');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);


    const canUpdateProfile = () => {
        const staffRole = localStorage.getItem('role');
        const superUser = localStorage.getItem('is_superuser') === 'true';
        const staffAdmin = localStorage.getItem('is_staff') === 'true';
        const isUser = localStorage.getItem('is_user') === 'true';

        const isPlainUser = isUser && !superUser && !staffAdmin;


        if (superUser || staffAdmin) return true;
        if (staffRole === 'doctor' || staffRole === 'operator') return false;
        if (isPlainUser) return false;
        return false;
    };



    if (loading) return (
        <div className="user-profile-skeleton">
            <div className="user-profile-skeleton-avatar"></div>
            <div className="user-profile-skeleton-line short"></div>
            <div className="user-profile-skeleton-line long"></div>
            <div className="user-profile-skeleton-line long"></div>
        </div>
    );

    if (error) return <p style={{color: 'red'}}>{error}</p>;
    if (!user) return null;
    const isTargetSuperuser = user?.is_superuser === true;
    const isTargetAdmin = user?.is_staff === true;
    const currentIsSuperuser = localStorage.getItem('is_superuser') === 'true';
    const currentIsAdmin = localStorage.getItem('is_staff') === 'true';


    const {email, profile} = user;

    const getNameStyle = () => {
        if (user.is_superuser) return {color: '#d32f2f', fontWeight: 'bold'};
        if (user.is_staff) return {color: '#1976d2', fontWeight: 'bold'};
        return {};
    };


    const showButtons =
        canUpdateProfile() &&
        (
            (!isTargetSuperuser && !(currentIsAdmin && isTargetAdmin)) ||
            (currentIsSuperuser && isTargetAdmin)
        ) &&
        !(currentIsSuperuser && isTargetSuperuser);


    return (
        <div className={'user-details-container'}>
            <div className={'user-details-container-profile'}>
                <h3 style={getNameStyle()}>
                    {profile?.name || 'No name'} {profile?.surname || ''}
                </h3>
                <p><strong>Number:</strong> {user.id}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Active:</strong> {user.is_active ? 'Yes' : 'No'}</p>

                {profile ? (
                    <>
                        <p><strong>Phone Number:</strong> {profile.phone_number}</p>
                        <p><strong>Date of birth:</strong> {profile.date_of_birth}</p>
                        <p><strong>Height:</strong> {profile.height}</p>
                        <p><strong>Weight:</strong> {profile.weight}</p>
                        <p><strong>Street:</strong> {profile.street}</p>
                        <p><strong>House:</strong> {profile.house}</p>
                        <p><strong>City:</strong> {profile.city}</p>
                        <p><strong>Region:</strong> {profile.region}</p>
                        <p><strong>Country:</strong> {profile.country}</p>
                        <p><strong>Gender:</strong> {profile.gender}</p>
                        <p><strong>Create:</strong> {formatDate(profile.created_at)}</p>
                        <p><strong>Update:</strong> {formatDate(profile.updated_at)}</p>
                    </>
                ) : (
                    <p style={{color: 'gray'}}>No profile data available</p>
                )}
                {canUpdateProfile() && !isTargetSuperuser && (
                    <div>
                        <Link className={'user-details-component-link'} to={`/users-update/${userId}`}>Update
                            user</Link>
                    </div>
                )}
                {showButtons && (
                    <div>
                        <UsersManagerComponent user={user} onUpdate={async () => {
                            setLoading(true);
                            try {
                                const res = await userService.getById(userId);
                                setUser(res.data);
                            } catch {
                                setError('User not found');
                            } finally {
                                setLoading(false);
                            }
                        }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export {UserDetailsComponent};