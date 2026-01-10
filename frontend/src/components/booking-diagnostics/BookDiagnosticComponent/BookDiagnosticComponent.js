import React, {useState} from 'react';
import {bookingDiagnosticsService} from '../../../services/bookingDiagnosticsService';
import {useLocation} from "react-router-dom";
import './BookDiagnosticComponent.css';
import {bookingDiagnosticValidator} from "../../../validator/bookingDiagnosticValidator";

const BookDiagnosticComponent = ({id}) => {
    const diagnosticsId = Number(id);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
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
        setSuccessMessage('');


        const {error: validationError} = bookingDiagnosticValidator(canSetDateTime).validate(
            {date_time: dateTime},
            {abortEarly: false}
        );

        if (validationError) {
            const formattedErrors = {};
            validationError.details.forEach(err => {
                const path = err.path.join(".");
                formattedErrors[path] = err.message;
            });
            setError(formattedErrors.date_time || "Invalid date");
            setLoading(false);
            return;
        }


        const data = {
            user_id: Number(userId),
            diagnostics_id: Number(diagnosticsId),
            booked_by_id: Number(userId),
            ...(canSetDateTime && {date_time: dateTime}),
        };

        try {
            await bookingDiagnosticsService.bookDiagnostic(data);
            setSuccessMessage("Successfully booked diagnostic!");
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
        <div className={'book-diagnostic-component'}>
            <h5>BLOCK FOR BOOK MODALITY</h5>
            {successMessage && <p className={'book-diagnostic-component-success'}>{successMessage}</p>}
            {error && <p className={'book-diagnostic-component-error'}>{error}</p>}
            {canSetDateTime && (
                <div className={'book-diagnostic-component-container'}>
                    <label>Date & Time:</label>
                    <input
                        type="datetime-local"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                    />
                </div>
            )}
            <button onClick={handleBooking}>
                <img src={'/img/save.png'} alt='save' className={'book-diagnostic-save-icon'} />
            </button>
        </div>
    );
};

export {BookDiagnosticComponent};