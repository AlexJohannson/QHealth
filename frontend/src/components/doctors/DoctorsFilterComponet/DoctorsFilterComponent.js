import React, {useState} from 'react';
import './DoctorsFilterComponent.css';

const DoctorsFilterComponent = ({onFilter}) => {
    const [filter, setFilter] = useState({
        icontains_name: '',
        icontains_surname: '',
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

    const handleClear = () => {
        setFilter(
            {
                icontains_name: '',
                icontains_surname: '',
                icontains_specialty: '',
                order: '',
            });
        onFilter({});
    };


    return (
        <div>
            <form className={'doctor-filter-component'} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search Doctor Name"
                    value={filter.icontains_name}
                    onChange={(e) => setFilter({...filter, icontains_name: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Search Doctor Surname"
                    value={filter.icontains_surname}
                    onChange={(e) => setFilter({...filter, icontains_surname: e.target.value})}
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
                <button className={'doctor-filter-component-button'} type="submit">Apply</button>
                <button
                    className={'doctor-filter-component-button'}
                    type="button"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </form>
        </div>
    );
};

export {DoctorsFilterComponent};