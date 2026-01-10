import React, {useEffect, useState} from 'react';
import './SecurityFilterComponent.css';

const SecurityFilterComponent = ({filters, onApply}) => {
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
            success: '',
            order: ''
        };
        setLocalFilters(cleared);
        onApply(cleared);
    };


    return (
        <div>
            <form className={'security-filter'} onSubmit={handleSubmit}>
                <div className={'security-filter-field'}>
                    <label className={'security-filter-field-label'}>Success Yes/No</label>
                    <select value={localFilters.success}
                            onChange={(e) => handleChange('success', e.target.value)}
                    >
                        <option value={''}>Success Yes : No</option>
                        <option value={'true'}>Success Yes</option>
                        <option value={'false'}>Success No</option>
                    </select>
                </div>
                <div className={'security-filter-field'}>
                    <label className={'security-filter-field-label'}>Order ID/Success/Created</label>
                    <select value={localFilters.order}
                            onChange={(e) => handleChange('order', e.target.value)}
                    >
                        <option value={''}>Order filter</option>
                        <option value={'id'}>ID ascending</option>
                        <option value={'-id'}>ID descending</option>
                        <option value={'success'}>Success ascending</option>
                        <option value={'-success'}>Success descending</option>
                        <option value={'created_at'}>Created ascending</option>
                        <option value={'-created_at'}>Created descending</option>
                    </select>
                </div>
                <button className={'security-filter-button'} type="submit">
                    <img src={'/img/filter.png'} alt="filter icon" className={'security-filter-icon'} />
                </button>
                <button
                    className={'security-filter-button'}
                    type="button"
                    onClick={handleClear}
                >
                    <img src={'/img/clear.png'} alt="clear icon" className={'security-filter-icon'} />
                </button>
            </form>
        </div>
    );
};

export {SecurityFilterComponent};