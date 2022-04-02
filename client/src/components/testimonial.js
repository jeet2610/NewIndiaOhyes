import React from 'react';

const Testimonial = props => (
    <figure className='relative h-full flex flex-col justify-center text-center bg-gray-100 space-y-2'>
        <p className='text-xl'>
            <span className='text-9xl text-gray-400 absolute left-32 top-10' style={{ fontFamily: 'sans-serif' }}>&ldquo;</span>
            {props.review}
        </p>
        <h4>{props.writer}</h4>
        <h5 className='text-xs font-light'>{props.writerRole}</h5>
    </figure>
);

export default Testimonial;