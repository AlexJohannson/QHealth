import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {roleService} from "../../../services/roleService";
import {BookDoctorComponent} from "../../booking-doctor/BookDoctorComponent/BookDoctorComponent";
import './DoctorsDetailsComponent.css';
import {FooterComponent} from "../../FooterComponent/FooterComponent";


const DoctorsDetailsComponent = () => {
    const {id} = useParams();
    const roleId = id || localStorage.getItem("roleId");
    const [doctors, setDoctors] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const patientId = searchParams.get('patientId');
    const userId = searchParams.get('userId');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await roleService.getProfileDoctorById(roleId);
                setDoctors(res.data);
            } catch (error) {
                setError('Doctor profile not found');
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, [roleId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{color: 'red'}}>{error}</p>;
    if (!doctors) return <p>No doctors data</p>;


    const {profile, is_active} = doctors.user;


    return (
        <div className={'doctors-details-component'}>
            <div className={'doctors-details-component-header'}>
                <img src={'/img/logo.png'} className={'logo-doctors-details-component'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'doctors-details-component-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className={'doctors-details-component-content'}>
                <h3>{profile.name} {profile.surname}</h3>
                <p>Role: {doctors.role}</p>
                {doctors.specialty && <p>Specialty: {doctors.specialty}</p>}
                {doctors.role === 'doctor' && (
                    <p>Available for booking: {doctors.is_available_for_booking ? 'Yes' : 'No'}</p>
                )}
            </div>
            <div className={'doctors-details-component-book-doctor-component'}>
                {userId && (
                    <BookDoctorComponent id={userId} patientId={patientId}/>
                )}

            </div>
            <FooterComponent/>
        </div>
    );
};

export {DoctorsDetailsComponent};