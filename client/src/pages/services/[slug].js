import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { Helmet } from 'react-helmet';

import axios, { URL } from '../../services/api';
import isLoggedIn, { logout } from '../../services/auth';

import Layout from '../../components/layout';
import Heading from '../../components/heading';
import FormGroup from '../../components/form/formgroup';
import Button from '../../components/buttons/button';
import Button2 from '../../components/buttons/button2';
import Loader from '../../components/loader';
import SubmitMessage from '../../components/submitMessage';

import ArrowIcon from '../../assets/arrow.svg';
import NotFoundSVG from '../../assets/notfound.svg';

const ServicePage = ({ params }) => {
    const [user, setUser] = useState();
    const [data, setData] = useState();
    const [descriptionState, setDescriptionState] = useState(false);
    const [popupState, setPopupState] = useState(false);

    const [total, setTotal] = useState(0);
    const [selectedPackages, setSelectedPackages] = useState(new Set());

    useEffect(() => {
        if (isLoggedIn())
            axios
                .get('/users/me')
                .then(response => {
                    setUser(response.data.data.user);
                })
                .catch(err => {
                    console.log(err.response);
                    logout(() => navigate('/login'))
                });

        axios
            .get(`/services/slug/${params.slug}`)
            .then(response => {

                setData(response.data.data.service);

            })
            .catch(err => {
                console.log(err.response);
                err.response?.data.status === 'fail' && navigate('/404');
            });
    }, [params.slug]);

    return (
        <>
            <Helmet>
                <title>Indiaohyes &mdash; {data?.title || 'Service'}</title>
            </Helmet>

            <Layout>
                {popupState ? <SubmitMessage /> : <></>}

                {
                    data
                        ? <div className='grid grid-cols-[22rem,1fr] tab-port:grid-cols-none'>
                            <div className='col-span-full space-y-7 bg-gray-100 pt-20 pb-6 px-12 tab-port:pt-6'>
                                <Heading align='left' className='text-violet'>{data.title}</Heading>

                                <p className={descriptionState ? '' : 'hidden'}>
                                    {data.summary}
                                </p>

                                <Button2 onClick={() => setDescriptionState(!descriptionState)}>
                                    View {descriptionState ? 'less' : 'more'}
                                </Button2>
                            </div>

                            <div className='bg-cream flex flex-col'>
                                <h3 className='text-2xl text-center my-12'>Choose other services</h3>

                                <div className='px-10 overflow-auto mb-auto h-[85vh] tab-land:px-5 tab-port:h-auto'>
                                    {
                                        data.packages?.map((pack, i) => (
                                            <label className='bg-white block p-4 rounded-xl mb-8' htmlFor={`pack${i}`} key={i}>
                                                <div className='flex justify-between'>
                                                    <h4>
                                                        <span className='font-semibold capitalize block w-2/3 mb-2'>{pack.title}</span>
                                                        <span>₹{pack.price}</span>
                                                    </h4>
                                                    <input type='checkbox' id={`pack${i}`} onChange={e => {
                                                        if (e.target.checked) {
                                                            selectedPackages.add(pack._id);
                                                            setTotal(total + pack.price);
                                                        }
                                                        else {
                                                            selectedPackages.delete(pack._id);
                                                            setTotal(total - pack.price);
                                                        }
                                                    }} />
                                                </div>

                                                <ul className={pack.points ? 'mt-4' : ''}>
                                                    {pack.points?.map((pt, i) => <li className='flex' key={i}><ArrowIcon />{pt}</li>)}
                                                </ul>
                                            </label>
                                        ))
                                    }
                                </div>

                                <div className='bg-violet text-white rounded-tl-3xl rounded-tr-3xl py-6 px-10 flex justify-between tab-port:rounded-none'>
                                    <span className='font-semibold tracking-wider'>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>
                            {
                                isLoggedIn()
                                    ? <form className='text-gray-500 grid grid-cols-2 gap-x-16 gap-y-10 content-start px-32 py-10 tab-land:grid-cols-none tab-land:px-10' onSubmit={async e => {
                                        try {
                                            e.preventDefault();

                                            // const response = await axios.post('/bookings/book-service', {
                                            //     service: data._id,
                                            //     selectedPackage: Array.from(selectedPackages),

                                                const response = await axios.post('/bookings/book-service', {
                                                    service: data._id,
                                                    selectedPackages: Array.from(selectedPackages),
                                                    instructions: e.target['instructions'].value,
                                                    totalAmount : total
                                            });

                                            console.log(""+data._id);

                                            setPopupState(true);
                                        }
                                        catch (err) {
                                            console.warn('ERR AT API ENDPOINT')
                                            console.log(err.response);
                                            if (err.response?.data?.message?.includes?.('jwt'))
                                                logout(() => navigate('/login'));
                                        }
                                    }}>
                                        <h2 className='col-span-full text-3xl text-center text-black'>Order Now</h2>

                                        <FormGroup label='full name' inputValue={user?.name} />
                                        <FormGroup label='phone number' inputType='tel' inputValue={user?.phone} />

                                        <FormGroup label='email' inputValue={user?.email} />
                                        <FormGroup label='budget in rupees' inputType='number' inputValue='5000' />

                                        <FormGroup label='date of event' inputType='date' inputValue={new Date().toISOString().slice(0, 10)} />
                                        <FormGroup label='time of event' inputType='time' inputValue='12:00' />

                                        <FormGroup label='place of event' />
                                        <FormGroup label='state' />

                                        <FormGroup className='col-span-full' label='your current address' inputValue={user?.address} />
                                        <FormGroup className='col-span-full' label='other requirements (if any)' id='instructions' />
                                        <div className="mt-4" name="radioButton">
                                            <span className="text-gray-700">Payment Method</span>
                                            <div className="mt-2">
                                                <label className="inline-flex items-center">
                                                    <input type="radio" className="form-radio" name="accountType" value="personal" id='offline' />
                                                    <span className="ml-2">Offline</span>
                                                </label>

                                                <label className="inline-flex items-center ml-6">
                                                    <input type="radio" className="form-radio" name="accountType" value="busines" id='online' />
                                                    <span className="ml-2">Online</span>
                                                </label>
                                            </div>
                                        </div>
                                        <Button type='submit' className='col-span-full'>Submit</Button>
                                    </form>
                                    : <div className='flex flex-col items-center justify-center space-y-16'>
                                        <NotFoundSVG className='h-96' />
                                        <Button isLink={true} to='/login'>Login to book a service</Button>
                                    </div>
                            }

                        </div>

                        : <Loader className='h-screen' />
                }
            </Layout>
        </>
    );
};

export default ServicePage;