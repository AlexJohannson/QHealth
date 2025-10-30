import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {apiService} from "../../services/apiService";
import {urls} from "../../constants/urls";

const RegistrationFormComponent = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
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

    const handelChange = e => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError({});
        setSuccess(false);

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




    return (
        <div>
            <div>
                <h4>Register</h4>
                {success ? (
                    <p>Registration successful. Please check your email to activate your account.</p>
                ): (
                    <form onSubmit={handleSubmit}>
                        <input name={'email'} placeholder={'Email'} value={form.email} onChange={handelChange}/>
                        {error.email && (<p>{error.email}</p>)}

                        <input name={'password'} type={'password'} placeholder={'Password'} value={form.password} onChange={handelChange}/>
                        {error.password && (<p>{error.password}</p>)}

                        <input name={'name'} placeholder={'Name'} value={form.name} onChange={handelChange}/>
                        {error.profile?.name && (<p>{error.profile.name}</p>)}

                        <input name={'surname'} placeholder={'Surname'} value={form.surname} onChange={handelChange}/>
                        {error.profile?.surname && (<p>{error.profile.surname}</p>)}

                        <input name={'phone_number'} placeholder={'Phone number'} value={form.phone_number} onChange={handelChange}/>
                        {error.profile?.phone_number && (<p>{error.profile.phone_number}</p>)}

                        <input name={'date_of_birth'}  type={'date'} value={form.date_of_birth} onChange={handelChange}/>
                        {error.profile?.date_of_birth && (<p>{error.profile.date_of_birth}</p>)}

                        <input name={'height'} type={'number'} placeholder={'Height (cm)'} value={form.height} onChange={handelChange}/>
                        {error.profile?.height && (<p>{error.profile.height}</p>)}

                        <input name={'weight'} type={'number'} placeholder={'Weight (kg)'} value={form.weight} onChange={handelChange}/>
                        {error.profile?.weight && (<p>{error.profile.weight}</p>)}

                        <input name={'street'} placeholder={'Street'} value={form.street} onChange={handelChange}/>
                        {error.profile?.street && (<p>{error.profile.street}</p>)}

                        <input name={'house'} placeholder={'House'} value={form.house} onChange={handelChange}/>
                        {error.profile?.house && (<p>{error.profile.house}</p>)}

                        <input name={'city'} placeholder={'City'} value={form.city} onChange={handelChange}/>
                        {error.profile?.city && (<p>{error.profile.city}</p>)}

                        <input name={'region'} placeholder={'Region'} value={form.region} onChange={handelChange}/>
                        {error.profile?.region && (<p>{error.profile.region}</p>)}

                        <input name={'country'} placeholder={'Country'} value={form.country} onChange={handelChange}/>
                        {error.profile?.country && (<p>{error.profile.country}</p>)}

                        <select name={'gender'} value={form.gender} onChange={handelChange}>
                            <option value={''}>Select Gender</option>
                            <option value={'Female'}>Female</option>
                            <option value={'Male'}>Male</option>
                        </select>
                        {error.profile?.gender && (<p>{error.profile.gender}</p>)}

                        {error.general && (<p>{error.general}</p>)}

                        <button type={'submit'}>REGISTER</button>
                    </form>
                )}
                <button onClick={() => navigate(-1)}>BACK</button>
            </div>
        </div>
    );
};

export {RegistrationFormComponent};