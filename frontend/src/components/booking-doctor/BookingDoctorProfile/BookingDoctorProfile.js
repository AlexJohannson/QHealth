import React from 'react';
import {Link} from "react-router-dom";
import './BookingDoctorProfile.css';

/**
 * @param {{bookingDoctor : IBookingDoctor}} props
 */

const BookingDoctorProfile = ({bookingDoctor}) => {
    const userProfile = bookingDoctor.user?.profile;


    return (

            <Link className={'booking-doctor-profile-link'} to={`/booking-doctor/${bookingDoctor.id}`}>
                <div className="booking-doctor-profile-link-container">
                    <div className="booking-doctor-profile-link-container-items-id">
                        <h4>{bookingDoctor.id}</h4>
                    </div>
                    <div className="booking-doctor-profile-link-container-items">
                        <h4>Patient Name:</h4>
                        <h2>{userProfile ? `${userProfile.name}` : 'Unknow patient'}</h2>
                    </div>
                    <div className="booking-doctor-profile-link-container-items">
                        <h4>Patient Surname:</h4>
                        <h2>{userProfile ? `${userProfile.surname}` : 'Unknow patient'}</h2>
                    </div>
                    <div className="booking-doctor-profile-link-container-items">
                        <h4>Doctor Name:</h4>
                        <h2>{bookingDoctor?.doctor.name}</h2>
                    </div>
                    <div className="booking-doctor-profile-link-container-items">
                        <h4>Doctor Surname:</h4>
                        <h2>{bookingDoctor?.doctor.surname}</h2>
                    </div>
                    <div className="booking-doctor-profile-link-container-items">
                        <h4>Status:</h4>
                        <h2>{bookingDoctor?.status}</h2>
                    </div>
                </div>

            </Link>
    );
};

export {BookingDoctorProfile};