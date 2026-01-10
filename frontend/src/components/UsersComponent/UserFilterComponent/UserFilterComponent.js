import React, {useEffect, useState} from 'react';
import './UserFilterComponent.css';

const UsersFilterComponent = ({filters, onApply}) => {
    const [localFilters, setLocalFilters] = useState(filters);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleChange = (field, value) => {
        setLocalFilters(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onApply(localFilters);
    };

    const handleClear = () => {
        const cleared = {
            icontains_name: '',
            icontains_surname: '',
            min_age: '',
            max_age: '',
            date_of_birth: '',
            icontains_city: '',
            icontains_country: '',
            gender: '',
        };
        setLocalFilters(cleared);
        onApply(cleared);
    };

    return (
        <form className={'user-filter'} onSubmit={handleSubmit}>
            <div className={'users-filter-field'}>
                <label className={'users-filter-field-label'}>Name</label>
                <input
                    type="text"
                    placeholder="Name"
                    value={localFilters.icontains_name}
                    onChange={(e) => handleChange('icontains_name', e.target.value)}
                />
            </div>
            <div className={'users-filter-field'}>
                <label className={'users-filter-field-label'}>Surname</label>
                <input
                    type="text"
                    placeholder="Surname"
                    value={localFilters.icontains_surname}
                    onChange={(e) => handleChange('icontains_surname', e.target.value)}
                />
            </div>
            <div className={'users-filter-field'}>
                <label className={'users-filter-field-label'}>Min Age</label>
                <input
                    type="number"
                    placeholder="Min Age"
                    value={localFilters.min_age}
                    onChange={(e) => handleChange('min_age', e.target.value)}
                />
            </div>
            <div className={'users-filter-field'}>
                <label className={'users-filter-field-label'}>Mix Age</label>
                <input
                    type="number"
                    placeholder="Max Age"
                    value={localFilters.max_age}
                    onChange={(e) => handleChange('max_age', e.target.value)}
                />
            </div>
            <div className={'users-filter-field'}>
                <label className={'users-filter-field-label'}>Date of Birth</label>
                <input
                    type="date"
                    placeholder="Date of Birth"
                    value={localFilters.date_of_birth}
                    onChange={(e) => handleChange('date_of_birth', e.target.value)}
                />
            </div>
            <div className={'users-filter-field'}>
                <label className={'users-filter-field-label'}>City</label>
                <input
                    type="text"
                    placeholder="City"
                    value={localFilters.icontains_city}
                    onChange={(e) => handleChange('icontains_city', e.target.value)}
                />
            </div>
            <div className={'users-filter-field'}>
                <label className={'users-filter-field-label'}>Country</label>
                <input
                    type="text"
                    placeholder="Country"
                    value={localFilters.icontains_country}
                    onChange={(e) => handleChange('icontains_country', e.target.value)}
                />
            </div>
            <div className={'users-filter-field'}>
                <label className={'users-filter-field-label'}>Gender</label>
                <select
                    value={localFilters.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                >
                    <option value="">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <button className={'user-filter-component-button'} type="submit">
                <img src={'/img/filter.png'} alt="filter icon" className="user-filter-icon"/>
            </button>
            <button
                className={'user-filter-component-button'}
                type="button"
                onClick={handleClear}
            >
                <img src={'/img/clear.png'} alt="clear icon" className="user-filter-icon"/>
            </button>
        </form>
    );
};

export {UsersFilterComponent};