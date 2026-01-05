import React, {useEffect, useState} from 'react';
import './PatientRecipeFilter.css';

const PatientRecipeFilter = ({filters, onApply}) => {
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
                recipe: '',
            };
            setLocalFilters(cleared);
            onApply(cleared);
    };

    const isSuperUser = localStorage.getItem('is_superuser') === 'true';
    const isStaff = localStorage.getItem('is_staff') === 'true';
    const role = localStorage.getItem('role');

    const canSeeInputPatientNameOrSurname = isSuperUser || isStaff || role === 'operator'
        || role === 'doctor' || role === 'pharmacist';


    return (
        <div>
            <form className={'patient-recipe-filter-form'} onSubmit={handleSubmit}>
                {canSeeInputPatientNameOrSurname && (
                    <>
                        <div className={'patient-recipe-filter-field'}>
                            <label>Patient Name</label>
                        <input
                            type="text"
                            placeholder={'Patient Name'}
                            value={localFilters.patient_name}
                            onChange={(e) => handleChange('patient_name', e.target.value)}
                        />
                        </div>
                        <div className={'patient-recipe-filter-field'}>
                            <label>Patient Surname</label>
                        <input
                            type="text"
                            placeholder={'Patient Surname'}
                            value={localFilters.patient_surname}
                            onChange={(e) => handleChange('patient_surname', e.target.value)}
                        />
                        </div>
                    </>
                )}
                <div className={'patient-recipe-filter-field'}>
                    <label>Recipe</label>
                <input
                    type="text"
                    placeholder={'Search Recipe'}
                    value={localFilters.recipe}
                    onChange={(e) => handleChange('recipe', e.target.value)}
                />
                </div>
                <button className={'patient-recipe-filter-form-button'} type="submit">Apply</button>
                <button
                    className={'patient-recipe-filter-form-button'}
                    type="button"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </form>
        </div>
    );
};

export {PatientRecipeFilter};