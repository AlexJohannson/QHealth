import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {apiService} from "../../services/apiService";
import {urls} from "../../constants/urls";
import './RegistrationFormComponent.css';
import {registerValidator} from "../../validator/registerValidator";

const RegistrationFormComponent = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
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

    const handelChange = e => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError({});
        setSuccess(false);

        const {error: validationError} = registerValidator.validate(form, {abortEarly: false});
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
            await apiService.post(urls.users.registrationUserAccount, {
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
                },
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
        <div className="registration-form-container">
            <div className={'register-form-div'}>
                {success ? (
                    <p className={'register-successful'}>
                        Registration successful. Please check your email to activate your account.
                    </p>
                ) : (
                    <form className={'register-form'} onSubmit={handleSubmit}>
                        <h2>REGISTER</h2>

                        <label>Email</label>
                        <input name={'email'} placeholder={'Email'} value={form.email} onChange={handelChange}/>
                        {error.email && (<p className={'register-error'}>{error.email}</p>)}

                        <label>Enter new password</label>
                        <div className={'new-password-recovery-register'}>
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder={'Enter your new password'}
                                value={form.password}
                                onChange={handelChange}
                            />
                            <button className={'show-new-password-register'} type="button" onClick={togglePassword}>
                                {showPassword ? '👁️' : '🙈'}
                            </button>
                        </div>
                        {error.password && (<p className={'register-error'}>{error.password}</p>)}

                        <label>Confirm new password</label>
                        <div className={'new-password-register-confirm'}>
                            <input
                                name="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Confirm your new password"
                                value={form.confirmPassword}
                                onChange={handelChange}
                            />
                            <button className={'show-new-password-register-confirm'} type="button"
                                    onClick={togglePassword}>
                                {showPassword ? '👁️' : '🙈'}
                            </button>
                        </div>
                        {error.confirmPassword && (<p className="register-error">{error.confirmPassword}</p>)}


                        <label>Name</label>
                        <input name={'name'} placeholder={'Name'} value={form.name} onChange={handelChange}/>
                        {error.name && (<p className={'register-error'}>{error.name}</p>)}

                        <label>Surname</label>
                        <input name={'surname'} placeholder={'Surname'} value={form.surname} onChange={handelChange}/>
                        {error.surname && (<p className={'register-error'}>{error.surname}</p>)}

                        <label>Phone number</label>
                        <input name={'phone_number'} placeholder={'Phone number'} value={form.phone_number}
                               onChange={handelChange}/>
                        {error.phone_number && (
                            <p className={'register-error'}>{error.phone_number}</p>)}

                        <label>Date of birth</label>
                        <input name={'date_of_birth'} type={'date'} value={form.date_of_birth} onChange={handelChange}/>
                        {error.date_of_birth && (
                            <p className={'register-error'}>{error.date_of_birth}</p>)}
                        <label>Height</label>
                        <input name={'height'} type={'number'} placeholder={'Height (cm)'} value={form.height}
                               onChange={handelChange}/>
                        {error.height && (<p className={'register-error'}>{error.height}</p>)}

                        <label>Weight</label>
                        <input name={'weight'} type={'number'} placeholder={'Weight (kg)'} value={form.weight}
                               onChange={handelChange}/>
                        {error.weight && (<p className={'register-error'}>{error.weight}</p>)}

                        <label>Street</label>
                        <input name={'street'} placeholder={'Street'} value={form.street} onChange={handelChange}/>
                        {error.street && (<p className={'register-error'}>{error.street}</p>)}

                        <label>House</label>
                        <input name={'house'} placeholder={'House'} value={form.house} onChange={handelChange}/>
                        {error.house && (<p className={'register-error'}>{error.house}</p>)}

                        <label>City</label>
                        <input name={'city'} placeholder={'City'} value={form.city} onChange={handelChange}/>
                        {error.city && (<p className={'register-error'}>{error.city}</p>)}

                        <label>Region</label>
                        <input name={'region'} placeholder={'Region'} value={form.region} onChange={handelChange}/>
                        {error.region && (<p className={'register-error'}>{error.region}</p>)}

                        <label>Country</label>
                        <input name={'country'} placeholder={'Country'} value={form.country} onChange={handelChange}/>
                        {error.country && (<p className={'register-error'}>{error.country}</p>)}

                        <label>Gender</label>
                        <select name={'gender'} value={form.gender} onChange={handelChange}>
                            <option value={''}>Select Gender</option>
                            <option value={'Female'}>Female</option>
                            <option value={'Male'}>Male</option>
                        </select>
                        {error.gender && (<p className={'register-error'}>{error.gender}</p>)}

                        {error.general && (<p className={'register-error'}>{error.general}</p>)}
                        <div className={'form-register-button-div'}>
                            <button className={'form-register-button'} type={'submit'}>REGISTER</button>
                            <button className={'form-register-button'} type="button" onClick={() => navigate('/login')}>BACK</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export {RegistrationFormComponent};