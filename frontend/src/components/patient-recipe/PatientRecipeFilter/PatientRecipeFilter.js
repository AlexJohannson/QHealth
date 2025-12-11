import React, {useState} from 'react';
import './PatientRecipeFilter.css';

const PatientRecipeFilter = ({onFilter}) => {
    const [filter, setFilter] = useState({
        patient_name: '',
        patient_surname: '',
        recipe: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleaned = Object.fromEntries(
            Object.entries(filter).filter(([_, value]) => value !== '' && value !== null)
        );
        onFilter(cleaned);
    }

    const isSuperUser = localStorage.getItem('is_superuser') === 'true';
    const isStaff = localStorage.getItem('is_staff') === 'true';
    const role = localStorage.getItem('role');

    const canSeeInputPatientNameOrSurname = isSuperUser || isStaff || role === 'operator'
        || role === 'doctor' || role === 'pharmacist';


    return (
        <div>
            <form className={'patient-recipe-filter-form'} onSubmit={handleSubmit}>
                { canSeeInputPatientNameOrSurname && (
                <>
                    <input
                    type="text"
                    placeholder={'Patient Name'}
                    value={filter.patient_name}
                    onChange={(e) => setFilter({...filter, patient_name: e.target.value})}
                />
                    <input
                    type="text"
                    placeholder={'Patient Surname'}
                    value={filter.patient_surname}
                    onChange={(e) => setFilter({...filter, patient_surname: e.target.value})}
                />
                </>
                )}
                <input
                    type="text"
                    placeholder={'Search Recipe'}
                    value={filter.recipe}
                    onChange={(e) => setFilter({...filter, recipe: e.target.value})}
                />
                <button className={'patient-recipe-filter-form-button'} type="submit">Apply</button>
            </form>
        </div>
    );
};

export {PatientRecipeFilter};