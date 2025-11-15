import React from 'react';
import {Link} from "react-router-dom";
import './BookingDiagnosticsProfile.css';


/**
 * @param {{bookingDiagnostic : IDiagnosticBooking}} props
 */

const BookingDiagnosticsProfile = ({ bookingDiagnostic }) => {
    const userProfile = bookingDiagnostic.user?.profile;
    const modality = bookingDiagnostic.diagnostic_service?.modality;

    return (
        <div className="booking-diagnostics-profile">
            <Link className={'booking-diagnostics-profile-link'} to={`/booking-diagnostic/${bookingDiagnostic.id}`}>
                <h4>
                    {userProfile
                        ? `${userProfile.name} ${userProfile.surname}`
                        : 'Unknown patient'}
                </h4>
                <p>Diagnostics: {modality || 'Unknown modality'}</p>
            </Link>
        </div>
    );
};

export {BookingDiagnosticsProfile};