import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import axios from '../services/api';
import isLoggedIn from '../services/auth';

import Product from '../components/product';
import CartItem from '../components/cartItem';
import Loader from '../components/loader';
import Button from '../components/buttons/button';

import BagIcon from '../assets/bag.svg';

const ShopPage = () => {
	// State variables
	const [data, setData] = useState();
	const [cart, setCart] = useState();
	const [cartDisplay, setCartDisplay] = useState(false);

	// Fetching data from API
	useEffect(() => {
		axios
			.get('/products')
			.then(res => setData(res.data.data.products))
			.catch(err => {
				setData([]);
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

	return (
		<div className='min-h-screen tab-land:grid-cols-none'>
			<div className='p-8'>
				<div className='flex justify-between items-center mb-6 col-span-full'>
					<Link to='/' className='font-semibold text-xl'>Go Home</Link>
					<button className='relative' onClick={() => setCartDisplay(true)}>
						<div className='absolute w-6 h-6 rounded-full bg-violet -right-4 -top-4 text-white'>{Object.entries(cart?.items || {}).length || 0}</div>
						<BagIcon />
					</button>
				</div>

				<input type='text' className='w-full bg-gray-100 py-2 px-4 rounded-lg' placeholder='Search' />

				<div className='grid grid-cols-3 gap-10 mt-6 tab-port:grid-cols-2 phone:grid-cols-none'>
					{
						data
							? data.length
								? data.map((product, i) => <Product key={i} data={product} setCart={setCart} />)
								: <h1>No data found</h1>
							: <Loader className='col-span-full' />
					}
				</div>
			</div>

			<div className={`flex flex-col h-screen w-96 tab-port:w-full z-10 top-0 right-0 overflow-auto mb-auto tab-land:mb-10 bg-cream p-5 fixed ${!cartDisplay ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
				<div className='flex justify-between items-center mb-12'>
					<button
						className='bg-violet rounded-md text-white text-xs px-2 py-1'
						onClick={async () => {
							try {
								const response = await axios.get('/users/cart/clear');
								setCart(response.data.data.cart);
							}
							catch (err) {
								console.log(err);
							}
						}}
					>
						Clear
					</button>

					<button className='text-4xl' onClick={() => setCartDisplay(false)}>&times;</button>
				</div>
				<div className='mb-auto'>
					{
						cart
							? Object.entries(cart.items)
								? Object.entries(cart.items).map(([property, item], i) => <CartItem data={item} id={property} key={i} setCart={setCart} />)
								: <h1 className='text-center'>Fill up your cart now!</h1>
								
							: <Loader />
					}
				</div>

				<div className='bg-white rounded-tl-2xl rounded-tr-2xl p-6 capitalize'>
					<p className='flex justify-between'>
						<span className='font-semibold'>sub total:</span>
						<span>₹{cart?.totalPrice}</span>
					</p>
					<p className='flex justify-between border-b-2 pb-2 border-gray-200'>
						<span className='font-semibold'>tax:</span>
						<span>18% GST</span>
					</p>
					<p className='flex justify-between mb-8'>
						<span className='font-semibold'>Grand Total:</span>
						<span>₹{cart?.totalPrice + cart?.totalPrice / 10}</span>
					</p>
					<div className='text-center'>
						{
							isLoggedIn()
								? <Button isLink={true} to='/checkout'>Check Out</Button>
								: <Button isLink={true} to='/login'>Please login to place an order</Button>
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopPage;