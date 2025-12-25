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
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [size, setSize] = useState(Number(searchParams.get("size")) || 5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [trigger, setTrigger] = useState(null);
    const [filters, setFilters] = useState({
        modality: searchParams.get("modality") || "",
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
        const fetchDiagnostics = async () => {
            setLoading(true);
            try {
                const data = await diagnosticsService.getAllDiagnosticsService({
                    page,
                    size,
                    ...filters,
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
    }, [page, size, trigger, filters]);


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
                <DiagnosticsFilterComponent onFilter={handleFilter}/>
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