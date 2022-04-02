import React from 'react';
import { Link } from 'gatsby';

const btnClasses = 'inline-block px-16 py-4 bg-violet text-white rounded-xl col-span-full justify-self-center shadow-md hover:bg-violet-dark transition-colors';

const Button = props => props.isLink
    ? <Link className={btnClasses} to={props.to || '/'}>{props.children}</Link>
    : <button
        type={props.type || 'button'}
        className={`${btnClasses} ${props.className || ''}`}
        onClick={e => props.onClick?.(e)}
    >
        {props.children}
    </button>

export default Button;