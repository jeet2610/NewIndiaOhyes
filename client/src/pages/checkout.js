import { Link, navigate } from 'gatsby'
import React, { useState, useEffect } from 'react';
import axios, { URL } from '../services/api';
import isLoggedIn from '../services/auth';


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

const Checkout = () => {

    const [Details, setDetails] = useState();
    
    const [addressFormDisplay, setAddressFormDisplay] = useState();
    const [user, setUser] = useState();
    const [cart, setCart] = useState();
    const [SelectedItems, setSelectedItems] = useState();

    useEffect(() => {
        if (!isLoggedIn())
            return navigate('/login');

        axios
            .get('/users/cart')
            .then(res => {
                setDetails(res.data.data.cart)

            })
            .catch(err => {
                setDetails([]);
                console.log(err.response);
            });


        axios
            .get('/order')
            .then(res => {


            })
            .catch(err => {

                console.log(err.response);
            });


        axios
            .get('/users/me')
            .then(res => {
                setUser(res.data.data.user);
            })
            .catch(err => {
                setUser({});
                navigate('/login');
                console.log(err.response);
            });

        axios
            .get('/users/cart')
            .then(res => setCart(res.data.data.cart))
            .catch(err => {
                setCart([]);
                console.log(err.response);
            });

    }, []);


    async function displayRazorpay() {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }

        const data = await fetch('http://localhost:3000/api/order', { method: 'POST' }).then((t) =>
            t.json()
        )

        console.log(data)
        


        const options = {
            key: 'rzp_test_riR65g07X6XqfK',
            currency: data.currency,
            amount: data.amount,
            order_id: data.o_id,
            name: 'Donation',
            description: 'Thank you for nothing. Please give us some money',
            image: '',
            handler: function (response) {
                if (response.razorpay_payment_id != null) {

                    axios
                        .post('/placeorder/place-order',{

                            payment_id : response.razorpay_payment_id,
                            razorpay_signature : response.razorpay_signature,
                            oder_id : data.o_id
                        })
                        
                        .then(res => {
                                console.log(res);
                                
                                
                        })
                       
                        .catch(err => {
                            console.log(err.response);
                        });


                } else {
                    alert("payment not succesfull")
                }
                alert(response.razorpay_signature)
                alert(response.razorpay_payment_id)
                alert(data.o_id)



            },

            prefill: {
                name: user.name,
                email: user.email,
                phone_number: user.phone
            }
        }


        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    


    return (
        <div className='div h-screen bg-gray-100'>

            <div className='h-full w-full flex tab-port:flex-col'>
                <div className='w-full h-full bg-gray-100 py-6 px-3 '  >

                    <div className='flex items-center font-light' >
                        <Link to='/shop'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 19l-7-7 7-7' />
                            </svg>
                        </Link>

                        <button><Link to='/shop'>Back to cart</Link></button>
                    </div>



                    <span className='mt-3 block'>Shipping address </span>

                    <div>
                        {
                            user?.address.map((addr, i) => (
                                <div key={i} className='w-full h-10  flex items-center justify-between px-2 bg-white shadow-sm mt-3'>
                                    <div className='flex space-x-2 items-center'>
                                        <div className='rounded-full h-4 w-4 border-2 border-gray-700 '>

                                        </div>

                                        <div className='text-sm truncate text-gray-500 '>{addr}</div>
                                    </div>


                                    <div className='flex space-x-2  '>
                                        <Link to='/profile' className='text-sm text-purple-600 block'> Edit</Link>
                                    </div>

                                </div>
                            ))
                        }


                        <div className='w-full py-1  justify-between px-2 bg-white shadow-sm mt-3'>

                            <div className='flex  mb-2 pt-2'>
                                <input type='checkbox' className='hidden' onChange={e => setAddressFormDisplay(e.target.checked)} id='addnew' />
                                <label htmlFor='addnew' className='rounded-full h-4 w-4 border-2 border-gray-700 flex justify-center items-center p-[1px]'>
                                    <div className={`rounded-full bg-purple-700 h-full w-full ${addressFormDisplay ? '' : 'hidden'}`}>
                                    </div>
                                </label>
                                <div className='text-sm truncate text-gray-500 ml-2'>Add New Address </div>


                            </div>
                            <form onSubmit={async e => {
                                e.preventDefault();

                                let addr = [
                                    e.target['address'].value,
                                    e.target['city'].value,
                                    e.target['state'].value,
                                    e.target['zip'].value
                                ].join(' ');

                                try {
                                    const response = await axios.patch('users/me', { address: [...user.address, addr] });

                                    setUser(response.data.data.user);
                                }
                                catch (err) {
                                    console.log(err);
                                    console.log(err.response);
                                    console.log(err.response?.data);
                                }
                            }}
                            >
                                <div className={addressFormDisplay ? '' : 'hidden'}>
                                    <div className='w-full   mb-2'>
                                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold  mb-1' >
                                            ADDRESS
                                        </label>
                                        <input id='address' className='appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-solid  focus:border-purple-500 rounded py-2 px-4  leading-tight focus:outline-none focus:bg-white' type='text' placeholder='street' required={true} />
                                    </div>



                                    <div className='flex mx-3 mb-2'>
                                        <div className='w-full md:w-1/3 px-3 mb-3 md:mb-0'>
                                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-city'>
                                                City
                                            </label>
                                            <input id='city' className='appearance-none block w-full bg-gray-200 text-gray-700 focus:border-solid border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white  focus:border-purple-500' type='text' placeholder='Vadodara'>
                                            </input>
                                        </div>
                                        <div className='w-full md:w-1/3 px-3 mb-3 md:mb-0'>
                                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-city'>
                                                State
                                            </label>
                                            <input id='state' className='appearance-none block w-full bg-gray-200 text-gray-700 focus:border-solid border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white  focus:border-purple-500 ' type='text' placeholder='Gujarat'>
                                            </input>
                                        </div>
                                        <div className='w-full md:w-1/3 px-3 mb-3 md:mb-0'>
                                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-zip'>
                                                Zip
                                            </label>
                                            <input id='zip' className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 focus:border-solid' type='text' placeholder='90210'></input>
                                        </div>
                                    </div>
                                    <div className='flex justify-end space-x-5 mr-5 mt-5 mb-4'>
                                        <button className='bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded'>
                                            Reset
                                        </button>

                                        <button className='bg-purple-200 hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 rounded'>
                                            Save
                                        </button>



                                    </div>


                                </div>


                            </form>



                        </div>



                    </div>

                    <div>


                        <span className='mt-10 block '>Payment Method  </span>

                        <div className=''>
                            <div className='w-full h-10  flex items-center justify-between px-2 bg-white shadow-sm mt-3'>

                                <div className='flex space-x-2 items-center'>
                                    <input type="radio" class="form-radio h-4 w-4" name="accountType" value="personal" id='offline' />


                                    <div className='text-sm truncate text-gray-500 '>Debit or Credit Card </div>
                                </div>


                            </div>

                            <div className='w-full h-10  flex items-center justify-between px-2 bg-white shadow-sm mt-3'>

                                <div className='flex space-x-2 items-center'>
                                    <label class="inline-flex items-center">
                                        <input type="radio" className='form-radio text-purple-400 h-4 w-4' name="accountType" value="personal" id='offline' />

                                    </label>
                                    <div className='text-sm truncate text-gray-500 '>Cash On Delivery  </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                {
                    Details
                        ?
                        <div className='w-2/3 h-full px-4 mt-8 tab-port:w-full'>

                            <div className='bg-white w-full py-8 flex flex-col px-3 '>

                                <span className=''> Order Summary </span>

                                <div className='text-sm font-normal  mt-4'>
                                    <div className='flex justify-between'>
                                        <div>
                                            <span >Items</span>
                                            <span> ():</span>
                                        </div>

                                        <span>₹{Details.totalPrice || 0}</span>
                                    </div>

                                    <div className='flex justify-between'>
                                        <div>
                                            <span >Shipping & Handling </span>

                                        </div>

                                        <span>₹23</span>
                                    </div>

                                    <div className='flex justify-between'>
                                        <div>
                                            <span >tax</span>

                                        </div>

                                        <span>₹12</span>
                                    </div>

                                    <div className='border-2 mx-3 mt-6'></div>

                                    <div className='flex justify-between text-base mt-4'>
                                        <div>
                                            <span >Total</span>

                                        </div>

                                        <span>₹{(Details.totalPrice + Details.totalPrice / 10) || 0}</span>
                                    </div>
                                </div>
                                <div className='flex flex-col space-y-2'>
                                    <button className='bg-purple-400 px-8 py-2 rounded mt-4 text-white' onClick={displayRazorpay}>Place Order</button>

                                    <p className='text-xs font-light text-gray-500'>By placing your order agree to our company <span className='underline'>Privacy policy</span>  and <span className='underline'>Conditions of use</span></p>
                                </div>
                            </div>

                        </div>
                        : <></>
                }

            </div>


        </div>
    )
}


export default Checkout;