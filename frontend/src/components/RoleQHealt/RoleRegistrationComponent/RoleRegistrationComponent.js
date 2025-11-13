import React, {useState} from 'react';
import {roleService} from "../../../services/roleService";
import './RoleRegistrationComponent.css';
import {useNavigate} from "react-router-dom";
import {FooterComponent} from "../../FooterComponent/FooterComponent";


const RoleRegistrationComponent = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        role: '',
        specialty: '',
        email: '',
        password: '',
        name: '',
        surname: '',
        phone_number: '',
        date_of_birth: '',
        height: '',
        weight: '',
        street: '',
        house: '',
        city: '',
        region: '',
        country: '',
        gender: '',

    });

    const [error, setError] = useState({});
    const [success, setSuccess] = useState(false);

    const handleChange = e => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError({});
        setSuccess(false);

        try {
            await roleService.createNewRole({
                role: form.role,
                specialty: form.specialty,
                user: {
                    email: form.email,
                    password: form.password,
                    profile: {
                        name: form.name,
                        surname: form.surname,
                        phone_number: form.phone_number,
                        date_of_birth: form.date_of_birth,
                        height: form.height,
                        weight: form.weight,
                        street: form.street,
                        house: form.house,
                        city: form.city,
                        region: form.region,
                        country: form.country,
                        gender: form.gender,
                    }
                }
            });
            setSuccess(true);
        } catch (error) {
            if (error.response?.data) {
                setError(error.response.data);
            } else {
                setError({general: 'Something went wrong, please try again later.'});
            }
        }
    };

    const getError = (path) => {
        const parts = path.split('.');
        let current = error;
        for (const part of parts) {
            if (current && typeof current === 'object') {
                current = current[part];
            } else {
                return null;
            }
        }
        return Array.isArray(current) ? current[0] : current;
    };

    const togglePassword = () => setShowPassword(prev => !prev);


    return (
        <div className={'role-registration-component'}>
            <div className={'role-registration-component-header'}>
                <img src={'/img/logo.png'} className={'role-logo-register'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'role-form-register-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className={'role-register-form-div'}>
                {success ? (
                    <p className={'role-register-successful'}>Registration successful. Please, check your email to activate your account.</p>

                ) : (
                    <form className={'role-register-form'} onSubmit={handleSubmit}>
                        <h2>REGISTER STAFF</h2>
                        {error.role && (<p className={'role-error-register'}>{error.role}</p>)}
                        <select name={'role'} value={form.role} onChange={handleChange}>
                            <option value={''}>Select Role</option>
                            <option value={'doctor'}>Doctor</option>
                            <option value={'operator'}>Operator</option>
                            <option value={'pharmacist'}>Pharmacist</option>
                        </select>

                        {error.specialty && (<p className={'role-error-register'}>{error.specialty}</p>)}
                        <input name={'specialty'}
                               placeholder={'Specialty is mandatory for a doctor.'}
                               value={form.specialty} onChange={handleChange}
                        />

                        {getError('user.email') && <p className={'role-error-register'}>{getError('user.email')}</p>}
                        <input name={'email'} placeholder={'Email'} value={form.email} onChange={handleChange}/>

                        {getError('user.password') && <p className={'role-error-register'}>{getError('user.password')}</p>}
                        <div className={'role-register-password'}>
                        <input name={'password'} type={showPassword ? 'text' : 'password'} placeholder={'Password'} value={form.password} onChange={handleChange}/>
                        <button className={'role-show-password-register'} type="button" onClick={togglePassword}
                        >{showPassword ? '👁️' : '🙈'}</button>
                        </div>

                        {getError('user.profile.name') && <p className={'role-error-register'}>{getError('user.profile.name')}</p>}
                        <input name={'name'} placeholder={'Name'} value={form.name} onChange={handleChange}/>

                        {getError('user.profile.surname') && <p className={'role-error-register'}>{getError('user.profile.surname')}</p>}
                        <input name={'surname'} placeholder={'Surname'} value={form.surname} onChange={handleChange}/>

                        {getError('user.profile.phone_number') && <p className={'role-error-register'}>{getError('user.profile.phone_number')}</p>}
                        <input name={'phone_number'} placeholder={'Phone number'} value={form.phone_number}
                               onChange={handleChange}/>

                        {getError('user.profile.date_of_birth') && <p className={'role-error-register'}>{getError('user.profile.date_of_bird')}</p>}
                        <input name={'date_of_birth'} type={'date'} value={form.date_of_birth} onChange={handleChange}/>

                        {getError('user.profile.height') && <p className={'role-error-register'}>{getError('user.profile.height')}</p>}
                        <input name={'height'} type={'number'} placeholder={'Height (cm)'} value={form.height}
                               onChange={handleChange}/>

                        {getError('user.profile.weight') && <p className={'role-error-register'}>{getError('user.profile.weight')}</p>}
                        <input name={'weight'} type={'number'} placeholder={'Weight (kg)'} value={form.weight}
                               onChange={handleChange}/>

                        {getError('user.profile.street') && <p className={'role-error-register'}>{getError('user.profile.street')}</p>}
                        <input name={'street'} placeholder={'Street'} value={form.street} onChange={handleChange}/>

                        {getError('user.profile.house') && <p className={'role-error-register'}>{getError('user.profile.house')}</p>}
                        <input name={'house'} placeholder={'House'} value={form.house} onChange={handleChange}/>

                        {getError('user.profile.city') && <p className={'role-error-register'}>{getError('user.profile.city')}</p>}
                        <input name={'city'} placeholder={'City'} value={form.city} onChange={handleChange}/>

                        {getError('user.profile.region') && <p className={'role-error-register'}>{getError('user.profile.region')}</p>}
                        <input name={'region'} placeholder={'Region'} value={form.region} onChange={handleChange}/>

                        {getError('user.profile.country') && <p className={'role-error-register'}>{getError('user.profile.country')}</p>}
                        <input name={'country'} placeholder={'Country'} value={form.country} onChange={handleChange}/>

                        {getError('user.profile.gender') && <p className={'role-error-register'}>{getError('user.profile.gender')}</p>}
                        <select name={'gender'} value={form.gender} onChange={handleChange}>
                            <option value={''}>Select Gender</option>
                            <option value={'Female'}>Female</option>
                            <option value={'Male'}>Male</option>
                        </select>
                        {error.general && (<p className={'role-error-register'}>{error.general}</p>)}
                        <div className={'role-register-button-div'}>
                            <button className={'role-form-register-button'} type={'submit'}>REGISTER</button>
                        </div>
                    </form>
                )}
            </div>
            <FooterComponent/>
        </div>
    );
};

export {RoleRegistrationComponent};