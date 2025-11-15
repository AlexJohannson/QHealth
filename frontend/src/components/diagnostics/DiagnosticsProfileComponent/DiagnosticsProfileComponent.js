import React from 'react';
import './DiagnosticsProfileComponent.css';
import {Link, useLocation} from "react-router-dom";

/**
 * @param {{diagnostic : IDiagnostics}} props
 */



const DiagnosticsProfileComponent = ({diagnostic}) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const patientId = searchParams.get('patientId');

    return (
        <div>
            <Link className={'diagnostics-profile-component'}
                  to={`/diagnostics/${diagnostic.id}${patientId ? `?patientId=${patientId}` : ''}`}>
                <h2>{diagnostic.modality}</h2>
            </Link>
        </div>
    );
};


export {DiagnosticsProfileComponent};