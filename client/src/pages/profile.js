import Layout from '../components/layout';
import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import isLoggedIn from '../services/auth';
import { navigate } from 'gatsby';
import Popup from '../components/form/popup';
import delay from '../utils/timer';
import OrderHistory from '../components/orderhistory';
import Loader from '../components/loader';

const Field = props => (
    <div className={props.className || ''}>
        <label className='block capitalize text-gray-700 text-sm font-bold mb-2'>
            {props.label}
        </label>
        <input required={true} className='shadow border-2 border-transparent w-full border-solid rounded py-4 px-3 text-gray-700 focus:outline-none focus:border-purple-500' id={props.id} type='text' defaultValue={props.defaultValue} />
    </div>
);

const Profile = () => {
    const [user, setUser] = useState();
    const [orderHistory,setOrderHistory] = useState();
    const [popupConfig, setPopupConfig] = useState();

    useEffect(() => {
        if (!isLoggedIn())
            return navigate('/login');
      
        axios
            .get('/users/me')
            .then(res => {
                setUser(res.data.data.user);
            })
            .catch(err => {
                setUser({});
                console.log(err.response);
            });


            axios
            .get('/bookings/my-Bookingorders')
            .then(res => {
                
                setOrderHistory(res.data.data.bookingOrders);
                console.log(res.data);

            })
            .catch(err => {
                setOrderHistory({});
                console.log(err.response);
            });
    }, []);

    return (
        <Layout>
            <Popup config={popupConfig} />
            {
                user
                    ? <form className='px-8 py-8' onSubmit={async e => {
                        e.preventDefault();

                        const response = await axios.patch('/users/me', {
                            name: e.target['fullname'].value,
                            email: e.target['email'].value,
                            address: [e.target['address'].value]
                        });

                        setUser(response.data.data.user);

                        setPopupConfig({
                            bg: 'green',
                            visible: true,
                            message: 'Data updated successfully!'
                        });

                        await delay(2);

                        setPopupConfig({});
                    }}
                    >
                        <h1 className='mb-12 text-2xl font-semibold'>Profile</h1>

                        <div className='grid grid-cols-2 gap-10 tab-port:grid-cols-none'>
                            <Field label='full name' defaultValue={user.name} id='fullname' />

                            <Field label='email' defaultValue={user.email} className='col-span-full' id='email' />

                            <Field label='address' defaultValue={user.address} className='col-span-full' id='address' />

                            <div className='flex justify-end space-x-5 col-span-full'>
                                <button type='submit' className='bg-purple-200 hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 rounded'>
                                    Save
                                </button>
                                <button type='reset' className='bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded'>
                                    Reset
                                </button>
                            </div>
                        </div>
                    </form>
                    : <></>
            }

           <div className="px-7 " > 

            <div className="flex justify-center py-11 font-bold">

                <span>Your Booked service History</span>

             </div>

           <div className='flex flex-col gap-7 py-16' >
							{
								orderHistory
									? orderHistory.length
										? orderHistory.map((order, i) => <OrderHistory
											key={i}
											title={order.service.title}
                                            totalPrice = {order.total}
                                            date= {order.dateAndTimeOfEvent}
										/>)
										: <h2>No data found</h2>
									: <div className='flex justify-center col-span-full'>
										<Loader />
									</div>
							}
						</div>
           </div>

        </Layout>


    )
}

export default Profile