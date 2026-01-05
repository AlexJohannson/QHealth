import React, {useEffect, useState} from 'react';
import './DiagnosticsFilterComponent.css';

const DiagnosticsFilterComponent = ({filters, onApply}) => {
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
            modality: '',
            order: '',
        };
        setLocalFilters(cleared);
        onApply(cleared);
    };


    return (
        <div className="diagnostics-filter-div">
            <form className={'diagnostics-component-filter'} onSubmit={handleSubmit}>
                <div className={'diagnostics-filter-field'}>
                    <label>Diagnostics</label>
                    <input
                        type={'text'}
                        placeholder={'Search Diagnostics'}
                        value={localFilters.modality}
                        onChange={(e) => handleChange('modality', e.target.value)}
                    />
                </div>
                <div className={'diagnostics-filter-field'}>
                    <label>Ordering</label>
                    <select
                        value={localFilters.order}
                        onChange={(e) => handleChange('order', e.target.value)}
                    >
                        <option value="">Order by ID</option>
                        <option value="id">ID ascending</option>
                        <option value="-id">ID descending</option>
                    </select>
                </div>
                <button className={'diagnostics-component-filter-button'} type="submit">Apply</button>
                <button
                    className={'diagnostics-component-filter-button'}
                    type="button"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </form>
        </div>
    );
};

export {DiagnosticsFilterComponent};