import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {bookingDoctorService} from "../../../services/bookingDoctorService";
import {BookingActionsComponent} from "../BookingActionComponent/BookingActionComponent";
import './BookingDoctorDetailsComponent.css';
import {FooterComponent} from "../../FooterComponent/FooterComponent";
import {formatDate} from "../../../untils/formatDate";


const BookingDoctorDetailsComponent = () => {
    const {id} = useParams();
    const [bookingDoctor, setBookingDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const refreshBooking = async () => {
        try {
            const res = await bookingDoctorService.getBookingDoctorVisitById(id);
            setBookingDoctor(res.data);
        } catch (error) {
            setError('Could not refresh booking');
        }
    };


    useEffect(() => {
        refreshBooking();
        const fetchBookingDoctorDetails = async () => {
            try {
                const res = await bookingDoctorService.getBookingDoctorVisitById(id);
                setBookingDoctor(res.data);
            } catch (error) {
                setError('Booked doctor profile could not be found.');
            } finally {
                setLoading(false);
            }
        };
        fetchBookingDoctorDetails();
    }, [id]);


    if (loading) return (
        <div className="booking-doctor-profile-skeleton">
            <div className="booking-doctor-profile-skeleton-avatar"></div>
            <div className="booking-doctor-profile-skeleton-line short"></div>
            <div className="booking-doctor-profile-skeleton-line long"></div>
            <div className="booking-doctor-profile-skeleton-line long"></div>
        </div>
    );
    if (error) return <p style={{color: 'red'}}>{error}</p>;


    return (
        <div className={'booking-doctor-details-component'}>
            <div className={'booking-doctor-details-component-header'}>
                <img src={'/img/logo.png'} className={'logo-booking-doctor-details-component'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'booking-doctor-details-component-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className={'booking-doctor-details-component-profile'}>
                <h3>Patient:</h3>
                <h4>
                    {bookingDoctor.user?.profile
                        ? `${bookingDoctor.user.profile.name} ${bookingDoctor.user.profile.surname}`
                        : bookingDoctor.user?.email || 'Unknown user'}
                </h4>
                <p><strong>Number:</strong> {bookingDoctor.user.id}</p>
                <p><strong>Email:</strong> {bookingDoctor.user.email}</p>
                <p><strong>Active:</strong> {bookingDoctor.user.is_active ? 'Yes' : 'No'}</p>
                <p><strong>Phone number:</strong> {bookingDoctor.user.profile.phone_number}</p>
                <p><strong>Date of birth:</strong> {bookingDoctor.user.profile.date_of_birth}</p>
                <p><strong>Height:</strong> {bookingDoctor.user.profile.height}</p>
                <p><strong>Weight:</strong> {bookingDoctor.user.profile.weight}</p>
                <p><strong>Street:</strong> {bookingDoctor.user.profile.street}</p>
                <p><strong>House:</strong> {bookingDoctor.user.profile.house}</p>
                <p><strong>City:</strong> {bookingDoctor.user.profile.city}</p>
                <p><strong>Region:</strong> {bookingDoctor.user.profile.region}</p>
                <p><strong>Country:</strong> {bookingDoctor.user.profile.country}</p>
                <p><strong>Gender:</strong> {bookingDoctor.user.profile.gender}</p>
                <h3>Doctor:</h3>
                <p><strong>Speciality:</strong> {bookingDoctor.doctor?.specialty}</p>
                <p><strong>Name:</strong> {bookingDoctor.doctor?.name} {bookingDoctor.doctor?.surname}</p>
                <p><strong>Status:</strong> {bookingDoctor.status === 'cancelled' ? 'Cancelled' : 'Booked'}</p>
                <p><strong>Visit to doctor:</strong> {formatDate(bookingDoctor.date_time)}</p>
                <p><strong>Create:</strong> {formatDate(bookingDoctor.created_at)}</p>
                <p><strong>Update:</strong> {formatDate(bookingDoctor.updated_at)}</p>
            </div>
            <div className={'booking-doctor-details-component-actions'}>
                <BookingActionsComponent id={bookingDoctor.doctor.id}
                                         patientId={bookingDoctor.user.id}
                                         bookingDoctorId={id}
                                         status={bookingDoctor.status}
                                         onStatusChange={refreshBooking}
                />
            </div>
            <FooterComponent/>
        </div>
    );
};

export {BookingDoctorDetailsComponent};