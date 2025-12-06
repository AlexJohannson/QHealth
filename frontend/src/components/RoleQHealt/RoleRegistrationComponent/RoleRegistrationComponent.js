import React, {useState} from 'react';
import {roleService} from "../../../services/roleService";
import './RoleRegistrationComponent.css';
import {useNavigate} from "react-router-dom";
import {FooterComponent} from "../../FooterComponent/FooterComponent";
import {registerStaffValidator} from "../../../validator/registerStaffValidator";



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


        const {error: validationError} = registerStaffValidator.validate(form, {abortEarly: false});
        if (validationError) {
            const formattedErrors = {};
            validationError.details.forEach(err => {
                const path = err.path.join(".");
                formattedErrors[path] = err.message;
            });
            setError(formattedErrors);
            return;
        }

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
                    <p className={'role-register-successful'}>
                        Registration successful. Please, check your email to activate your account.
                    </p>

                ) : (
                    <form className={'role-register-form'} onSubmit={handleSubmit}>
                        <h2>REGISTER STAFF</h2>
                        {error.role && (<p className={'role-error-register'}>{error.role}</p>)}
                        <label>Select Role</label>
                        <select name={'role'} value={form.role} onChange={handleChange}>
                            <option value={''}>Select Role</option>
                            <option value={'doctor'}>Doctor</option>
                            <option value={'operator'}>Operator</option>
                            <option value={'pharmacist'}>Pharmacist</option>
                        </select>

                        {error.specialty && (<p className={'role-error-register'}>{error.specialty}</p>)}
                        <label>Select Specialty. Only for doctors</label>
                        <input name={'specialty'}
                               placeholder={'Specialty is mandatory for a doctor.'}
                               value={form.specialty} onChange={handleChange}
                        />

                        {error.email && (<p className={'role-error-register'}>{error.email}</p>)}
                        <label>Email</label>
                        <input name={'email'} placeholder={'Email'} value={form.email} onChange={handleChange}/>

                        {error.password && (<p className={'role-error-register'}>{error.password}</p>)}
                        <label>Password</label>
                        <div className={'role-register-password'}>
                        <input name={'password'} type={showPassword ? 'text' : 'password'} placeholder={'Password'} value={form.password} onChange={handleChange}/>
                        <button className={'role-show-password-register'} type="button" onClick={togglePassword}
                        >{showPassword ? '👁️' : '🙈'}</button>
                        </div>

                        {error.name && (<p className={'role-error-register'}>{error.name}</p>)}
                        <label>Name</label>
                        <input name={'name'} placeholder={'Name'} value={form.name} onChange={handleChange}/>

                        {error.surname && (<p className={'role-error-register'}>{error.surname}</p>)}
                        <label>Surname</label>
                        <input name={'surname'} placeholder={'Surname'} value={form.surname} onChange={handleChange}/>

                        {error.phone_number && (<p className={'role-error-register'}>{error.phone_number}</p>)}
                        <label>Phone Number</label>
                        <input name={'phone_number'} placeholder={'Phone number'} value={form.phone_number}
                               onChange={handleChange}/>

                        {error.date_of_birth && (<p className={'role-error-register'}>{error.date_of_birth}</p>)}
                        <label>Date of Birth</label>
                        <input name={'date_of_birth'} type={'date'} value={form.date_of_birth} onChange={handleChange}/>

                        {error.height && (<p className={'role-error-register'}>{error.height}</p>)}
                        <label>Height</label>
                        <input name={'height'} type={'number'} placeholder={'Height (cm)'} value={form.height}
                               onChange={handleChange}/>

                        {error.weight && (<p className={'role-error-register'}>{error.weight}</p>)}
                        <label>Weight</label>
                        <input name={'weight'} type={'number'} placeholder={'Weight (kg)'} value={form.weight}
                               onChange={handleChange}/>

                        {error.street && (<p className={'role-error-register'}>{error.street}</p>)}
                        <label>Street</label>
                        <input name={'street'} placeholder={'Street'} value={form.street} onChange={handleChange}/>

                        {error.house && (<p className={'role-error-register'}>{error.house}</p>)}
                        <label>House</label>
                        <input name={'house'} placeholder={'House'} value={form.house} onChange={handleChange}/>

                        {error.city && (<p className={'role-error-register'}>{error.city}</p>)}
                        <label>City</label>
                        <input name={'city'} placeholder={'City'} value={form.city} onChange={handleChange}/>

                        {error.region && (<p className={'role-error-register'}>{error.region}</p>)}
                        <label>Region</label>
                        <input name={'region'} placeholder={'Region'} value={form.region} onChange={handleChange}/>

                        {error.country && (<p className={'role-error-register'}>{error.country}</p>)}
                        <label>Country</label>
                        <input name={'country'} placeholder={'Country'} value={form.country} onChange={handleChange}/>

                        {error.gender && (<p className={'role-error-register'}>{error.gender}</p>)}
                        <label>Gender</label>
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