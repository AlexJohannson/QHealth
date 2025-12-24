import React, {useState} from 'react';
import './BookingDiagnosticsFilterComponent.css';

const BookingDiagnosticsFilterComponent = ({onFilter}) => {
    const [filter, setFilter] = useState({
        patient_name: '',
        patient_surname: '',
        diagnostic_service: '',
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
                patient_name: '',
                patient_surname: '',
                diagnostic_service: '',
                order: '',
            });
        onFilter({});
    };

    const isSuperUser = localStorage.getItem('is_superuser') === 'true';
    const isStaff = localStorage.getItem('is_staff') === 'true';
    const role = localStorage.getItem('role');

    const canSeeInputNameOrSurname = isSuperUser || isStaff || role === 'operator' || role === 'doctor';


    return (
        <div>
            <form className={'booking-diagnostics-form-filter-component'} onSubmit={handleSubmit}>
                {canSeeInputNameOrSurname && (
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
                    placeholder={'Diagnostic Service'}
                    value={filter.diagnostic_service}
                    onChange={(e) => setFilter({...filter, diagnostic_service: e.target.value})}
                />
                <select
                    value={filter.order}
                    onChange={(e) => setFilter({...filter, order: e.target.value})}
                >
                    <option value={''}>Order by ID</option>
                    <option value={'id'}>ID ascending</option>
                    <option value={'-id'}>ID descending</option>
                </select>
                <button className={'booking-diagnostics-form-filter-component-button'} type="submit">Apply</button>
                <button
                    className={'booking-diagnostics-form-filter-component-button'}
                    type="button"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </form>
        </div>
    )
        ;
};

export {BookingDiagnosticsFilterComponent};