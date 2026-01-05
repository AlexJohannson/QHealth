import React, {useEffect, useState} from 'react';
import {userService} from "../../../services/userService";
import './UserEditFormComponent.css';
import {editUsersValidator} from "../../../validator/editUsersValidator";
import {useNavigate} from "react-router-dom";

const UserEditFormComponent = ({userId, canEdit}) => {
    const [formData, setFormData] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState({});
    const [confirmDelete, setConfirmDelete] = useState(false);
    const navigatePath = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await userService.getById(userId);
                setFormData(res.data);
                setOriginalData(res.data);
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
        let emailChanged = false;

        if (formData.email !== originalData.email) {
            data.email = formData.email;
            emailChanged = true;

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

        return {data, emailChanged};
    };

    const handelSubmit = async e => {
        e.preventDefault();
        setMessage('');
        setError({});

        const {error: validationError} = editUsersValidator.validate(formData, {abortEarly: false});

        if (validationError) {
            const formattedErrors = {};
            validationError.details.forEach(err => {
                const path = err.path.join(".");
                formattedErrors[path] = err.message;
            });
            setError(formattedErrors);
            return;
        }

        const {data, emailChanged} = buildData();
        if (!data || Object.keys(data).length === 0) {
            setError({general: 'No changes to update'});
            return;
        }

        try {
            await userService.update(userId, data);
            if (emailChanged) {
                setMessage('Profile updated successfully. A confirmation email has been sent to your new email address.');
            } else {
                setMessage('Profile updated successfully.');
            }
            setOriginalData(formData);
            setTimeout(() => {
                navigatePath(`/users/${userId}`);
            }, 1500);
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
            localStorage.removeItem('role');
            localStorage.removeItem('is_superuser');
            localStorage.removeItem('is_staff');
            localStorage.removeItem('is_user');
            localStorage.removeItem('userId');
            localStorage.removeItem('roleId');
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');

            window.dispatchEvent(new Event("authChanged"));
            navigatePath('/login');
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


    if (!formData) return (
        <div className="user-edit-skeleton">
            <div className="user-edit-skeleton-avatar"></div>
            <div className="user-edit-skeleton-line short"></div>
            <div className="user-edit-skeleton-line long"></div>
            <div className="user-edit-skeleton-line long"></div>
        </div>
    );


    return (
        <div className={'user-edit-form-container'}>
            <div className={'user-edit-form-div'}>
                <form className={'user-edit-form'} onSubmit={handelSubmit}>
                    <h2>EDIT PROFILE</h2>

                    {error.general && <p style={{color: 'red'}}>{error.general}</p>}
                    {message && <p style={{color: 'green'}}>{message}</p>}

                    <label>Email</label>
                    <input
                        type="email"
                        value={formData.email || ''}
                        onChange={e => handelChange('email', e.target.value)}
                        placeholder="Email"
                    />
                    {error.email && <p style={{color: 'red'}}>{error.email}</p>}

                    <label>Name</label>
                    <input
                        type="text"
                        value={formData.profile?.name || ''}
                        onChange={e => handelChange('name', e.target.value, true)}
                        placeholder="Name"
                    />
                    {error["profile.name"] && <p style={{color: "red"}}>{error["profile.name"]}</p>}

                    <label>Surname</label>
                    <input
                        type="text"
                        value={formData.profile?.surname || ''}
                        onChange={e => handelChange('surname', e.target.value, true)}
                        placeholder="Surname"
                    />
                    {error["profile.surname"] && <p style={{color: "red"}}>{error["profile.surname"]}</p>}

                    <label>Phone Number</label>
                    <input
                        type="text"
                        value={formData.profile?.phone_number || ''}
                        onChange={e => handelChange('phone_number', e.target.value, true)}
                        placeholder="Phone Number"
                    />
                    {error["profile.phone_number"] && <p style={{color: "red"}}>{error["profile.phone_number"]}</p>}

                    <label>Date of Birth</label>
                    <input
                        type="date"
                        value={formData.profile?.date_of_birth || ''}
                        onChange={e => handelChange('date_of_birth', e.target.value, true)}
                        placeholder="Date of Birth"
                    />
                    {error["profile.date_of_birth"] && <p style={{color: "red"}}>{error["profile.date_of_birth"]}</p>}

                    <label>Height</label>
                    <input
                        type="number"
                        value={formData.profile?.height || ''}
                        onChange={e => handelChange('height', e.target.value, true)}
                        placeholder="Height"
                    />
                    {error["profile.height"] && <p style={{color: "red"}}>{error["profile.height"]}</p>}

                    <label>Weight</label>
                    <input
                        type="number"
                        value={formData.profile?.weight || ''}
                        onChange={e => handelChange('weight', e.target.value, true)}
                        placeholder="Weight"
                    />
                    {error["profile.weight"] && <p style={{color: "red"}}>{error["profile.weight"]}</p>}

                    <label>Street</label>
                    <input
                        type="text"
                        value={formData.profile?.street || ''}
                        onChange={e => handelChange('street', e.target.value, true)}
                        placeholder="Street"
                    />
                    {error["profile.street"] && <p style={{color: 'red'}}>{error["profile.street"]}</p>}

                    <label>House</label>
                    <input
                        type="text"
                        value={formData.profile?.house || ''}
                        onChange={e => handelChange('house', e.target.value, true)}
                        placeholder="House"
                    />
                    {error["profile.house"] && <p style={{color: 'red'}}>{error["profile.house"]}</p>}

                    <label>City</label>
                    <input
                        type="text"
                        value={formData.profile?.city || ''}
                        onChange={e => handelChange('city', e.target.value, true)}
                        placeholder="City"
                    />
                    {error["profile.city"] && <p style={{color: 'red'}}>{error["profile.city"]}</p>}

                    <label>Region</label>
                    <input
                        type="text"
                        value={formData.profile?.region || ''}
                        onChange={e => handelChange('region', e.target.value, true)}
                        placeholder="Region"
                    />
                    {error["profile.region"] && <p style={{color: 'red'}}>{error["profile.region"]}</p>}

                    <label>Country</label>
                    <input
                        type="text"
                        value={formData.profile?.country || ''}
                        onChange={e => handelChange('country', e.target.value, true)}
                        placeholder="Country"
                    />
                    {error["profile.country"] && <p style={{color: 'red'}}>{error["profile.country"]}</p>}

                    <label>Gender</label>
                    <select name={'gender'} value={formData.profile?.gender || ''}
                            onChange={e => handelChange('gender', e.target.value, true)}>
                        <option value={''}>Select Gender</option>
                        <option value={'Female'}>Female</option>
                        <option value={'Male'}>Male</option>
                    </select>
                    {error["profile.gender"] && <p style={{color: 'red'}}>{error["profile.gender"]}</p>}

                    {error.general && <p style={{color: 'red'}}>{error.general}</p>}
                    {message && <p style={{color: 'green'}}>{message}</p>}

                    <button className={'user-edit-form-save-change'} type="submit">Save Changes</button>
                    {!confirmDelete ? (
                        <button
                            className={'user-edit-form-delete-account'}
                            type="button"
                            onClick={() => setConfirmDelete(true)}
                        >
                            DELETE ACCOUNT
                        </button>
                    ) : (
                        <div className={'user-edit-form-delete-confirmation'}>
                            <p className={'user-edit-form-delete-confirmation-error'}>
                                Are you sure you want to delete your account?
                            </p>
                            <button
                                className={'user-edit-form-delete-confirmation-button-delete'}
                                type="button"
                                onClick={handleDelete}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className={'user-edit-form-delete-confirmation-button-cancel'}
                                type="button"
                                onClick={() => setConfirmDelete(false)}
                            >
                                No, cancel
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export {UserEditFormComponent};


