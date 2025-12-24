import React, {useEffect, useState} from 'react';
import {bookingDiagnosticsService} from "../../../services/bookingDiagnosticsService";
import {BookingDiagnosticsProfile} from "../BookingDiagnosticsProfile/BookingDiagnosticsProfile";
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import './BookingDiagnosticsComponent.css';
import {
    BookingDiagnosticsFilterComponent
} from "../BookingDiagnosticsFilterComponent/BookingDiagnosticsFilterComponent";
import {socketService} from "../../../services/socketService";

const BookingDiagnosticsComponent = () => {
    const [bookingDiagnostics, setBookingDiagnostics] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [trigger, setTrigger] = useState(null);


    useEffect(() => {
        const fetchBookingDiagnostics = async () => {
            setLoading(true);
            try {
                const data = await bookingDiagnosticsService.getAllLisr({page, size});
                setBookingDiagnostics(data.data);
                setTotalPages(data.total_pages);
            } catch (err) {
                setError('Could not load booking diagnostics.');
            } finally {
                setLoading(false);
            }
        };
        fetchBookingDiagnostics();
    }, [page, size, trigger]);

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
    }


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
                <BookingDiagnosticsFilterComponent onFilter={(params) => {
                    bookingDiagnosticsService.getAllLisr(params).then(res => setBookingDiagnostics(res.data));
                }}/>
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
                <PaginationComponent page={page} totalPages={totalPages} size={size} onPageChange={setPage}
                                     onSizeChange={(newSize) => {
                                         setSize(newSize);
                                         setPage(1);
                                     }}
                />
            </div>
        </div>
    );
};

export {BookingDiagnosticsComponent};