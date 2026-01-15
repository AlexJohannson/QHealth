import React from 'react';
import './DiagnosticsListProfile.css';
import {Link} from "react-router-dom";


/**
 * @param {{diagnostic : IDiagnostics}} props
 */

const DiagnosticsListProfile = ({diagnostic}) => {


    return (
        <Link className={'diagnostics-list-profile-component'}
              to={`/diagnostics-list/${diagnostic.id}`}>
            <div className="diagnostics-list-profile-component-link">
                <div className="diagnostics-list-profile-component-items-id">
                    <h4>{diagnostic.id}</h4>
                </div>
                <div className="diagnostics-list-profile-component-items">
                    <h4>Diagnostic:</h4>
                    <h2>{diagnostic.modality}</h2>
                </div>
            </div>
        </Link>
    );
};

export {DiagnosticsListProfile};