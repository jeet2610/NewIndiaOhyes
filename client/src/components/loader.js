import React from 'react';

const Loader = props => (
    <div className={`flex justify-center items-center ${props.className}`}>
        <div className='animate-spin h-20 w-20 rounded-full border-8' style={{ borderTopColor: 'rgba(31, 41, 55, .9)' }}></div>
    </div>
);

export default Loader;