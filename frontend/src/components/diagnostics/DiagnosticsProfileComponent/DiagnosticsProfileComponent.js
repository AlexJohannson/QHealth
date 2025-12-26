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
        <Link className={'diagnostics-profile-component'}
              to={`/diagnostics/${diagnostic.id}${patientId ? `?patientId=${patientId}` : ''}`}>
            <div className="diagnostics-profile-component-container">
                <div className="diagnostics-profile-component-items">
                    <h4>Diagnostic:</h4>
                    <h2>{diagnostic.modality}</h2>
                </div>
            </div>
        </Link>
    );
};


export {DiagnosticsProfileComponent};