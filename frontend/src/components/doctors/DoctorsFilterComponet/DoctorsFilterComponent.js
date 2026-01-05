import React, {useEffect, useState} from 'react';
import './DoctorsFilterComponent.css';

const DoctorsFilterComponent = ({filters, onApply}) => {
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
            icontains_name: "",
            icontains_surname: "",
            icontains_specialty: "",
            order: "",
        };
        setLocalFilters(cleared);
        onApply(cleared);
    };

    return (
        <form className="doctor-filter-component" onSubmit={handleSubmit}>

            <div className="doctor-filter-field">
                <label>Doctor Name</label>
                <input
                    type="text"
                    placeholder="Search Doctor Name"
                    value={localFilters.icontains_name}
                    onChange={(e) => handleChange('icontains_name', e.target.value)}
                />
            </div>

            <div className="doctor-filter-field">
                <label>Doctor Surname</label>
                <input
                    type="text"
                    placeholder="Search Doctor Surname"
                    value={localFilters.icontains_surname}
                    onChange={(e) => handleChange('icontains_surname', e.target.value)}
                />
            </div>

            <div className="doctor-filter-field">
                <label>Specialty</label>
                <input
                    type="text"
                    placeholder="Search Specialty"
                    value={localFilters.icontains_specialty}
                    onChange={(e) => handleChange('icontains_specialty', e.target.value)}
                />
            </div>

            <div className="doctor-filter-field">
                <label>Ordering</label>
                <select
                    value={localFilters.order}
                    onChange={(e) => handleChange('order', e.target.value)}
                >
                    <option value="">Order by ID</option>
                    <option value="id">ID ascending</option>
                    <option value="-id">ID descending</option>
                </select>
            </div>

            <button className="doctor-filter-component-button" type="submit">
                Apply
            </button>

            <button
                type="button"
                className="doctor-filter-component-button"
                onClick={handleClear}
            >
                Clear
            </button>

        </form>
    );
};

export {DoctorsFilterComponent};