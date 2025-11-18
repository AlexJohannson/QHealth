import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {bookingDoctorService} from "../../../services/bookingDoctorService";
import {BookingActionsComponent} from "../BookingActionComponent/BookingActionComponent";
import './BookingDoctorDetailsComponent.css';
import {FooterComponent} from "../../FooterComponent/FooterComponent";


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


    if (loading) return <p>Loading user...</p>;
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
                <p>UserId: {bookingDoctor.user.id}</p>
                <p>Email: {bookingDoctor.user.email}</p>
                <p>Active: {bookingDoctor.user.is_active ? 'Yes' : 'No'}</p>
                <p>Phone number: {bookingDoctor.user.profile.phone_number}</p>
                <p>Date of birth: {bookingDoctor.user.profile.date_of_birth}</p>
                <p>Height: {bookingDoctor.user.profile.height}</p>
                <p>Weight: {bookingDoctor.user.profile.weight}</p>
                <p>Street: {bookingDoctor.user.profile.street}</p>
                <p>House: {bookingDoctor.user.profile.house}</p>
                <p>City: {bookingDoctor.user.profile.city}</p>
                <p>Region: {bookingDoctor.user.profile.region}</p>
                <p>Country: {bookingDoctor.user.profile.country}</p>
                <p>Gender: {bookingDoctor.user.profile.gender}</p>
                <h3>Doctor:</h3>
                <p>Speciality: {bookingDoctor.doctor?.specialty}</p>
                <h3>Name: {bookingDoctor.doctor?.name} {bookingDoctor.doctor?.surname}</h3>
                <h4>Status: {bookingDoctor.status === 'cancelled' ? 'Cancelled' : 'Booked'}</h4>
                <p>Date: {bookingDoctor.date_time}</p>
                <p>Create: {bookingDoctor.created_at}</p>
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