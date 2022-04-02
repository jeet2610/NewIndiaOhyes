import React from 'react';

import FacebookIcon from '../../assets/facebook.svg';
import InstagramIcon from '../../assets/instagram.svg';
import TwitterIcon from '../../assets/twitter.svg';

import logo from '../../images/logo.png';

const Footer = () => (
    <footer className='grid grid-cols-2 gap-y-20 py-16 px-20 bg-gray-800 text-white tab-land:grid-cols-none phone:px-10'>
        <div className='tab-land:col-span-full tab-land:flex tab-land:justify-between phone:flex-col phone:items-center'>
            <img src={logo} alt='LOGO' className='h-12 mb-12 tab-land:mb-0 phone:mb-8' />
            <button className='pb-3 border-b-2 border-gray-100 ml-4'>Ask a question &nbsp; &rarr;</button>
        </div>

        <div className='space-y-6 w-2/3 justify-self-end tab-land:justify-self-center tab-land:text-center'>
            <h3 className='font-semibold text-3xl'>Subscribe to our Newsletter</h3>

            <p>
                A-32 Riddhi Siddhi Nagar,
                Near Mahavir Hall,Ajwa Road
                District: Vadodara,GUJARAT-INDIA
                Pin Code: 390 019
            </p>

            <p>
                #1-10318 Whalley Blvd. Surrey,BC V3T 4H4
                +1(778)825-1066
                Canada
            </p>

            <p>
                Phone: +91 7043584494
            </p>
        </div>

        <div className='col-span-full flex justify-center space-x-12'>
            <a href='https://facebook.com/' rel='noreferrer' target='_blank' aria-label='FACEBOOK'>
                <FacebookIcon fill='#ffffff' />
            </a>
            <a href='https://instagram.com/' rel='noreferrer' target='_blank' aria-label='INSTAGRAM'>
                <InstagramIcon fill='#ffffff' />
            </a>
            <a href='https://twitter.com/' rel='noreferrer' target='_blank' aria-label='TWITTER'>
                <TwitterIcon fill='#ffffff' />
            </a>
        </div>
    </footer>
);

export default Footer;