import React from 'react';

import Heading from './heading';
import Button from './buttons/button';

import SubmitSVG from '../assets/submit.svg';

const SubmitMessage = () => (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-95 z-50'>
        <div className='w-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cream rounded-xl py-24 text-center space-y-12'>
            <SubmitSVG height='200' className='mx-auto' />
            <Heading className='text-violet leading-relaxed'>Form submitted successfully. <br /> We will contact you in few minutes.</Heading>
            <Button isLink={true} to='/'>Back to home</Button>
        </div>
    </div>
);

export default SubmitMessage;