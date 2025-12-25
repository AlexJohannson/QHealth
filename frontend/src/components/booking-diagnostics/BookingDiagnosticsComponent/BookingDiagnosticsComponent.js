import React, {useEffect, useState} from 'react';
import {bookingDiagnosticsService} from "../../../services/bookingDiagnosticsService";
import {BookingDiagnosticsProfile} from "../BookingDiagnosticsProfile/BookingDiagnosticsProfile";
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import './BookingDiagnosticsComponent.css';
import {
    BookingDiagnosticsFilterComponent
} from "../BookingDiagnosticsFilterComponent/BookingDiagnosticsFilterComponent";
import {socketService} from "../../../services/socketService";
import { useSearchParams } from "react-router-dom";

const BookingDiagnosticsComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [bookingDiagnostics, setBookingDiagnostics] = useState([]);
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [size, setSize] = useState(Number(searchParams.get("size")) || 5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [trigger, setTrigger] = useState(null);
    const [filters, setFilters] = useState({
        patient_name: searchParams.get("patient_name") || "",
        patient_surname: searchParams.get("patient_surname") || "",
        diagnostic_service: searchParams.get("diagnostic_service") || "",
        order: searchParams.get("order") || "",
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
        const fetchBookingDiagnostics = async () => {
            setLoading(true);
            try {
                const data = await bookingDiagnosticsService.getAllLisr({
                    page,
                    size,
                    ...filters,
                });
                setBookingDiagnostics(data.data);
                setTotalPages(data.total_pages);
            } catch (err) {
                setError('Could not load booking diagnostics.');
            } finally {
                setLoading(false);
            }
        };
        fetchBookingDiagnostics();
    }, [page, size, trigger, filters]);

    useEffect(() => {
        socketInit().then()
    }, []);


    const socketInit = async () => {
        const service = await socketService();
        const client = service.bookingDiagnostics();


        client.onopen = () => {
            client.send(JSON.stringify({
                action: 'subscribe_to_booking_diagnostics_model_changes',
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
        <div className="bookings-diagnostics-skeleton-container">
            {[...Array(size)].map((_, idx) => (
                <div key={idx} className="booking-diagnostic-skeleton-item">
                    <div className="booking-diagnostic-skeleton-avatar"></div>
                    <div className="booking-diagnostic-skeleton-info">
                        <div className="booking-diagnostic-skeleton-line short"></div>
                        <div className="booking-diagnostic-skeleton-line long"></div>
                    </div>
                </div>
            ))}
        </div>
    );
    if (error) return <p style={{color: 'red'}}>{error}</p>;



    return (
        <div className={'booking-diagnostics-component'}>
            <div className={'booking-diagnostics-component-filter'}>
                <BookingDiagnosticsFilterComponent onFilter={handleFilter}/>
            </div>
            <div className={'booking-diagnostics-component-maping'}>
                {bookingDiagnostics.length === 0 ? (
                     <p className={'booking-diagnostics-component-maping-information'}>No booking diagnostics found.</p>
                ) : (
                    bookingDiagnostics.map((bookingDiagnostic) => (
                        <BookingDiagnosticsProfile key={bookingDiagnostic.id} bookingDiagnostic={bookingDiagnostic} />
                    ))
                )}
            </div>
            <div className={'booking-diagnostics-component-pagination'}>
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

export {BookingDiagnosticsComponent};