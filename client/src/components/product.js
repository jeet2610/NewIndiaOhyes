import React from 'react';

import axios, { URL } from '../services/api';

const Product = ({ data, setCart }) => (
    <div className='bg-cream flex items-center rounded-xl py-2 px-4'>
        <img src={`${URL}/images/products/test.png`} alt='PRODUCT' className='h-20' />

        <div className='ml-4 mr-auto'>
            <h3>{data.title}</h3>
            <p className='text-xs mb-2'>Great Quality</p>
            <p className='text-sm text-violet font-semibold'>₹{data.price}</p>
        </div>

        <button className='block self-end text-2xl hover:text-violet-dark' onClick={async () => {
            try {
                const response = await axios.get(`/users/cart/add-to-cart/${data._id}`);
                setCart(response.data.data.cart);
            }
            catch (err) {
                console.log(err);
            }
        }}
        >
            +
        </button>
    </div>
);

export default Product;