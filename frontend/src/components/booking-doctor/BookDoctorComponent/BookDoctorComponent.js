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
        } catch (error) {
            const backendMessage =
                error?.response?.data?.detail ||
                error?.response?.data?.error ||
                error?.response?.data ||
                'Booking doctor failed.';
            setError(typeof backendMessage === 'string' ? backendMessage : JSON.stringify(backendMessage));
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