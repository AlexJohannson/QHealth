import React, {useState} from 'react';
import './BookingDoctorFilterComponent.css';

const BookingDoctorFilterComponent = ({onFilter}) => {
    const [filter, setFilter] = useState({
        patient_name: '',
        patient_surname: '',
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

    const handleClear = () => {
        setFilter(
            {
                patient_name: '',
                patient_surname: '',
                specialty: '',
                doctor_name: '',
                doctor_surname: '',
                order: '',
                status: '',
            });
        onFilter({});
    };

    const isSuperUser = localStorage.getItem('is_superuser') === 'true';
    const isStaff = localStorage.getItem('is_staff') === 'true';
    const role = localStorage.getItem('role');

    const canSeeInputPatientNameOrSurname = isSuperUser || isStaff || role === 'operator' || role === 'doctor';


    return (
        <div>
            <form className={'booking-doctor-filter-component-form'} onSubmit={handleSubmit}>
                {canSeeInputPatientNameOrSurname && (
                    <>
                        <input
                            type={'text'}
                            placeholder={'Patient Name'}
                            value={filter.patient_name}
                            onChange={(e) => setFilter({...filter, patient_name: e.target.value})}
                        />
                        <input
                            type={'text'}
                            placeholder={'Patient Surname'}
                            value={filter.patient_surname}
                            onChange={(e) => setFilter({...filter, patient_surname: e.target.value})}
                        />
                    </>
                )}
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
                        onChange={(e) => setFilter({...filter, status: e.target.value})}
                >
                    <option value={''}>Status</option>
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
                <button
                    className={'booking-doctor-filter-component-form-button'}
                    type="button"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </form>
        </div>
    );
};

export {BookingDoctorFilterComponent};