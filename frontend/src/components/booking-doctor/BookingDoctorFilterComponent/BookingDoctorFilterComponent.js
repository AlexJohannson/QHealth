import React, {useState} from 'react';
import './BookingDoctorFilterComponent.css';

const BookingDoctorFilterComponent = ({onFilter}) => {
    const [filter, setFilter] = useState({
        specialty: '',
        doctor_name: '',
        doctor_surname: '',
        order: '',
        status: '',
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
            <form className={'booking-doctor-filter-component-form'} onSubmit={handleSubmit}>
                <input
                    type={'text'}
                    placeholder={'Specialty'}
                    value={filter.specialty}
                    onChange={(e) => setFilter({...filter, specialty: e.target.value})}
                />
                <input
                    type={'text'}
                    placeholder={'Doctor Name'}
                    value={filter.doctor_name}
                    onChange={(e) => setFilter({...filter, doctor_name: e.target.value})}
                />
                 <input
                    type={'text'}
                    placeholder={'Doctor Surname'}
                    value={filter.doctor_surname}
                    onChange={(e) => setFilter({...filter, doctor_surname: e.target.value})}
                />
                <select value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                >
                    <option value={''}>Status Booked : Cancelled</option>
                    <option value={'booked'}>Booked</option>
                    <option value={'cancelled'}>Cancelled</option>
                </select>
                <select
                    value={filter.order}
                    onChange={(e) => setFilter({...filter, order: e.target.value})}
                >
                    <option value={''}>Order by ID</option>
                    <option value={'id'}>ID ascending</option>
                    <option value={'-id'}>ID descending</option>
                </select>
                <button className={'booking-doctor-filter-component-form-button'} type="submit">Apply</button>
            </form>
        </div>
    );
};

export {BookingDoctorFilterComponent};