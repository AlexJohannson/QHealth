import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {bookingDiagnosticsService} from "../../../services/bookingDiagnosticsService";
import './BookingDiagnosticsDetailsComponent.css';
import {FooterComponent} from "../../FooterComponent/FooterComponent";

const BookingDiagnosticsDetailsComponent = () => {
    const {id} = useParams();
    const [bookingDiagnostic, setBookingDiagnostic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookingDiagnostics = async () => {
            try {
                const res = await bookingDiagnosticsService.getBookingDiagnosticById(id);
                setBookingDiagnostic(res.data);
            } catch (error) {
                setError('Booked Diagnostics not found.');
            } finally {
                setLoading(false);
            }
        };
        fetchBookingDiagnostics();
    }, [id]);


    const isSuperUser = localStorage.getItem('is_superuser') === 'true';
    const isStaff = localStorage.getItem('is_staff') === 'true';
    const role = localStorage.getItem('role');

    const canDelete = isSuperUser || isStaff || role === 'operator';

    const handleDelete = async () => {
        try {
            await bookingDiagnosticsService.deleteBookingDiagnostic(id);
            navigate(-1);
        } catch (err) {
            alert('Failed to delete booking.');
        }
    };

    if (loading) return <p>Loading user...</p>;
    if (error) return <p style={{color: 'red'}}>{error}</p>;


    return (
        <div className={'booking-diagnostics-details-component'}>
            <div className={'booking-diagnostic-detail-component-header'}>
                <img src={'/img/logo.png'} className={'logo-booking-diagnostic-detail-component'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'booking-diagnostics-detail-component-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className={'booking-diagnostics-details-component-profile'}>
                <h3>Patient:</h3>
                <h4>
                    {bookingDiagnostic.user?.profile
                        ? `${bookingDiagnostic.user.profile.name} ${bookingDiagnostic.user.profile.surname}`
                        : bookingDiagnostic.user?.email || 'Unknown user'}
                </h4>
                <p>UserId: {bookingDiagnostic.user.id}</p>
                <p>Email: {bookingDiagnostic.user.email}</p>
                <p>Active: {bookingDiagnostic.user.is_active ? 'Yes' : 'No'}</p>
                <p>Phone number: {bookingDiagnostic.user.profile.phone_number}</p>
                <p>Date of birth: {bookingDiagnostic.user.profile.date_of_birth}</p>
                <p>Height: {bookingDiagnostic.user.profile.height}</p>
                <p>Weight: {bookingDiagnostic.user.profile.weight}</p>
                <p>Street: {bookingDiagnostic.user.profile.street}</p>
                <p>House: {bookingDiagnostic.user.profile.house}</p>
                <p>City: {bookingDiagnostic.user.profile.city}</p>
                <p>Region: {bookingDiagnostic.user.profile.region}</p>
                <p>Country: {bookingDiagnostic.user.profile.country}</p>
                <p>Gender: {bookingDiagnostic.user.profile.gender}</p>
                <h3>Diagnostic:</h3>
                <p>Diagnostics: {bookingDiagnostic.diagnostic_service.modality}</p>
                <h3>Booked by:</h3>
                {
                    <p>
                        {bookingDiagnostic.booked_by.profile
                            ? `${bookingDiagnostic.booked_by.profile.name} ${bookingDiagnostic.booked_by.profile.surname}`
                            : bookingDiagnostic.booked_by.email}
                    </p>
                }
                {bookingDiagnostic.diagnostic_service.date_time}
            </div>
            <div className={'booking-diagnostics-details-component-button'}>
                {canDelete && (
                    <button className={'booking-diagnostics-details-component-button-delete-booking'}
                            onClick={handleDelete}>
                        Delete Booking
                    </button>
                )}
            </div>
            <FooterComponent/>
        </div>
    );
};

export {BookingDiagnosticsDetailsComponent};



