import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {bookingDiagnosticsService} from "../../../services/bookingDiagnosticsService";
import './BookingDiagnosticsDetailsComponent.css';
import {FooterComponent} from "../../FooterComponent/FooterComponent";
import {formatDate} from "../../../untils/formatDate";

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

    if (loading) return <div className={'loading-booking-diagnostic-details'}><h1
        className={'loading-booking-diagnostic-detail-text'}>Loading...</h1></div>;
    if (error) return <p style={{color: 'red'}}>{error}</p>;


    return (
        <div className={'booking-diagnostics-details-component'}>
            <div className={'booking-diagnostic-detail-component-header'}>
                <img src={'/img/logo.png'} className={'logo-booking-diagnostic-detail-component'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'booking-diagnostics-detail-component-button'} onClick={() => navigate(-1)}>BACK
                </button>
            </div>
            <div className={'booking-diagnostics-details-component-profile'}>
                <h3>Patient:</h3>
                <h4>
                    {bookingDiagnostic.user?.profile
                        ? `${bookingDiagnostic.user.profile.name} ${bookingDiagnostic.user.profile.surname}`
                        : bookingDiagnostic.user?.email || 'Unknown user'}
                </h4>
                <p><strong>Number:</strong> {bookingDiagnostic.user.id}</p>
                <p><strong>Email:</strong> {bookingDiagnostic.user.email}</p>
                <p><strong>Active:</strong> {bookingDiagnostic.user.is_active ? 'Yes' : 'No'}</p>
                <p><strong>Phone number:</strong> {bookingDiagnostic.user.profile.phone_number}</p>
                <p><strong>Date of birth:</strong> {bookingDiagnostic.user.profile.date_of_birth}</p>
                <p><strong>Height:</strong> {bookingDiagnostic.user.profile.height}</p>
                <p><strong>Weight:</strong> {bookingDiagnostic.user.profile.weight}</p>
                <p><strong>Street:</strong> {bookingDiagnostic.user.profile.street}</p>
                <p><strong>House:</strong> {bookingDiagnostic.user.profile.house}</p>
                <p><strong>City:</strong> {bookingDiagnostic.user.profile.city}</p>
                <p><strong>Region:</strong> {bookingDiagnostic.user.profile.region}</p>
                <p><strong>Country:</strong> {bookingDiagnostic.user.profile.country}</p>
                <p><strong>Gender:</strong> {bookingDiagnostic.user.profile.gender}</p>
                <h3>Diagnostic:</h3>
                <p><strong>Diagnostic service:</strong> {bookingDiagnostic.diagnostic_service.modality}</p>
                <h3>Booked by:</h3>
                {
                    <p>
                        {bookingDiagnostic.booked_by.profile
                            ? `${bookingDiagnostic.booked_by.profile.name} ${bookingDiagnostic.booked_by.profile.surname}`
                            : bookingDiagnostic.booked_by.email}
                    </p>
                }
                <p>
                    <strong>Visit to diagnostic service:</strong>{" "}
                    {bookingDiagnostic.date_time
                        ? formatDate(bookingDiagnostic.date_time)
                        : "Operator will call soon about the time of diagnostic service"}
                </p>
                <p><strong>Create:</strong> {formatDate(bookingDiagnostic.created_at)}</p>
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



