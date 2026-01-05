import React, {useEffect, useState} from 'react';
import './BookingDoctorFilterComponent.css';

const BookingDoctorFilterComponent = ({filters, onApply}) => {
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
                patient_name: '',
                patient_surname: '',
                specialty: '',
                doctor_name: '',
                doctor_surname: '',
                order: '',
                status: '',
            };
            setLocalFilters(cleared);
            onApply(cleared);
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
                        <div className={'booking-doctor-filter-field'}>
                            <label>Patient Name</label>
                        <input
                            type={'text'}
                            placeholder={'Patient Name'}
                            value={localFilters.patient_name}
                            onChange={(e) => handleChange('patient_name', e.target.value)}
                        />
                        </div>
                        <div className={'booking-doctor-filter-field'}>
                            <label>Patient Surname</label>
                        <input
                            type={'text'}
                            placeholder={'Patient Surname'}
                            value={localFilters.patient_surname}
                            onChange={(e) => handleChange('patient_surname', e.target.value)}
                        />
                        </div>
                    </>
                )}
                <div className={'booking-doctor-filter-field'}>
                    <label>Doctor Specialty</label>
                <input
                    type={'text'}
                    placeholder={'Specialty'}
                    value={localFilters.specialty}
                    onChange={(e) => handleChange('specialty', e.target.value)}
                />
                </div>
                <div className={'booking-doctor-filter-field'}>
                    <label>Doctor Name</label>
                <input
                    type={'text'}
                    placeholder={'Doctor Name'}
                    value={localFilters.doctor_name}
                    onChange={(e) => handleChange('doctor_name', e.target.value)}
                />
                </div>
                <div className={'booking-doctor-filter-field'}>
                    <label>Doctor Surname</label>
                <input
                    type={'text'}
                    placeholder={'Doctor Surname'}
                    value={localFilters.doctor_surname}
                    onChange={(e) => handleChange('doctor_surname', e.target.value)}
                />
                </div>
                <div className={'booking-doctor-filter-field-order'}>
                    <label>Ordering Status</label>
                <select value={localFilters.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                >
                    <option value={''}>Status</option>
                    <option value={'booked'}>Booked</option>
                    <option value={'cancelled'}>Cancelled</option>
                </select>
                </div>
                <div className={'booking-doctor-filter-field-order'}>
                    <label>Ordering ID</label>
                <select
                    value={localFilters.order}
                    onChange={(e) => handleChange('order', e.target.value)}
                >
                    <option value={''}>Order by ID</option>
                    <option value={'id'}>ID ascending</option>
                    <option value={'-id'}>ID descending</option>
                </select>
                </div>
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