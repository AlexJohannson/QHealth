import React, {useState} from 'react';
import './PatientJournalFilter.css';

const PatientJournalFilter = ({onFilter}) => {
    const [filter, setFilter] = useState({
        patient_name: '',
        patient_surname: '',
        diagnosis: '',
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
                diagnosis: '',
            });
        onFilter({});
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
                    placeholder={'Search Diagnosis'}
                    value={filter.diagnosis}
                    onChange={(e) => setFilter({...filter, diagnosis: e.target.value})}
                />
                <button className={'patient-journal-filter-component-button'} type="submit">Apply</button>
                <button
                    className={'patient-journal-filter-component-button'}
                    type="button"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </form>
        </div>
    );
};

export {PatientJournalFilter};