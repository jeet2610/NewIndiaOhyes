import React from 'react';

import Input from './input';

const FormGroup = props => (
    <div className={props.className || ''}>
        <label htmlFor={props.id} className='block capitalize'>{props.label}</label>
        <Input id={props.id} type={props.inputType} defaultValue={props.inputValue} placeholder={props.inputPlaceholder} />
    </div>
);

export default FormGroup;