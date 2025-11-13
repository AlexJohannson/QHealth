import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {userService} from "../../../services/userService";
import './PatientDetailsComponent.css';
import {FooterComponent} from "../../FooterComponent/FooterComponent";

const PatientDetailsComponent = () => {
    const {id} = useParams();
    const userId = id || localStorage.getItem("userId");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const res = await userService.getPatientId(userId);
                setUser(res.data);
            } catch (error) {
                setError('Patient details not found.');
            } finally {
                setLoading(false);
            }
        };
        fetchPatientDetails();
    }, [userId]);


    if (loading) return <p>Loading user...</p>;
    if (error) return <p style={{color: 'red'}}>{error}</p>;

    const {email, profile} = user;


    return (
        <div className={'patient-details-component'}>
            <div className={'patient-details-container-header'}>
                <img src={'/img/logo.png'} className={'logo-patient-details'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'patient-details-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className={'patient-details-container-profile'}>
                <h3>{profile?.name || ''} {profile?.surname || ''}</h3>
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
            </div>
            <FooterComponent/>
        </div>
    );
};

export {PatientDetailsComponent};