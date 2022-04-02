import React from 'react';
import { URL } from '../services/api';

import Button from './buttons/button2';

const Service = ({ data }) => (
    <div className='bg-cream p-7 rounded-xl flex flex-col'>
        <img src={`${URL}/${data.image}`} alt='SERVICE' className='-mt-36' />
        <h3 className='text-2xl'>{data.title}</h3>
        <p className='mt-3 mb-5'>{data.description}</p>
        <div className='text-center mt-auto'>
            <Button isLink={true} to={`/services/${data.slug}`}>More Details</Button>
        </div>
    </div>
);

export default Service;