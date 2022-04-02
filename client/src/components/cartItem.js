import React from 'react';

import axios, { URL } from '../services/api';

const CartItem = ({ data, id, setCart }) => (
    <div className='bg-white p-6 flex mb-4'>
        <img src={`${URL}/images/products/test.png`} alt='CART ITEM' className='h-20' />

        <div className='flex flex-col ml-3 mr-auto'>
            <h2>{data.title}</h2>
            <p className='text-xs mb-auto'>Great Quality</p>
            <p className='text-sm text-violet font-semibold'>₹{data.price}</p>
        </div>

        <div className='flex flex-col justify-between items-center'>
            <button className='bg-violet h-6 w-6 text-gray-100 bg-opacity-70 rounded-md' onClick={async () => {
                try {
                    const response = await axios.get(`/users/cart/add-to-cart/${id}`);
                    setCart(response.data.data.cart);
                }
                catch (err) {
                    console.log(err);
                }
            }}>+</button>
            <span>{data.quantity}</span>
            <button className='bg-violet h-6 w-6 text-gray-100 bg-opacity-70 rounded-md'  onClick={async () => {
                try {
                    const response = await axios.get(`/users/cart/remove-cart-item/${id}`);
                    setCart(response.data.data.cart);
                    console.log(response.data);
                }
                catch (err) {
                    console.log(err);
                }
            }}>-</button>
        </div>
    </div>
);

export default CartItem;