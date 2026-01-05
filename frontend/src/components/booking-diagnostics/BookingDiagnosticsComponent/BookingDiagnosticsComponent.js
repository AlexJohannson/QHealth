import React, {useEffect, useState} from 'react';
import {bookingDiagnosticsService} from "../../../services/bookingDiagnosticsService";
import {BookingDiagnosticsProfile} from "../BookingDiagnosticsProfile/BookingDiagnosticsProfile";
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import './BookingDiagnosticsComponent.css';
import {
    BookingDiagnosticsFilterComponent
} from "../BookingDiagnosticsFilterComponent/BookingDiagnosticsFilterComponent";
import {socketService} from "../../../services/socketService";
import {useSearchParams} from "react-router-dom";

const BookingDiagnosticsComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [bookingDiagnostics, setBookingDiagnostics] = useState([]);
    const page = Number(searchParams.get("page")) || 1;
    const size = Number(searchParams.get("size")) || 5;
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [trigger, setTrigger] = useState(null);
    const filtersFromUrl = {
        patient_name: searchParams.get("patient_name") || "",
        patient_surname: searchParams.get("patient_surname") || "",
        diagnostic_service: searchParams.get("diagnostic_service") || "",
        order: searchParams.get("order") || "",
    };

    const [filters, setFilters] = useState(filtersFromUrl);

    const updateSearchParams = (params) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);

            Object.entries(params).forEach(([key, value]) => {
                if (value === '' || value === null || value === undefined) {
                    next.delete(key);
                } else {
                    next.set(key, value);
                }
            });

            return next;
        });
    };

    useEffect(() => {
        setFilters(filtersFromUrl);
    }, [searchParams]);


    useEffect(() => {
        const fetchBookingDiagnostics = async () => {
            setLoading(true);
            try {
                const data = await bookingDiagnosticsService.getAllLisr({
                    page,
                    size,
                    ...filtersFromUrl,
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
    }, [trigger, searchParams]);

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

    const handleFilterApply = (newFilters) => {
        setFilters(newFilters);

        updateSearchParams({
            ...newFilters,
            page: 1,
            size,
        });
    };

    const handlePageChange = (newPage) => {
        updateSearchParams({
            page: newPage,
            size,
            ...filtersFromUrl,
        });
    };

    const handleSizeChange = (newSize) => {
        updateSearchParams({
            page: 1,
            size: newSize,
            ...filtersFromUrl,
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
                <BookingDiagnosticsFilterComponent
                    filters={filters}
                    onApply={handleFilterApply}
                />
            </div>
            <div className={'booking-diagnostics-component-maping'}>
                {bookingDiagnostics.length === 0 ? (
                    <p className={'booking-diagnostics-component-maping-information'}>No booking diagnostics found.</p>
                ) : (
                    bookingDiagnostics.map((bookingDiagnostic) => (
                        <BookingDiagnosticsProfile key={bookingDiagnostic.id} bookingDiagnostic={bookingDiagnostic}/>
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