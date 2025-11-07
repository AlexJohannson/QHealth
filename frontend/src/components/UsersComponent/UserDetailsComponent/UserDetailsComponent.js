import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {userService} from "../../../services/userService";
import {UsersManagerComponent} from "../UsersManagerComponent/UsersManagerComponent";
import './UserDetailsComponent.css';
import {FooterComponent} from "../../FooterComponent/FooterComponent";



const UserDetailsComponent = () => {
    const {id} = useParams();
    const userId = id || localStorage.getItem('userId');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();





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



    if (loading) return <p>Loading user...</p>;
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
            <div className={'user-details-container-header'}>
                <img src={'/img/logo.png'} className={'logo-user-details'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'user-details-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className={'user-details-container-profile'}>
            <h3 style={getNameStyle()}>
                {profile?.name || 'No name'} {profile?.surname || ''}
            </h3>
            <p>UserID: {user.id}</p>
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
                <p style={{color: 'gray'}}>No profile data available</p>
            )}
            {canUpdateProfile() && !isTargetSuperuser && (
                <div>
                    <Link className={'user-details-component-link'} to={`/users-update/${userId}`}>Update user</Link>
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
            <FooterComponent/>
        </div>
    );
};

export {UserDetailsComponent};