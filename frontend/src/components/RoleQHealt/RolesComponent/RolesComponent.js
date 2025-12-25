import React, {useEffect, useState} from 'react';
import {roleService} from "../../../services/roleService";
import {RolesProfileComponent} from "../RolesProfileComponent/RolesProfileComponent";
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import {RolesFilterComponent} from "../RolesFilterComponent/RolesFilterComponent";
import './RolesComponent.css';
import { useSearchParams } from "react-router-dom";


const RolesComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [roles, setRoles] = useState([]);
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [size, setSize] = useState(Number(searchParams.get("size")) || 5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        icontains_name: searchParams.get("icontains_name") || "",
        icontains_surname: searchParams.get("icontains_surname") || "",
        icontains_role: searchParams.get("icontains_role") || "",
        icontains_specialty: searchParams.get("icontains_specialty") || "",
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
        const fetchRoles = async () => {
            setLoading(true);
            try {
                const data = await roleService.getAll({
                    page,
                    size,
                    ...filters,
                });
                setRoles(data.data);
                setTotalPages(data.total_pages);
            } catch (error) {
                setError('Could not load roles.');
            } finally {
                setLoading(false);
            }
        };
        fetchRoles();
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
        <div className="role-skeleton-container">
            {[...Array(size)].map((_, idx) => (
                <div key={idx} className="role-skeleton-item">
                    <div className="role-skeleton-avatar"></div>
                    <div className="role-skeleton-info">
                        <div className="role-skeleton-line short"></div>
                        <div className="role-skeleton-line long"></div>
                    </div>
                </div>
            ))}
        </div>
    );
    if (error) return <p style={{color: 'red'}}>{error}</p>;




    return (
        <div className="roles-component-container">
            <div className="roles-component-filter">
                <RolesFilterComponent onFilter={handleFilter}/>
            </div>
            <div className={'roles-component-maping'}>
                {roles.length === 0 ? (
                    <p className={'role-component-container-information'}>No roles found</p>
                ) : (
                    roles.map(role => (
                        <RolesProfileComponent key={role.id} role={role}/>
                    ))
                )}
            </div>
            <div className={'roles-component-pagination'}>
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

export {RolesComponent};