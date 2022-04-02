import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { Helmet } from 'react-helmet';
import axios from '../services/api';
import { login } from '../services/auth';

import Layout from '../components/layout';
import Button from '../components/buttons/button';
import FormGroup from '../components/form/formgroup';
import Form from '../components/form';
import Loader from '../components/loader';
import Popup from '../components/form/popup';

import delay from '../utils/timer';
import Exception from '../utils/exception';

const LoginPage = () => {
    const [loaderState, setLoaderState] = useState(false);
    const [popupDetails, setPopupDetails] = useState();

    return (
        <>
            <Helmet>
                <title>Indiaohyes &mdash; Login</title>
            </Helmet>
            <Layout>
                <Popup config={popupDetails} />

                <Form
                    title='Login'
                    onSubmit={async e => {
                        e.preventDefault();

                        try {
                            setLoaderState(true);

                            const res = await axios.post('/users/verify-login', { otp: e.target['otp'].value });

                            login(res.data.data.token);

                            setLoaderState(false);
                            setPopupDetails({ visible: true, message: 'Logged in successfully!', bg: 'green' });

                            await delay(2);
                            navigate('/profile');
                        }
                        catch (err) {
                            setLoaderState(false);
                            setPopupDetails({ visible: true, message: err.response?.data.message, bg: 'red' });

                            await delay(3);
                            setPopupDetails({ visible: false });
                        }
                    }}
                >
                    <FormGroup id='phone' inputType='tel' label='enter your phone number' />
                    <div className='text-center'>
                        <Button
                            onClick={async e => {
                                try {
                                    const phoneNumber = e.target.closest('form')['phone'].value;
                                    if (!phoneNumber || phoneNumber.length !== 13)
                                        throw new Exception({
                                            data: {
                                                message: 'Please enter a valid phone number'
                                            }
                                        });


                                    setLoaderState(true);
                                    const response = await axios.post(
                                        '/users/login',
                                        { phone: phoneNumber }
                                    );
                                    setLoaderState(false);

                                    setPopupDetails({ visible: true, message: response.data.message, bg: 'green' });
                                    await delay(3);
                                    setPopupDetails({ visible: false });
                                }
                                catch (err) {
                                    console.log(err);
                                    setLoaderState(false);

                                    setPopupDetails({ visible: true, message: err.response?.data.message, bg: 'red' });
                                    await delay(3);
                                    setPopupDetails({ visible: false });
                                }
                            }}
                        >
                            Send OTP
                        </Button>
                    </div>

                    <FormGroup id='otp' label='Enter OTP' />
                    <div className='flex justify-center'>
                        {loaderState ? <Loader /> : <Button type='submit'>Verify</Button>}
                    </div>
                </Form>
            </Layout>
        </>
    );
};

export default LoginPage;