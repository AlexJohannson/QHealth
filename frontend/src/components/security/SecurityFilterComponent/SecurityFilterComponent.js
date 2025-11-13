import React, {useState} from 'react';
import './SecurityFilterComponent.css';

const SecurityFilterComponent = ({onFilter}) => {
    const [filter, setFilter] = useState({
        success: '',
        order: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleaned = Object.fromEntries(
            Object.entries(filter).filter(([_, value]) => value !== '' && value !== null)
        );
        if ('success' in cleaned) {
            cleaned.success = cleaned.success === 'true';
            }
        onFilter(cleaned);
    }


    return (
        <div>
            <form className={'security-filter'} onSubmit={handleSubmit}>
                <select value={filter.success}
                onChange={(e) => setFilter({ ...filter, success: e.target.value })}
                >
                    <option value={''}>Success Yes : No</option>
                    <option value={'true'}>Success Yes</option>
                    <option value={'false'}>Success No</option>
                </select>
                <select value={filter.order}
                onChange={(e) => setFilter({ ...filter, order: e.target.value })}
                >
                    <option value={''}>Order filter</option>
                    <option value={'id'}>ID ascending</option>
                    <option value={'-id'}>ID descending</option>
                    <option value={'success'}>Success ascending</option>
                    <option value={'-success'}>Success descending</option>
                    <option value={'created_at'}>Created ascending</option>
                    <option value={'-created_at'}>Created descending</option>
                </select>
                <button className={'security-filter-button'} type="submit">Apply</button>
            </form>
        </div>
    );
};

export {SecurityFilterComponent};