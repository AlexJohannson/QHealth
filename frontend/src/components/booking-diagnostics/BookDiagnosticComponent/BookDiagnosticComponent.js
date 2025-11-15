import React, {useState} from 'react';
import {bookingDiagnosticsService} from '../../../services/bookingDiagnosticsService';
import {useLocation} from "react-router-dom";
import './BookDiagnosticComponent.css';

const BookDiagnosticComponent = ({id}) => {
    const diagnosticsId = Number(id);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dateTime, setDateTime] = useState('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const patientId = searchParams.get('patientId');

    const loggedInUserId = Number(localStorage.getItem('userId'));
    const userId = patientId ? Number(patientId) : loggedInUserId;



    const isSuperUser = localStorage.getItem('is_superuser') === 'true';
    const isStaff = localStorage.getItem('is_staff') === 'true';
    const role = localStorage.getItem('role');

    const canSetDateTime = isSuperUser || isStaff || role === 'operator';


    const handleBooking = async () => {
    setLoading(true);
    setError('');

    const data = {
        user_id: Number(userId),
        diagnostics_id: Number(diagnosticsId),
        booked_by_id: Number(userId),
        ...(canSetDateTime && { date_time: dateTime }),
    };

    try {
        await bookingDiagnosticsService.bookDiagnostic(data);
    } catch (err) {
        const backendMessage =
            err?.response?.data?.detail ||
            err?.response?.data?.error ||
            err?.response?.data ||
            'Booking failed';

        setError(typeof backendMessage === 'string' ? backendMessage : JSON.stringify(backendMessage));
    } finally {
        setLoading(false);
    }
};

    return (
        <div className={'book-diagnostic-component'}>
            <h5>BLOCK FOR BOOK MODALITY</h5>
            {canSetDateTime && (
                <div className={'book-diagnostic-component-container'}>
                    {error && <p className={'book-diagnostic-component-container-error'}>{error}</p>}
                    <label>Date & Time:</label>
                    <input
                        type="datetime-local"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                    />
                </div>
            )}
            <button onClick={handleBooking} disabled={loading}>
                {loading ? 'Booking...' : 'Book Diagnostic'}
            </button>
        </div>
    );
};

export {BookDiagnosticComponent};