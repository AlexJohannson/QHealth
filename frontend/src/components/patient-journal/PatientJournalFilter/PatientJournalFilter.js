import React, {useState} from 'react';
import './PatientJournalFilter.css';

const PatientJournalFilter = ({onFilter}) => {
    const [filter, setFilter] = useState({
        diagnosis: '',
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
            <form className={'patient-journal-filter-component'} onSubmit={handleSubmit}>
                <input
                    type={'text'}
                    placeholder={'Search Diagnosis'}
                    value={filter.diagnosis}
                    onChange={(e) => setFilter({ ...filter, diagnosis: e.target.value })}
                />
                <button className={'patient-journal-filter-component-button'} type="submit">Apply</button>
            </form>
        </div>
    );
};

export {PatientJournalFilter};