import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import {bookingDoctorService} from "../../../services/bookingDoctorService";
import './BookDoctorComponent.css';


const BookDoctorComponent = ({id, patientId}) => {
    const doctor = Number(id);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dateTime, setDateTime] = useState('');
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const patientIdFromUrl = searchParams.get('patientId');

    const userId = patientId ? Number(patientId) : (patientIdFromUrl ? Number(patientIdFromUrl)
        : Number(localStorage.getItem('userId')));


    const formatBackendErrors = (errors) => {
        if (typeof errors === 'string') return errors;

        if (typeof errors === 'object' && errors !== null) {
            return Object.entries(errors)
                .map(([field, messages]) => {
                    if (Array.isArray(messages)) {
                        return `${field}: ${messages.join(', ')}`;
                    }
                    return `${field}: ${messages}`;
                })
                .join('\n');
        }

        return 'Unknown error';
    };

    const handleBooking = async () => {
        setLoading(true);
        setError('');

        const data = {
            user_id: Number(userId),
            doctor_id: doctor,
            status: 'booked',
            date_time: dateTime,
        };

        try {
            await bookingDoctorService.createNewVisitToDoctor(data);
        } catch (err) {
            const raw = err?.response?.data?.detail ||
                err?.response?.data?.error ||
                err?.response?.data ||
                'Booking failed';

            setError(formatBackendErrors(raw));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={'book-doctor-component'}>
            <h5>BLOCK FOR BOOK DOCTORS</h5>
            <div className={'book-doctor-component-handle'}>
                {error && <p className={'book-doctor-component-error'}>{error}</p>}
                <label>Date & Time:</label>
                <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                />
            </div>
            <button onClick={handleBooking} disabled={loading}>
                {loading ? 'Booking...' : 'Book Doctor'}
            </button>
        </div>
    );
};

export {BookDoctorComponent};