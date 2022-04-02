import React from 'react';

const Curtain = props => (
    <div className={`absolute w-20 h-20 bg-violet rounded-full ${props.coordinates}`} style={{ transform: 'scale(3.5)' }}></div>
);

export default Curtain;