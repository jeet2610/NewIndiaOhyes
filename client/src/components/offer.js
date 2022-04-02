import React from 'react';
import { URL } from '../services/api';

import Button from '../components/buttons/button2';

const Offer = props => (
    <div className='bg-gray-100 h-full flex flex-col justify-around items-center text-center px-24 py-6'>
        <img src={`${URL}/${props.image}`} alt='OFFER' className='h-60' />
        <h2 className='font-semibold text-2xl'>{props.summary}</h2>
        <p>{props.description}</p>
        <Button isLink={true} to={`/services/${props.link}`}>Explore</Button>
    </div>
);

export default Offer;