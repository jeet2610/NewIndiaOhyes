import React from 'react';

const Slide = props => (
    <div
        className='absolute w-full h-full top-0 left-0 transition-transform duration-1000'
        style={{ transform: `translateX(${props.translate}%)` }}
    >
        {props.children}
    </div>
);

export default Slide;