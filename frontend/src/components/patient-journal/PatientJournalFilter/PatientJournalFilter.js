import React, {useEffect, useState} from 'react';
import './PatientJournalFilter.css';

const PatientJournalFilter = ({filters, onApply}) => {
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
            <form className={'patient-journal-filter-component'} onSubmit={handleSubmit}>
                {canSeeInputPatientNameOrSurname && (
                    <>
                        <div className={'patient-journal-filter-fields'}>
                            <label className={'patient-journal-filter-fields-label'}>Patient Name</label>
                            <input
                                type={'text'}
                                placeholder={'Patient Name'}
                                value={localFilters.patient_name}
                                onChange={(e) => handleChange('patient_name', e.target.value)}
                            />
                        </div>
                        <div className={'patient-journal-filter-fields'}>
                            <label className={'patient-journal-filter-fields-label'}>Patient Surname</label>
                            <input
                                type={'text'}
                                placeholder={'Patient Surname'}
                                value={localFilters.patient_surname}
                                onChange={(e) => handleChange('patient_surname', e.target.value)}
                            />
                        </div>
                    </>
                )}
                <div className={'patient-journal-filter-fields'}>
                    <label className={'patient-journal-filter-fields-label'}>Diagnosis</label>
                    <input
                        type={'text'}
                        placeholder={'Search Diagnosis'}
                        value={localFilters.diagnosis}
                        onChange={(e) => handleChange('diagnosis', e.target.value)}
                    />
                </div>
                <button className={'patient-journal-filter-component-button'} type="submit">
                    <img src={'/img/filter.png'} alt="filter" className={'patient-journal-filter-icon'} />
                </button>
                <button
                    className={'patient-journal-filter-component-button'}
                    type="button"
                    onClick={handleClear}
                >
                    <img src={'/img/clear.png'} alt="clear icon" className="patient-journal-filter-icon" />
                </button>
            </form>
        </div>
    );
};

export {PatientJournalFilter};