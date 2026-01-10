import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {bookingDoctorService} from "../../../services/bookingDoctorService";
import './BookingActionComponent.css';

const BookingActionsComponent = ({bookingDoctorId, status, onStatusChange}) => {
    const [cancelled, setCancelled] = useState(status === 'cancelled');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [confirmCancel, setConfirmCancel] = useState(false);

    const role = localStorage.getItem('role');
    const isSuperuser = localStorage.getItem('is_superuser') === 'true';
    const isUser = localStorage.getItem('is_user') === 'true';
    const isAdmin = localStorage.getItem('is_staff') === 'true';

    const canCancel =
        !cancelled &&
        (
            isSuperuser ||
            isAdmin ||
            role === 'operator' ||
            (isUser && role !== 'doctor' && role !== 'pharmacist')
        );

    const canDelete =
        isSuperuser ||
        isAdmin ||
        role === 'operator';


    const handleDelete = async () => {
        try {
            await bookingDoctorService.deleteBookingVisitToDoctor(bookingDoctorId);
            navigate('/booking-doctor');
        } catch (e) {
            setError('Deleted error');
        }
    };


    const handleCancel = async () => {
        try {
            await bookingDoctorService.canceledBookingVisitToDoctor(bookingDoctorId);
            setCancelled(true);
            if (onStatusChange) {
                await onStatusChange();
            }
        } catch (e) {
            setError('Cancelled error');
        }
    };

    return (
        <div className={'booking-actions-component'}>
            {error && <p className={'booking-actions-component-error'}>{error}</p>}

            {canCancel && (
                !confirmCancel ? (
                        <button  className={'booking-actions-component-button-canceled'}
                                 onClick={() => setConfirmCancel(true)}>
                                <img src={'/img/cancel.png'} alt={'cancel'} className={'booking-doctor-delete-icon'}/>
                        </button>
                    ) : (
                        <div className={'booking-actions-component-button-canceled-confirmation'}>
                            <p className={'booking-actions-component-button-canceled-confirmation-error'}>
                                Are you sure you want to cancel booking visit to doctor?
                            </p>

                            {error && (
                                <p className="booking-actions-component-button-canceled-confirmation-error">
                                    {error}
                                </p>
                            )}

                            <button
                                className={'booking-actions-component-button-canceled-confirmation-button-cancel-yes'}
                                type="button"
                                onClick={handleCancel}
                            >
                                Yes, Cancel
                            </button>

                            <button
                                className={'booking-actions-component-button-canceled-confirmation-button-cancel-no'}
                                type="button"
                                onClick={() => {
                                    setConfirmCancel(false);
                                    setError('');
                                }}
                            >
                                No, cancel
                            </button>
                        </div>
                    )
            )}

            {canDelete && (
                !confirmDelete ? (
                        <button
                            className={'booking-actions-component-button-delete'}
                            onClick={() => setConfirmDelete(true)}
                        >
                            <img src={'/img/delete.png'} alt={'delete'} className={'booking-doctor-delete-icon'} />
                        </button>
                    ) : (
                        <div className={'booking-actions-component-button-delete-confirmation'}>
                            <p className={'booking-actions-component-button-delete-delete-confirmation-error'}>
                                Are you sure you want to delete booking visit to doctor?
                            </p>

                            {error && (
                                <p className="booking-actions-component-button-delete-delete-confirmation-error">
                                    {error}
                                </p>
                            )}

                            <button
                                className={'booking-actions-component-button-delete-confirmation-button-delete'}
                                type="button"
                                onClick={handleDelete}
                            >
                                Yes, Delete
                            </button>

                            <button
                                className={'booking-actions-component-button-delete-confirmation-button-cancel'}
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

            {cancelled && <p className={'booking-actions-component-error'}>Booking is cancelled</p>}
        </div>
    );
};

export {BookingActionsComponent};