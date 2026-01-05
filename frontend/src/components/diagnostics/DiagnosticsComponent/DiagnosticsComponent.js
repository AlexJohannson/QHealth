import React, {useEffect, useState} from 'react';
import './DiagnosticsComponent.css';
import {diagnosticsService} from "../../../services/diagnosticsService";
import {DiagnosticsProfileComponent} from "../DiagnosticsProfileComponent/DiagnosticsProfileComponent";
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import {DiagnosticsFilterComponent} from "../DiagnosticsFilterComponent/DiagnosticsFilterComponent";
import {socketService} from "../../../services/socketService";
import { useSearchParams } from "react-router-dom";


const DiagnosticsComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [diagnostics, setDiagnostics] = useState([]);
    const page = Number(searchParams.get("page")) || 1;
    const size = Number(searchParams.get("size")) || 5;
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [trigger, setTrigger] = useState(null);
    const filtersFromUrl = {
        modality: searchParams.get("modality") || "",
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
        const fetchDiagnostics = async () => {
            setLoading(true);
            try {
                const data = await diagnosticsService.getAllDiagnosticsService({
                    page,
                    size,
                    ...filtersFromUrl,
                });
                setDiagnostics(data.data);
                setTotalPages(data.total_pages);
            } catch (error) {
                setError('Could not load diagnostics');
            } finally {
                setLoading(false);
            }
        };
        fetchDiagnostics();
    }, [trigger, searchParams]);


    useEffect(() => {
        socketInit().then()
    }, []);

    const socketInit = async () => {
        const service = await socketService();
        const client = service.diagnostics();

        client.onopen = () => {
            client.send(JSON.stringify({
                action: 'subscribe_to_diagnostics_model_changes',
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
        <div className="diagnostics-list-skeleton-container">
            {[...Array(size)].map((_, idx) => (
                <div key={idx} className="diagnostic-list-skeleton-item">
                    <div className="diagnostic-list-skeleton-avatar"></div>
                    <div className="diagnostic-list-skeleton-info">
                        <div className="diagnostic-list-skeleton-line short"></div>
                        <div className="diagnostic-list-skeleton-line long"></div>
                    </div>
                </div>
            ))}
        </div>
    );
    if (error) return <p style={{color: 'red'}}>{error}</p>;

    return (
        <div className="diagnostics-component">
            <div className={'diagnostics-component-filter'}>
                <DiagnosticsFilterComponent
                    filters={filters}
                    onApply={handleFilterApply}
                />
            </div>
            <div className={'diagnostics-component-maping'}>
                {diagnostics.length === 0 ? (
                    <p className={'diagnostics-component-information'}>No diagnostics found.</p>
                ) : (
                    diagnostics.map(diagnostic => (
                        <DiagnosticsProfileComponent key={diagnostic.id} diagnostic={diagnostic}/>
                    ))
                )}
            </div>
            <div className={'diagnostics-component-pagination'}>
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

export {DiagnosticsComponent};