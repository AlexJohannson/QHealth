import React, {useState} from 'react';
import './DiagnosticsFilterComponent.css';

const DiagnosticsFilterComponent = ({onFilter}) => {
    const [filter, setFilter] = useState({
        modality: '',
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
                modality: '',
                order: '',
            });
        onFilter({});
    };


    return (
        <div className="diagnostics-filter-div">
            <form className={'diagnostics-component-filter'} onSubmit={handleSubmit}>
                <input
                    type={'text'}
                    placeholder={'Search Diagnostics'}
                    value={filter.modality}
                    onChange={(e) => setFilter({...filter, modality: e.target.value})}
                />
                <select
                    value={filter.order}
                    onChange={(e) => setFilter({...filter, order: e.target.value})}
                >
                    <option value="">Order by ID</option>
                    <option value="id">ID ascending</option>
                    <option value="-id">ID descending</option>
                </select>
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