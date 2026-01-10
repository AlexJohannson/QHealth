import React, {useEffect, useState} from 'react';
import './BookingDiagnosticsFilterComponent.css';

const BookingDiagnosticsFilterComponent = ({filters, onApply}) => {
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
            diagnostic_service: '',
            order: '',
        };
        setLocalFilters(cleared);
        onApply(cleared);
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
                        <div className={'booking-diagnostic-filter-field'}>
                            <label className={'booking-diagnostic-filter-field-label'}>Patient Name</label>
                            <input
                                type={'text'}
                                placeholder={'Patient Name'}
                                value={localFilters.patient_name}
                                onChange={(e) => handleChange('patient_name', e.target.value)}
                            />
                        </div>
                        <div className={'booking-diagnostic-filter-field'}>
                            <label className={'booking-diagnostic-filter-field-label'}>Patient Surname</label>
                            <input
                                type={'text'}
                                placeholder={'Patient Surname'}
                                value={localFilters.patient_surname}
                                onChange={(e) => handleChange('patient_surname', e.target.value)}
                            />
                        </div>
                    </>
                )}
                <div className={'booking-diagnostic-filter-field'}>
                    <label className={'booking-diagnostic-filter-field-label'}>Diagnostic</label>
                <input
                    type={'text'}
                    placeholder={'Diagnostic Service'}
                    value={localFilters.diagnostic_service}
                    onChange={(e) => handleChange('diagnostic_service', e.target.value)}
                />
                </div>
                <div className={'booking-diagnostic-filter-field'}>
                    <label className={'booking-diagnostic-filter-field-label'}>Ordering</label>
                <select
                    value={localFilters.order}
                    onChange={(e) => handleChange('order', e.target.value)}
                >
                    <option value={''}>Order by ID</option>
                    <option value={'id'}>ID ascending</option>
                    <option value={'-id'}>ID descending</option>
                </select>
                </div>
                <button className={'booking-diagnostics-form-filter-component-button'} type="submit">
                    <img src={'/img/filter.png'} alt="filter icon" className="booking-diagnostic-filter-icon" />
                </button>
                <button
                    className={'booking-diagnostics-form-filter-component-button'}
                    type="button"
                    onClick={handleClear}
                >
                    <img src={'/img/clear.png'} alt="filter icon" className="booking-diagnostic-filter-icon" />
                </button>
            </form>
        </div>
    );
};

export {BookingDiagnosticsFilterComponent};