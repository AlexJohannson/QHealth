import React from 'react';
import {Link} from "react-router-dom";
import './BookingDoctorProfile.css';

/**
 * @param {{bookingDoctor : IBookingDoctor}} props
 */

const BookingDoctorProfile = ({bookingDoctor}) => {
    const userProfile = bookingDoctor.user?.profile;





    return (
        <div>
            <Link className={'booking-doctor-profile-link'} to={`/booking-doctor/${bookingDoctor.id}`}>
                <h4>
                    {userProfile
                        ? `${userProfile.name} ${userProfile.surname}`
                        : 'Unknown patient'}
                </h4>
            </Link>
        </div>
    );
};

export {BookingDoctorProfile};