import React from 'react';

const Bubble = props => (
    <div className={`absolute w-36 h-36 bg-${props.color || 'white'} opacity-80 rounded-full ${props.coordinates}`}></div>
);

export default Bubble;