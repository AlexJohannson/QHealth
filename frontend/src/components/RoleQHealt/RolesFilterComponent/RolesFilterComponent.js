import React, {useState} from 'react';
import './RoleFilterComponent.css';

const RolesFilterComponent = ({onFilter}) => {
    const [filter, setFilter] = useState({
        icontains_name: '',
        icontains_surname: '',
        icontains_role: '',
        icontains_specialty: '',
        order: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleaned = Object.fromEntries(
            Object.entries(filter).filter(([_, value]) => value !== '' && value !== null)
        );
        onFilter(cleaned);
    };

    return (
        <form className={'role-filter'} onSubmit={handleSubmit}>
             <input
                type="text"
                placeholder="Search Roles Name"
                value={filter.icontains_name}
                onChange={(e) => setFilter({...filter, icontains_name: e.target.value})}
            />
            <input
                type="text"
                placeholder="Search Roles Surname"
                value={filter.icontains_surname}
                onChange={(e) => setFilter({...filter, icontains_surname: e.target.value})}
            />
            <input
                type="text"
                placeholder="Search Roles"
                value={filter.icontains_role}
                onChange={(e) => setFilter({...filter, icontains_role: e.target.value})}
            />
            <input
                type="text"
                placeholder="Search Specialty"
                value={filter.icontains_specialty}
                onChange={(e) => setFilter({...filter, icontains_specialty: e.target.value})}
            />
            <select
                value={filter.order}
                onChange={(e) => setFilter({...filter, order: e.target.value})}
            >
                <option value="">Order by ID</option>
                <option value="id">ID ascending</option>
                <option value="-id">ID descending</option>
            </select>
            <button className={'role-filter-button'} type="submit">Apply</button>
        </form>
    );
};

export {RolesFilterComponent};