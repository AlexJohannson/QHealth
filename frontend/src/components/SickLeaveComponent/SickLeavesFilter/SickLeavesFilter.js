import React, {useState} from 'react';
import './SickLeavesFilter.css';

const SickLeavesFilter = ({onFilter}) => {
    const [filter, setFilter] = useState({
        patient_name: '',
        patient_surname: '',
        diagnosis: '',
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
                diagnosis: '',
                order: '',
            });
        onFilter({});
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
                        <input
                            type={'text'}
                            placeholder={'Search Patient Name'}
                            value={filter.patient_name}
                            onChange={(e) => setFilter({...filter, patient_name: e.target.value})}
                        />
                        <input
                            type={'text'}
                            placeholder={'Search Patient Surname'}
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
                <select
                    value={filter.order}
                    onChange={(e) => setFilter({...filter, order: e.target.value})}
                >
                    <option value={''}>Order by ID</option>
                    <option value={'id'}>ID ascending</option>
                    <option value={'-id'}>ID descending</option>
                </select>
                <button className={'sick-leaves-form-button'} type="submit">Apply</button>
                <button
                    className={'sick-leaves-form-button'}
                    type="button"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </form>
        </div>
    );
};

export {SickLeavesFilter};