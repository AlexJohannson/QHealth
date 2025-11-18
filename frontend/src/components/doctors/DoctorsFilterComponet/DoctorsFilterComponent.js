import React, {useState} from 'react';
import './DoctorsFilterComponent.css';

const DoctorsFilterComponent = ({onFilter}) => {
    const [filter, setFilter] = useState({
        icontains_specialty: '',
        order: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleaned = Object.fromEntries(
            Object.entries(filter).filter(([_, value]) => value !== '' && value !== null)
        );
        onFilter(cleaned);
    }



    return (
        <div>
            <form className={'doctor-filter-component'} onSubmit={handleSubmit}>
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
            <button className={'doctor-filter-component-button'} type="submit">Apply</button>
            </form>
        </div>
    );
};

export {DoctorsFilterComponent};