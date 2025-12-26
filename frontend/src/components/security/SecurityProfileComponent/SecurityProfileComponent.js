import React from 'react';
import './SecurityProfileComponent.css';
import {formatDate} from "../../../untils/formatDate";


/**
 * @param {{security: ISecurity}} props
 */
const SecurityProfileComponent = ({security, onSelect}) => {
    return (
        <div className={'security-profile-component'} onClick={onSelect}>
            <div className={'security-profile-items'}>
                <h5>ID:</h5>
                <h3>{security.id}</h3>
            </div>
            <div className={'security-profile-items'}>
                <h5>Email:</h5>
                <h3>{security.email}</h3>
            </div>
            <div className={'security-profile-items'}>
                <h5>IP Address:</h5>
                <h3>{security.ip_address}</h3>
            </div>
            <div className={'security-profile-items'}>
                <h5>Time stamp:</h5>
                <h3>{formatDate(security.timestamp)}</h3>
            </div>
            <div className={'security-profile-items'}>
                <h5>Success:</h5>
                <h3>{security.success ? 'Yes' : 'No'}</h3>
            </div>
            <div className={'security-profile-items'}>
                <h5>Created:</h5>
                <h3>{formatDate(security.created_at)}</h3>
            </div>
            <div className={'security-profile-items'}>
                <h5>Updated:</h5>
                <h3>{formatDate(security.updated_at)}</h3>
            </div>
        </div>
    );
};

export {SecurityProfileComponent};