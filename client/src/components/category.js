import React from 'react';

import ArrowIcon from '../assets/arrow.svg';

const Category = props => (
    <div className='flex flex-col items-center space-y-10 p-6 rounded-2xl bg-white' style={{
        boxShadow: '9px 9px 18px #cacaca, -9px -9px 18px #f6f6f6'
    }}>
        <img src={props.image} alt='SERVICE' className='h-24 w-20 object-cover' />
        <a href={props.href} className='flex capitalize items-center'>{props.title} service <ArrowIcon /></a>
    </div>
);

export default Category;