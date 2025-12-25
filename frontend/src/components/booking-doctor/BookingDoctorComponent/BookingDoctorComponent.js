import React, {useEffect, useState} from 'react';
import {BookingDoctorProfile} from "../BookingDoctorProfile/BookingDoctorProfile";
import {bookingDoctorService} from "../../../services/bookingDoctorService";
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import {BookingDoctorFilterComponent} from "../BookingDoctorFilterComponent/BookingDoctorFilterComponent";
import {socketService} from "../../../services/socketService";
import './BookingDoctorComponent.css';
import { useSearchParams } from "react-router-dom";


const BookingDoctorComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [bookingDoctors, setBookingDoctors] = useState([]);
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [size, setSize] = useState(Number(searchParams.get("size")) || 5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [trigger, setTrigger] = useState(null);
    const [filters, setFilters] = useState({
        patient_name: searchParams.get("patient_name") || "",
        patient_surname: searchParams.get("patient_surname") || "",
        specialty: searchParams.get("specialty") || "",
        doctor_name: searchParams.get("doctor_name") || "",
        doctor_surname: searchParams.get("doctor_surname") || "",
        order: searchParams.get("order") || "",
        status: searchParams.get("status") || "",
    });

    const updateQueryParams = (params) => {
        const cleaned = {};

        Object.entries(params).forEach(([key, value]) => {
            if (value !== "" && value !== null && value !== undefined) {
                cleaned[key] = value;
            }
        });

        setSearchParams(cleaned);
    };



    useEffect(() => {
        const fetchBookingDoctors = async () => {
            setLoading(true);
            try {
                const data = await bookingDoctorService.getAllListOfBookingDoctor({
                    page,
                    size,
                    ...filters,
                });
                setBookingDoctors(data.data);
                setTotalPages(data.total_pages);
            } catch (error) {
                setError('Could not load booking doctors list');
            } finally {
                setLoading(false);
            }
        };
        fetchBookingDoctors();
    }, [page, size, trigger, filters]);


    useEffect(() => {
        socketInit().then()
    }, []);


    const socketInit = async () => {
        const service = await socketService();
        const client = service.bookingDoctor();


        client.onopen = () => {
            client.send(JSON.stringify({
                action: 'subscribe_to_booking_doctor_model_changes',
                request_id: new Date().getTime(),
            }));
        }
        client.onmessage = ({data}) => {
            setTrigger(prev => !prev)
        }
    };

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
        setPage(1);

        updateQueryParams({
            page: 1,
            size,
            ...newFilters,
        });
    };


    const handlePageChange = (newPage) => {
        setPage(newPage);

        updateQueryParams({
            page: newPage,
            size,
            ...filters,
        });
    };

    const handleSizeChange = (newSize) => {
        setSize(newSize);
        setPage(1);

        updateQueryParams({
            page: 1,
            size: newSize,
            ...filters,
        });
    };




    if (loading) return (
        <div className="bookings-doctors-skeleton-container">
            {[...Array(size)].map((_, idx) => (
                <div key={idx} className="booking-doctor-skeleton-item">
                    <div className="booking-doctor-skeleton-avatar"></div>
                    <div className="booking-doctor-skeleton-info">
                        <div className="booking-doctor-skeleton-line short"></div>
                        <div className="booking-doctor-skeleton-line long"></div>
                    </div>
                </div>
            ))}
        </div>
    );
    if (error) return <p style={{color: 'red'}}>{error}</p>;



    return (
        <div className={'booking-doctor-component'}>
            <div className={'booking-doctor-component-filter'}>
                <BookingDoctorFilterComponent onFilter={handleFilter}/>
            </div>
            <div className={'booking-doctor-component-maping'}>
                {bookingDoctors.length === 0 ? (
                    <p className={'booking-doctor-component-maping-information'}>No booking doctors found.</p>
                ) : (
                    bookingDoctors.map((bookingDoctor) => (
                        <BookingDoctorProfile key={bookingDoctor.id} bookingDoctor={bookingDoctor} />
                    ))
                )}
            </div>
            <div className={'booking-doctor-component-pagination'}>
                <PaginationComponent
                    page={page}
                    totalPages={totalPages}
                    size={size}
                    onPageChange={handlePageChange}
                    onSizeChange={handleSizeChange}
                />
            </div>
        </div>
    );
};

export {BookingDoctorComponent};