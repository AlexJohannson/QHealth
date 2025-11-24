import React, {useState} from 'react';
import './PatientRecipeFilter.css';

const PatientRecipeFilter = ({onFilter}) => {
    const [filter, setFilter] = useState({
        recipe: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleaned = Object.fromEntries(
            Object.entries(filter).filter(([_, value]) => value !== '' && value !== null)
        );
        onFilter(cleaned);
    }


    return (
        <div>
            <form className={'patient-recipe-filter-form'} onSubmit={handleSubmit}>
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