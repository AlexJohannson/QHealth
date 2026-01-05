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
    const page = Number(searchParams.get("page")) || 1;
    const size = Number(searchParams.get("size")) || 5;
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const filtersFromUrl = {
        icontains_name: searchParams.get("icontains_name") || "",
        icontains_surname: searchParams.get("icontains_surname") || "",
        icontains_role: searchParams.get("icontains_role") || "",
        icontains_specialty: searchParams.get("icontains_specialty") || "",
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
        const fetchRoles = async () => {
            setLoading(true);
            try {
                const data = await roleService.getAll({
                    page,
                    size,
                    ...filtersFromUrl,
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
                <RolesFilterComponent
                    filters={filters}
                    onApply={handleFilterApply}
                />
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