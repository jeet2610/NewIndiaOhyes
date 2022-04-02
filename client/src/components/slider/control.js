import React from 'react';

const Control = props => (
    <button
        className={`absolute flex justify-center items-center h-12 w-12 bg-gray-300 opacity-70 rounded-full top-1/2 transition-opacity ${props.align === 'left' ? 'left-8' : 'right-8'} hover:opacity-100`}
        onClick={props.onClick}
    >
        {props.label}
    </button>
);

export default Control;