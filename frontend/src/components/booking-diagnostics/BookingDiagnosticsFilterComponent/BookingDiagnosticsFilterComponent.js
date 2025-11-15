import React, {useState} from 'react';
import './BookingDiagnosticsFilterComponent.css';

const BookingDiagnosticsFilterComponent = ({onFilter}) => {
    const [filter, setFilter] = useState({
        diagnostic_service: '',
        order: '',
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
            <form className={'booking-diagnostics-form-filter-component'} onSubmit={handleSubmit}>
                <input
                    type={'text'}
                    placeholder={'Diagnostic Service'}
                    value={filter.diagnostic_service}
                    onChange={(e) => setFilter({...filter, diagnostic_service: e.target.value})}
                />
                <select
                    value={filter.order}
                    onChange={(e) => setFilter({...filter, order: e.target.value})}
                >
                    <option value={''}>Order by ID</option>
                    <option value={'id'}>ID ascending</option>
                    <option value={'-id'}>ID descending</option>
                </select>
                <button  className={'booking-diagnostics-form-filter-component-button'} type="submit">Apply</button>
            </form>
        </div>
    );
};

export {BookingDiagnosticsFilterComponent};