import React from 'react';
import Button from './buttons/button';

const Field = props => (
    <div className='mb-4'>
        <label className='block capitalize text-gray-700 text-sm font-bold mb-2'>
            {props.label}
        </label>
        <input className='shadow border-2 border-transparent w-full border-solid rounded py-4 px-3 text-gray-700 focus:outline-none focus:border-purple-500' id='password' type='text'/>
    </div>
);

const MakeMoney = () => {
    return (
        <section className='grid grid-cols-[1fr,1.5fr] py-12 px-10 tab-port:grid-cols-none'>
            <div className='space-y-8 tab-port:text-center'>
                <h2 className='leading-normal text-4xl font-semibold capitalize tab-port:text-center'>be smart in investing <br /> make money with us</h2>
                <p>contact us </p>
                <Button className='tab-port:hidden'>Start investing</Button>
            </div>

            <div className='grid grid-cols-2 gap-12 tab-port:grid-cols-none'>
                <Field label='email' />
                <Field label='phone number' />
                <Field label='email' />
                <Field label='address' />
            </div>

            <Button className='hidden mt-8 tab-port:block'>Start investing</Button>
        </section>
    );
};

export default MakeMoney;