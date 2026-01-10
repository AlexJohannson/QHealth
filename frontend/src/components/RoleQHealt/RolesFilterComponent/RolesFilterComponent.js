import React, {useEffect, useState} from 'react';
import './RoleFilterComponent.css';

const RolesFilterComponent = ({filters, onApply}) => {
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
            icontains_role: '',
            icontains_specialty: '',
            order: '',
        };
        setLocalFilters(cleared);
        onApply(cleared);
    };

    return (
        <form className={'role-filter'} onSubmit={handleSubmit}>
            <div className={'roles-filter-field'}>
                <label className={'role-filter-field-label'}>Role Name</label>
            <input
                type="text"
                placeholder="Search Roles Name"
                value={localFilters.icontains_name}
                onChange={(e) => handleChange('icontains_name', e.target.value)}
            />
            </div>
            <div className={'roles-filter-field'}>
                <label className={'role-filter-field-label'}>Role Surname</label>
            <input
                type="text"
                placeholder="Search Roles Surname"
                value={localFilters.icontains_surname}
                onChange={(e) => handleChange('icontains_surname', e.target.value)}
            />
            </div>
            <div className={'roles-filter-field'}>
                <label className={'role-filter-field-label'}>Search Roles</label>
            <input
                type="text"
                placeholder="Search Roles"
                value={localFilters.icontains_role}
                onChange={(e) => handleChange('icontains_role', e.target.value)}
            />
            </div>
            <div className={'roles-filter-field'}>
                <label className={'role-filter-field-label'}>Specialty for doctors</label>
            <input
                type="text"
                placeholder="Search Specialty"
                value={localFilters.icontains_specialty}
                onChange={(e) => handleChange('icontains_specialty', e.target.value)}
            />
            </div>
            <div className={'roles-filter-field'}>
                <label className={'role-filter-field-label'}>Ordering filter</label>
            <select
                value={localFilters.order}
                onChange={(e) => handleChange('order', e.target.value)}
            >
                <option value="">Order by ID</option>
                <option value="id">ID ascending</option>
                <option value="-id">ID descending</option>
            </select>
            </div>
            <button className={'role-filter-button'} type="submit">
                <img src={'/img/filter.png'} alt="filter icon" className="staff-filter-icon"/>
            </button>
            <button
                className={'role-filter-button'}
                type="button"
                onClick={handleClear}
            >
                <img src={'/img/clear.png'} alt="filter icon" className="staff-filter-icon"/>
            </button>
        </form>
    );
};

export {RolesFilterComponent};