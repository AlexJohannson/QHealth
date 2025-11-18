import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {bookingDoctorService} from "../../../services/bookingDoctorService";
import './BookingActionComponent.css';

const BookingActionsComponent = ({bookingDoctorId, status, onStatusChange}) => {
    const [cancelled, setCancelled] = useState(status === 'cancelled');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
            navigate(-1);
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
                <button  className={'booking-actions-component-button-canceled'} onClick={handleCancel}>
                    Canceled booking
                </button>
            )}

            {canDelete && (
                <button className={'booking-actions-component-button-delete'} onClick={handleDelete}>
                    Delete booking
                </button>
            )}

            {cancelled && <p className={'booking-actions-component-error'}>Booking is cancelled</p>}
        </div>
    );
};

export {BookingActionsComponent};