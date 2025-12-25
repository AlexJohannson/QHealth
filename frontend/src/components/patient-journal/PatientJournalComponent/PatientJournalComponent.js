import React, {useEffect, useState} from 'react';
import './PatientJournalComponent.css';
import {patientJournal} from "../../../services/patientJournal";
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import {PatientJournalProfile} from "../PatientJournalProfile/PatientJournalProfile";
import {socketService} from "../../../services/socketService";
import {PatientJournalFilter} from "../PatientJournalFilter/PatientJournalFilter";
import { useSearchParams } from "react-router-dom";

const PatientJournalComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [journals, setJournals] = useState([]);
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [size, setSize] = useState(Number(searchParams.get("size")) || 5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [trigger, setTrigger] = useState(null);
    const [filters, setFilters] = useState({
        patient_name: searchParams.get("patient_name") || "",
        patient_surname: searchParams.get("patient_surname") || "",
        diagnosis: searchParams.get("diagnosis") || "",
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
        const fetchJournals = async () => {
            setLoading(true);
            try {
                const data = await patientJournal.getAllPatientJournal({
                    page,
                    size,
                    ...filters,
                });
                setJournals(data.data);
                setTotalPages(data.total_pages);
            } catch (error) {
                setError('Could not load journals');
            } finally {
                setLoading(false);
            }
        };
        fetchJournals();
    }, [page, size, trigger, filters]);


    useEffect(() => {
        socketInit().then()
    }, []);


    const socketInit = async () => {
        const service = await socketService();
        const client = service.patientCard();

        client.onopen = () => {
            client.send(JSON.stringify({
                action: 'subscribe_to_patient_card_model_changes',
                request_id: new Date().getTime(),
            }))
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
        <div className="patient-journal-skeleton-container">
            {[...Array(size)].map((_, idx) => (
                <div key={idx} className="patient-journal-skeleton-item">
                    <div className="patient-journal-skeleton-avatar"></div>
                    <div className="patient-journal-skeleton-info">
                        <div className="patient-journal-skeleton-line short"></div>
                        <div className="patient-journal-skeleton-line long"></div>
                    </div>
                </div>
            ))}
        </div>
    );
    if (error) return <p style={{color: 'red'}}>{error}</p>;


    return (
        <div className={'patient-journal-component'}>
            <div className={'patient-journal-component-filter'}>
                <PatientJournalFilter onFilter={handleFilter}/>
            </div>
            <div className={'patient-journal-component-maping'}>
                {journals.length === 0 ? (
                    <p className={'patient-journal-component-maping-information'}>No patients journals found.</p>
                ) : (
                    journals.map((journal) => (
                        <PatientJournalProfile key={journal.id} journal={journal}/>
                    ))
                )}
            </div>
            <div className={'patient-journal-component-pagination'}>
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

export {PatientJournalComponent};