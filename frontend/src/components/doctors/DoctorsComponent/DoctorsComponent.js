import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from "react-router-dom";
import { roleService } from "../../../services/roleService";
import { DoctorsProfileComponent } from "../DoctorsProfileComponent/DoctorsProfileComponent";
import { PaginationComponent } from "../../PaginationComponent/PaginationComponent";
import './DoctorsComponent.css';
import {DoctorsFilterComponent} from "../DoctorsFilterComponet/DoctorsFilterComponent";

const DoctorsComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const page = Number(searchParams.get("page")) || 1;
    const size = Number(searchParams.get("size")) || 5;

    const filtersFromUrl = {
        icontains_name: searchParams.get("icontains_name") || "",
        icontains_surname: searchParams.get("icontains_surname") || "",
        icontains_specialty: searchParams.get("icontains_specialty") || "",
        order: searchParams.get("order") || "",
    };

    const [filters, setFilters] = useState(filtersFromUrl);

    const [doctors, setDoctors] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const patientId = new URLSearchParams(location.search).get('patientId');

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
        const fetchDoctors = async () => {
            setLoading(true);
            try {
                const data = await roleService.getListOfDoctors({
                    page,
                    size,
                    ...filtersFromUrl,
                });

                setDoctors(data.data);
                setTotalPages(data.total_pages);
            } catch {
                setError("Could not load list of doctors");
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, [searchParams]);

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
        <div className="doctors-skeleton-container">
            {[...Array(size)].map((_, idx) => (
                <div key={idx} className="doctor-skeleton-item">
                    <div className="doctor-skeleton-avatar"></div>
                    <div className="doctor-skeleton-info">
                        <div className="doctor-skeleton-line short"></div>
                        <div className="doctor-skeleton-line long"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="doctors-component">
            <div className="doctors-component-filter">
                <DoctorsFilterComponent
                    filters={filters}
                    onApply={handleFilterApply}
                />
            </div>

            <div className="doctors-component-maping">
                {doctors.length === 0 ? (
                    <p className="doctors-component-maping-information">
                        No doctors found
                    </p>
                ) : (
                    doctors.map(doctor => (
                        <DoctorsProfileComponent
                            key={doctor.id}
                            doctor={doctor}
                            patientId={patientId}
                        />
                    ))
                )}
            </div>

            <div className="doctors-component-pagination">
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

export { DoctorsComponent };
