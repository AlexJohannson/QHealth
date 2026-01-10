import React, {useEffect, useState} from 'react';
import './SickLeavesFilter.css';

const SickLeavesFilter = ({filters, onApply}) => {
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
                diagnosis: '',
                order: '',
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
            <form className={'sick-leaves-form-filter'} onSubmit={handleSubmit}>
                {canSeeInputPatientNameOrSurname && (
                    <>
                        <div className={'sick-leave-filter-field'}>
                            <label className={'sick-leave-filter-field-label'}>Patient Name</label>
                        <input
                            type={'text'}
                            placeholder={'Search Patient Name'}
                            value={localFilters.patient_name}
                            onChange={(e) => handleChange('patient_name', e.target.value)}
                        />
                        </div>
                        <div className={'sick-leave-filter-field'}>
                            <label className={'sick-leave-filter-field-label'}>Patient Surname</label>
                        <input
                            type={'text'}
                            placeholder={'Search Patient Surname'}
                            value={localFilters.patient_surname}
                            onChange={(e) => handleChange('patient_surname', e.target.value)}
                        />
                        </div>
                    </>
                )}
                <div className={'sick-leave-filter-field'}>
                    <label className={'sick-leave-filter-field-label'}>Diagnosis</label>
                <input
                    type={'text'}
                    placeholder={'Search Diagnosis'}
                    value={localFilters.diagnosis}
                    onChange={(e) => handleChange('diagnosis', e.target.value)}
                />
                </div>
                <div className={'sick-leave-filter-field'}>
                    <label className={'sick-leave-filter-field-label'}>Order ID</label>
                <select
                    value={localFilters.order}
                    onChange={(e) => handleChange('order', e.target.value)}
                >
                    <option value={''}>Order by ID</option>
                    <option value={'id'}>ID ascending</option>
                    <option value={'-id'}>ID descending</option>
                </select>
                </div>
                <button className={'sick-leaves-form-button'} type="submit">
                    <img src={'/img/filter.png'} alt="filter icon" className={'sick-leave-filter-icon'} />
                </button>
                <button
                    className={'sick-leaves-form-button'}
                    type="button"
                    onClick={handleClear}
                >
                    <img src={'/img/clear.png'} alt={'clear icon'} className={'sick-leave-filter-icon'}/>
                </button>
            </form>
        </div>
    );
};

export {SickLeavesFilter};