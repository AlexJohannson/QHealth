import React from 'react';
import {Link} from "react-router-dom";
import './BookingDiagnosticsProfile.css';


/**
 * @param {{bookingDiagnostic : IDiagnosticBooking}} props
 */

const BookingDiagnosticsProfile = ({bookingDiagnostic}) => {
    const userProfile = bookingDiagnostic.user?.profile;
    const modality = bookingDiagnostic.diagnostic_service?.modality;

    return (
        <Link className={'booking-diagnostics-profile-link'} to={`/booking-diagnostic/${bookingDiagnostic.id}`}>
            <div className="booking-diagnostics-profile-link-container">
                <div className="booking-diagnostics-profile-link-container-items-id">
                    <h4>{bookingDiagnostic.id}</h4>
                </div>
                <div className="booking-diagnostics-profile-link-container-items">
                    <h4>Patient Name:</h4>
                    <h2>{userProfile.name}</h2>
                </div>
                <div className="booking-diagnostics-profile-link-container-items">
                    <h4>Patient Surname:</h4>
                    <h2>{userProfile.surname}</h2>
                </div>
                <div className="booking-diagnostics-profile-link-container-items">
                    <h4>Diagnostic:</h4>
                    <h2>{modality}</h2>
                </div>
            </div>
        </Link>
    );
};

export {BookingDiagnosticsProfile};