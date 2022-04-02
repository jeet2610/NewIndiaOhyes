import React from 'react';

const Input = props => (
    <input
        className='w-full py-3 border-gray-300 border-solid border-0 border-b-2 text-black focus:border-gray-400'
        id={props.id || ''}
        type={props.type || 'text'}
        defaultValue={props.defaultValue || ''}
        required={true}
        placeholder={props.placeholder || ''}
    />
);

export default Input;