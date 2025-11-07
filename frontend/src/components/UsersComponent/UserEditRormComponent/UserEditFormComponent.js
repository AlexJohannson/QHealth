import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {userService} from "../../../services/userService";
import './UserEditFormComponent.css';
import {FooterComponent} from "../../FooterComponent/FooterComponent";

const UserEditFormComponent = ({userId, canEdit, onDelete}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await userService.getById(userId);
                setFormData(data);
                setOriginalData(data);
            } catch {
                setError({general: 'Failed to load user data.'});
            }
        };
        fetchUser();
    }, [userId]);

    const handelChange = (field, value, nested = false) => {
        setFormData(prev => {
            if (nested) {
                return {
                    ...prev,
                    profile: {
                        ...prev.profile,
                        [field]: value,
                    },
                };
            }
            return {...prev, [field]: value};
        });
    };


    const buildData = () => {
        const data = {};

        if (formData.email !== originalData.email) {
            data.email = formData.email;
        }

        const profile = {};
        const formProfile = formData.profile || {};
        const originalProfile = originalData.profile || {};

        for (const key in formProfile) {
            if (formProfile[key] !== originalProfile[key]) {
                profile[key] = formProfile[key];
            }
        }

        if (Object.keys(profile).length > 0) {
            data.profile = profile;
        }

        return data;
    };


    const handelSubmit = async e => {
        e.preventDefault();
        setMessage('');
        setError({});

        const data = buildData();
        if (!data || Object.keys(data).length === 0) {
            setError({general: 'No changes to update'});
            return;
        }

        try {
            await userService.update(userId, data);
            setMessage('Profile updated successfully.');

        } catch (err) {
            if (err.response?.data) {
                setError(err.response.data);
            } else {
                setError({general: 'Update failed'});
            }
        }
    };

    const handleDelete = async () => {
        if (!canEdit) return;
        try {
            await userService.delete(userId);
            onDelete();
        } catch (err) {
            if (err.response?.data) {
                const backendMessage = err.response.data.detail || err.response.data.message || null;
                if (backendMessage) {
                    setError({general: backendMessage});
                } else {
                    setError(err.response.data);
                }
            } else {
                setError({general: 'Failed to delete'});
            }
        }
    };


    if (!formData) return <p>Loading user data...</p>;


    return (
        <div className={'user-edit-form-container'}>
            <div className={'user-edit-form-container-header'}>
                <img src={'/img/logo.png'} className={'logo-user-edit'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'user-edit-form-container-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className={'user-edit-form-div'}>
            <form className={'user-edit-form'} onSubmit={handelSubmit}>
                <h2>EDIT PROFILE</h2>

                {error.general && <p style={{color: 'red'}}>{error.general}</p>}
                {message && <p style={{color: 'green'}}>{message}</p>}

                <input
                    type="email"
                    value={formData.email || ''}
                    onChange={e => handelChange('email', e.target.value)}
                    placeholder=" New Email"
                />
                {error.email && <p style={{color: 'red'}}>{error.email}</p>}

                <input
                    type="text"
                    value={formData.profile?.name || ''}
                    onChange={e => handelChange('name', e.target.value, true)}
                    placeholder="New Name"
                />
                {error.profile?.name && <p style={{color: 'red'}}>{error.profile.name}</p>}

                <input
                    type="text"
                    value={formData.profile?.surname || ''}
                    onChange={e => handelChange('surname', e.target.value, true)}
                    placeholder="New Surname"
                />
                {error.profile?.surname && <p style={{color: 'red'}}>{error.profile.surname}</p>}
                <input
                    type="text"
                    value={formData.profile?.phone_number || ''}
                    onChange={e => handelChange('phone_number', e.target.value, true)}
                    placeholder="New Phone Number"
                />
                {error.profile?.phone_number && <p style={{color: 'red'}}>{error.profile.phone_number}</p>}
                <input
                    type="date"
                    value={formData.profile?.date_of_birth || ''}
                    onChange={e => handelChange('date_of_birth', e.target.value, true)}
                    placeholder="New Date of Birth"
                />
                {error.profile?.date_of_birth && <p style={{color: 'red'}}>{error.profile.date_of_birth}</p>}
                <input
                    type="number"
                    value={formData.profile?.height || ''}
                    onChange={e => handelChange('height', e.target.value, true)}
                    placeholder="New Height"
                />
                {error.profile?.height && <p style={{color: 'red'}}>{error.profile.height}</p>}
                <input
                    type="number"
                    value={formData.profile?.weight || ''}
                    onChange={e => handelChange('weight', e.target.value, true)}
                    placeholder="New Weight"
                />
                {error.profile?.weight && <p style={{color: 'red'}}>{error.profile.weight}</p>}
                <input
                    type="text"
                    value={formData.profile?.street || ''}
                    onChange={e => handelChange('street', e.target.value, true)}
                    placeholder="New Street"
                />
                {error.profile?.street && <p style={{color: 'red'}}>{error.profile.street}</p>}
                <input
                    type="text"
                    value={formData.profile?.house || ''}
                    onChange={e => handelChange('house', e.target.value, true)}
                    placeholder="New House"
                />
                {error.profile?.house && <p style={{color: 'red'}}>{error.profile.house}</p>}
                <input
                    type="text"
                    value={formData.profile?.city || ''}
                    onChange={e => handelChange('city', e.target.value, true)}
                    placeholder="New City"
                />
                {error.profile?.city && <p style={{color: 'red'}}>{error.profile.city}</p>}
                <input
                    type="text"
                    value={formData.profile?.region || ''}
                    onChange={e => handelChange('region', e.target.value, true)}
                    placeholder="New Region"
                />
                {error.profile?.region && <p style={{color: 'red'}}>{error.profile.region}</p>}
                <input
                    type="text"
                    value={formData.profile?.country || ''}
                    onChange={e => handelChange('country', e.target.value, true)}
                    placeholder="New Country"
                />
                {error.profile?.country && <p style={{color: 'red'}}>{error.profile.country}</p>}
                <select name={'gender'} value={formData.profile?.gender || ''}
                    onChange={e => handelChange('gender', e.target.value, true)}>
                            <option value={''}>Select Gender</option>
                            <option value={'Female'}>Female</option>
                            <option value={'Male'}>Male</option>
                </select>
                {error.profile?.gender && <p style={{color: 'red'}}>{error.profile.gender}</p>}

                <button className={'user-edit-form-save-change'} type="submit">Save Changes</button>
                <button className={'user-edit-form-delete-account'} type="button" onClick={handleDelete}>DELETE ACCOUNT</button>
            </form>
            </div>
            <FooterComponent/>
        </div>
    );
};

export {UserEditFormComponent};


