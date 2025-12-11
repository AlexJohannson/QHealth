import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {userService} from "../../../services/userService";
import './PatientDetailsComponent.css';
import {FooterComponent} from "../../FooterComponent/FooterComponent";
import {formatDate} from "../../../untils/formatDate";

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

    const role = localStorage.getItem('role');
    const isSuperUser = localStorage.getItem('is_superuser') === 'true';
    const isStaff = localStorage.getItem('is_staff') === 'true';


    const canSeeBookingLink =
        isSuperUser ||
        isStaff ||
        role === 'operator';

    const canSeeJournalLink =
        isSuperUser ||
        isStaff ||
        role === 'doctor';

    const canSeePatientRecipeLink =
        isSuperUser ||
        isStaff ||
        role === 'pharmacist';


    if (loading) return (
        <div className="patient-profile-skeleton">
            <div className="patient-profile-skeleton-avatar"></div>
            <div className="patient-profile-skeleton-line short"></div>
            <div className="patient-profile-skeleton-line long"></div>
            <div className="patient-profile-skeleton-line long"></div>
        </div>
    );
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
                {canSeeBookingLink && (
                    <Link className={'booking-diagnostics-link-patient-details-component'}
                          to={`/diagnostics?patientId=${user.id}`}>
                        Booking Diagnostic
                    </Link>
                )}
                {canSeeBookingLink && (
                    <Link className={'booking-diagnostics-link-patient-details-component'}
                          to={`/doctors?patientId=${user.id}`}>
                        Booking Doctor
                    </Link>
                )}
                {canSeeJournalLink && (
                    <Link className={'booking-diagnostics-link-patient-details-component'}
                          to={`/create-patient-journal?patientId=${user.id}`}>
                    Create Patient Journal
                </Link>
                )}
                {canSeePatientRecipeLink && (
                <Link className={'booking-diagnostics-link-patient-details-component'}
                      to={`/create-patient-recipe?patientId=${user.id}`}>
                    Create Patient Recipe
                </Link>
                )}
            </div>
            <FooterComponent/>
        </div>
    );
};

export {PatientDetailsComponent};