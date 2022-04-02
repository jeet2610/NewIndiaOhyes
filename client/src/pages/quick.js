import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../components/layout';
import Intro from '../components/form/intro';
import FormGroup from '../components/form/formgroup';
import Button from '../components/buttons/button';

const QuickForm = () => {
    return (
        <>
            <Helmet>
                <title>Indiaohyes &mdash; Quick Inquiry</title>
            </Helmet>

            <Layout>
                <div className='grid grid-cols-[1fr,1.5fr] px-10 pb-10 gap-20 min-h-screen tab-port:grid-cols-none phone:p-0 phone:m-0'>
                    <Intro className='phone:mt-0' />

                    <form className='text-gray-500 grid grid-cols-2 gap-16 content-start py-10 phone:px-8 phone:grid-cols-none'>
                        <FormGroup label='first name' inputPlaceholder='eg: Johnathan' />
                        <FormGroup label='last name' inputPlaceholder='eg: Smith' />

                        <FormGroup label='email address' inputPlaceholder='eg: john.smith@gmail.com' />
                        <FormGroup label='phone number' inputPlaceholder='eg: +916543210908' />

                        <FormGroup label='message' className='col-span-full' inputPlaceholder='eg: I would like to know more about brahmin bhojan.' />
                        <Button type='submit' className='col-span-full'>Submit</Button>
                    </form>
                </div>
            </Layout>
        </>
    );
};

export default QuickForm;