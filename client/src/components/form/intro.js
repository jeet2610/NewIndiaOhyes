import React from 'react';

import Curtain from '../abstracts/curtain';
import Bubble from '../abstracts/bubble';

import LogoImg from '../../images/logo.png';

import InstagramIcon from '../../assets/instagram.svg';
import FacebookIcon from '../../assets/facebook.svg';
import LinkedInIcon from '../../assets/linkedin.svg';
import TwitterIcon from '../../assets/twitter.svg';

const Intro = props => (
    <div className={`mt-10 relative flex flex-col bg-cream p-8 overflow-hidden shadow-xl tab-port:shadow-none ${props.className}`}>
        <img src={LogoImg} alt='LOGO' className='w-48 self-center mt-12' />

        <p className='mt-16'>
        Religion Is Strong Backbone Of India’s Global Image Since It’s Existence. As The Life Becomes Faster, This Formalities mong Masses Has Declined.Customised, Tailor-made, Bespoke dream destinations brought to you by India Oh Yes!.Tour packages to Dubai, Singapore, Mauritius, Thailand, Sri Lanka, Far East, Bali, Maldives, Malaysia, Seychelles as well!
        </p>

        <p className='mt-4 mb-auto'>
        Medical Tourism is a recent phenomenon in the world of medical care. We come up with a FREE concept (Fastest, Reliable, Economical and Efficient) which will reduce time requirement and financial burden. From this technological platform.
        </p>

        <div className='flex space-x-6 tab-port:mt-60'>
            <InstagramIcon />
            <FacebookIcon />
            <LinkedInIcon />
            <TwitterIcon />
        </div>

        <Curtain coordinates='bottom-0 right-0' />
        <Bubble coordinates='bottom-16 right-24' />
    </div>
);

export default Intro;