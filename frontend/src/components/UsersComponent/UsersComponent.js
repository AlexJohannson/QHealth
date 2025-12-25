import React, {useEffect, useState} from 'react';
import {userService} from '../../services/userService';
import {PaginationComponent} from "../PaginationComponent/PaginationComponent";
import {UserProfileComponent} from "./UserProfileComponent/UserProfileComponent";
import {UsersFilterComponent} from "./UserFilterComponent/UserFilterComponent";
import './UsersComponet.css';
import { useSearchParams } from "react-router-dom";



const UsersComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [size, setSize] = useState(Number(searchParams.get("size")) || 5);
    const [totalPages, setTotalPages] = useState(1);
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
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await userService.getAll({
                    page,
                    size,
                    ...filters,
                });
                setUsers(data.data);
                setTotalPages(data.total_pages);
            } catch (e) {
                setError('Could not load users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
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
        <div className="users-skeleton-container">
            {[...Array(size)].map((_, idx) => (
                <div key={idx} className="user-skeleton-item">
                    <div className="user-skeleton-avatar"></div>
                    <div className="user-skeleton-info">
                        <div className="user-skeleton-line short"></div>
                        <div className="user-skeleton-line long"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    if (error) return <p style={{color: 'red'}}>{error}</p>;

    return (
        <div className="users-component-container">
            <div className="users-component-container-filter">
                <UsersFilterComponent onFilter={handleFilter}/>
            </div>
            <div className='users-component-container-maping'>
                {users.length === 0 ? (
                    <p className={'users-component-container-information'}>No users found.</p>
                ) : (
                    users.map(user => (
                        <UserProfileComponent key={user.id} user={user}/>
                    ))
                )}
            </div>
            <div className="users-component-container-pagination">
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

export {UsersComponent};