import React, {useEffect, useState} from 'react';
import {userService} from "../../../services/userService";
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import {PatientProfileComponent} from "../PatientProfileComponent/PatientProfileComponent";
import {UsersFilterComponent} from "../../UsersComponent/UserFilterComponent/UserFilterComponent";
import './PatientComponent.css';
import { useSearchParams } from "react-router-dom";

const PatientsComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [patients, setPatient] = useState([]);
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [size, setSize] = useState(Number(searchParams.get("size")) || 5);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        icontains_name: searchParams.get("icontains_name") || "",
        icontains_surname: searchParams.get("icontains_surname") || "",
        min_age: searchParams.get("min_age") || "",
        max_age: searchParams.get("max_age") || "",
        date_of_birth: searchParams.get("date_of_birth") || "",
        icontains_city: searchParams.get("icontains_city") || "",
        icontains_country: searchParams.get("icontains_country") || "",
        gender: searchParams.get("gender") || "",
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
        const fetchPatient = async () => {
            setLoading(true);
            try {
                const data = await userService.getAllPatientCard({
                    page,
                    size,
                    ...filters,
                });
                setPatient(data.data);
                setTotalPage(data.total_pages);
            } catch (error) {
                setError('Could not load patient');
            } finally {
                setLoading(false);
            }
        };
        fetchPatient();
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
        <div className="patients-skeleton-container">
            {[...Array(size)].map((_, idx) => (
                <div key={idx} className="patient-skeleton-item">
                    <div className="patient-skeleton-avatar"></div>
                    <div className="patient-skeleton-info">
                        <div className="patient-skeleton-line short"></div>
                        <div className="patient-skeleton-line long"></div>
                    </div>
                </div>
            ))}
        </div>
    );
    if (error) return <p style={{color: 'red'}}>{error}</p>;


    return (
        <div className={'patients-card-component'}>
            <div className={'patient-card-filter'}>
                <UsersFilterComponent onFilter={handleFilter}/>
            </div>
            <div className={'patient-card-maping'}>
            {patients.length === 0 ? (
                    <p className={'patient-card-information'}>No patients found.</p>
                ) : (
                    patients.map(patient => (
                        <PatientProfileComponent key={patient.id} patient={patient}/>
                    ))
                )}
            </div>
            <div className={'patient-card-pagination'}>
                <PaginationComponent
                    page={page}
                    totalPages={totalPage}
                    size={size}
                    onPageChange={handlePageChange}
                    onSizeChange={handleSizeChange}
                />
            </div>
        </div>
    )
};


export {PatientsComponent};