import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {bookingDiagnosticsService} from "../../../services/bookingDiagnosticsService";
import './BookingDiagnosticsDetailsComponent.css';
import {formatDate} from "../../../untils/formatDate";

const BookingDiagnosticsDetailsComponent = () => {
    const {id} = useParams();
    const [bookingDiagnostic, setBookingDiagnostic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [confirmDelete, setConfirmDelete] = useState(false);

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
            navigate('/booking-diagnostic');
        } catch (err) {
            const msg = err.response?.data?.detail || 'Failed to delete diagnostic';
            setError(msg);
        }
    };

    if (loading) return (
        <div className="booking-diagnostic-profile-skeleton">
            <div className="booking-diagnostic-profile-skeleton-avatar"></div>
            <div className="booking-diagnostic-profile-skeleton-line short"></div>
            <div className="booking-diagnostic-profile-skeleton-line long"></div>
            <div className="booking-diagnostic-profile-skeleton-line long"></div>
        </div>
    );
    if (error) return <p style={{color: 'red'}}>{error}</p>;


    return (
        <div className={'booking-diagnostics-details-component'}>
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
                    !confirmDelete ? (
                        <button
                            className={'booking-diagnostics-details-component-button-delete-booking'}
                            onClick={() => setConfirmDelete(true)}
                        >
                            <img src={'/img/delete.png'} alt={'delete'} className={'booking-diagnostics-delete-icon'} />
                        </button>
                    ) : (
                        <div className={'booking-diagnostics-detail-component-delete-confirmation'}>
                            <p className={'booking-diagnostics-component-delete-confirmation-error'}>
                                Are you sure you want to delete booking diagnostic modality?
                            </p>

                            {error && (
                                <p className="booking-diagnostics-component-delete-confirmation-error">
                                    {error}
                                </p>
                            )}

                            <button
                                className={'booking-diagnostics-component-delete-confirmation-button-delete'}
                                type="button"
                                onClick={handleDelete}
                            >
                                Yes, Delete
                            </button>

                            <button
                                className={'booking-diagnostics-component-delete-confirmation-button-cancel'}
                                type="button"
                                onClick={() => {
                                    setConfirmDelete(false);
                                    setError('');
                                }}
                            >
                                No, cancel
                            </button>
                        </div>
                    )
                )}

            </div>
        </div>
    );
};

export {BookingDiagnosticsDetailsComponent};



