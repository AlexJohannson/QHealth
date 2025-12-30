import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {sickLeaveService} from "../../../services/sickLeaveService";
import {SickLeavesFilter} from "../SickLeavesFilter/SickLeavesFilter";
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import {SickLeavesProfile} from "../SickLeavesProfile/SickLeavesProfile";
import './SickLeavesComponent.css';



const SickLeavesComponent = () => {
    const[searchParams, setSearchParams] = useSearchParams();
    const [sickLeave, setSickLeave] = useState([]);
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [size, setSize] = useState(Number(searchParams.get("size")) || 5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        patient_name: searchParams.get("patient_name") || "",
        patient_surname: searchParams.get("patient_surname") || "",
        diagnosis: searchParams.get("diagnosis") || "",
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
        const fetchSickLeave = async () => {
            setLoading(true);
            try {
                const data = await sickLeaveService.getAllListSickLeaves({
                    page,
                    size,
                    ...filters,
                });
                setSickLeave(data.data);
                setTotalPages(data.total_pages);
            } catch (error) {
                setError('Could not load sick leaves');
            } finally {
                setLoading(false);
            }
        };
        fetchSickLeave();
    }, [page, size, filters]);

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
        <div className="sick-leaves-skeleton-container">
            {[...Array(size)].map((_, idx) => (
                <div key={idx} className="sick-leaves-skeleton-item">
                    <div className="sick-leaves-skeleton-avatar"></div>
                    <div className="sick-leaves-skeleton-info">
                        <div className="sick-leaves-skeleton-line short"></div>
                        <div className="sick-leaves-skeleton-line long"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    if (error) return <p style={{color: 'red'}}>{error}</p>;

    return (
        <div className={'patient-sick-leaves-container'}>
            <div className={'patient-sick-leaves-container-filter'}>
                <SickLeavesFilter onFilter={handleFilter}/>
            </div>
            <div className={'patient-sick-leaves-container-maping'}>
                {sickLeave.length === 0 ? (
                    <p className={'patient-sick-leaves-container-maping-error'}>No patients sick leaves found.</p>
                ) : (
                    sickLeave.map((sick) => (
                        <SickLeavesProfile key={sick.id} sick={sick}/>
                    ))
                )}
            </div>
            <div className={'patient-sick-leaves-container-pagination'}>
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

export {SickLeavesComponent};