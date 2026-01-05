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
    const page = Number(searchParams.get("page")) || 1;
    const size = Number(searchParams.get("size")) || 5;
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [trigger, setTrigger] = useState(null);
    const filtersFromUrl = {
        patient_name: searchParams.get("patient_name") || "",
        patient_surname: searchParams.get("patient_surname") || "",
        diagnosis: searchParams.get("diagnosis") || "",
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
        const fetchJournals = async () => {
            setLoading(true);
            try {
                const data = await patientJournal.getAllPatientJournal({
                    page,
                    size,
                    ...filtersFromUrl,
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
    }, [trigger, searchParams]);


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
                <PatientJournalFilter
                    filters={filters}
                    onApply={handleFilterApply}
                />
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