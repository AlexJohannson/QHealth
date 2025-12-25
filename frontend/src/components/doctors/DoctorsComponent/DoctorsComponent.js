import React, {useEffect, useState} from 'react';
import {roleService} from "../../../services/roleService";
import {DoctorsProfileComponent} from "../DoctorsProfileComponent/DoctorsProfileComponent";
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import {DoctorsFilterComponent} from "../DoctorsFilterComponet/DoctorsFilterComponent";
import {useLocation} from "react-router-dom";
import './DoctorsComponent.css';
import { useSearchParams } from "react-router-dom";


const DoctorsComponent = () => {
    const [searchParam, setSearchParam] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [page, setPage] = useState(Number(searchParam.get("page")) || 1);
    const [size, setSize] = useState(Number(searchParam.get("size")) || 5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const patientId = searchParams.get('patientId');
    const [filters, setFilters] = useState({
        icontains_name: searchParam.get("icontains_name") || "",
        icontains_surname: searchParam.get("icontains_surname") || "",
        icontains_specialty: searchParam.get("icontains_specialty") || "",
        order: searchParams.get("order") || "",
    });

    const updateQueryParams = (params) => {
        const cleaned = {};

        Object.entries(params).forEach(([key, value]) => {
            if (value !== "" && value !== null && value !== undefined) {
                cleaned[key] = value;
            }
        });

        setSearchParam(cleaned);
    };



    useEffect(() => {
        const fetchDoctors = async () => {
            setLoading(true);
            try {
                const data = await roleService.getListOfDoctors({
                    page,
                    size,
                    ...filters,
                });
                setDoctors(data.data);
                setTotalPages(data.total_pages);
            } catch (error) {
                setError('Could not load list of doctors');
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
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
    if (error) return <p style={{color: 'red'}}>{error}</p>;


    return (
        <div className={'doctors-component'}>
            <div className={'doctors-component-filter'}>
                <DoctorsFilterComponent onFilter={handleFilter}/>
            </div>
            <div className={'doctors-component-maping'}>
                {doctors.length === 0 ? (
                    <p className={'doctors-component-maping-information'}>No doctors found</p>
                ) : (
                    doctors.map((doctor) => (
                        <DoctorsProfileComponent key={doctor.id} doctor={doctor} patientId={patientId} />
                    ))
                )}
            </div>
            <div className={'doctors-component-pagination'}>
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

export {DoctorsComponent};