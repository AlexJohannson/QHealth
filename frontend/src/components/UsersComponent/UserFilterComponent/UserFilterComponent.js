import React, {useState} from 'react';
import './UserFilterComponent.css';

const UsersFilterComponent = ({onFilter}) => {
    const [filters, setFilters] = useState({
        icontains_name: '',
        icontains_surname: '',
        min_age: '',
        max_age: '',
        date_of_birth: '',
        icontains_city: '',
        icontains_country: '',
        gender: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleaned = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== '' && value !== null)
        );
        onFilter(cleaned);
    };

    return (
        <form  className={'user-filter'} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={filters.icontains_name}
                onChange={(e) => setFilters({...filters, icontains_name: e.target.value})}
            />
            <input
                type="text"
                placeholder="Surname"
                value={filters.icontains_surname}
                onChange={(e) => setFilters({...filters, icontains_surname: e.target.value})}
            />
            <input
                type="number"
                placeholder="Min Age"
                value={filters.min_age}
                onChange={(e) => setFilters({...filters, min_age: e.target.value})}
            />
            <input
                type="number"
                placeholder="Max Age"
                value={filters.max_age}
                onChange={(e) => setFilters({...filters, max_age: e.target.value})}
            />
            <input
                type="date"
                placeholder="Date of Birth"
                value={filters.date_of_birth}
                onChange={(e) => setFilters({...filters, date_of_birth: e.target.value})}
            />
            <input
                type="text"
                placeholder="City"
                value={filters.icontains_city}
                onChange={(e) => setFilters({...filters, icontains_city: e.target.value})}
            />
            <input
                type="text"
                placeholder="Country"
                value={filters.icontains_country}
                onChange={(e) => setFilters({...filters, icontains_country: e.target.value})}
            />
            <select
                value={filters.gender}
                onChange={(e) => setFilters({...filters, gender: e.target.value})}
            >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <button className={'user-filter-component-button'} type="submit">Apply filters</button>
        </form>
    );
};

export {UsersFilterComponent};