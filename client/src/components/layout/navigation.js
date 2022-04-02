import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';

import isLoggedIn, { logout } from '../../services/auth';

import Button from '../buttons/button2';

import logo from '../../images/logo.png';

import BagIcon from '../../assets/bag.svg';
import HamburgerIcon from '../../assets/menu.svg';
import UserIcon from '../../assets/user.svg';

import * as styles from '../../styles/layout/nav.module.scss';

const Nav = props => {
    const [mobileNav, setMobileNav] = useState(false);

    return (
        <nav className={`flex justify-between relative z-40 py-4 px-8 bg-${props.bgColor || 'cream'} `}>
            <Link to='/'>
                <img src={logo} alt='LOGO' className='w-30 h-10 object-cover' />
            </Link>

            <ul className='flex items-center space-x-16 tab-port:hidden'>
                <li className={styles['item']}><Link to='/about'>About</Link></li>
                <li className={styles['item']}><Link to='/'>Contact</Link></li>
                <li className={styles['item']}><a href='/#section-testimonial'> Testimonial</a></li>
                {isLoggedIn() ? <li className={styles['item']}><Link to='/profile'>Profile</Link></li> : <></>}
            </ul>

            <div className='space-x-8 flex items-center tab-port:hidden'>
                <Link to='/shop' className='flex items-center'><BagIcon className='mr-1' /> Shop</Link>
                {
                    isLoggedIn()
                        ? <Button className='py-1 px-3 rounded-md border-2 border-violet' onClick={() => logout(() => navigate('/login'))}>Logout</Button>
                        : <Button isLink={true} to='/login' className='py-1 px-3 rounded-md border-2 border-violet'>Login</Button>
                }
            </div>

            <div className='hidden tab-port:space-x-8 tab-port:flex tab-port:items-center'>
                <Link to='/profile'>
                    <UserIcon />
                </Link>

                <button onClick={() => setMobileNav(true)}>
                    <HamburgerIcon />
                </button>
            </div>

            {
                mobileNav
                    ? <div className='fixed h-full w-full left-0 top-0 bg-cream z-40 flex items-center justify-center'>
                        <button className='absolute top-0 right-5 text-6xl p-4' onClick={() => setMobileNav(false)}>&times;</button>

                        <ul className='space-y-6 text-2xl text-center'>
                            <li className='hover:text-violet'><Link to='/'>Home</Link></li>
                            <li className='hover:text-violet'><Link to='/about'>About</Link></li>
                            <li className='hover:text-violet'><Link to='/'>Contacts</Link></li>
                            <li className='hover:text-violet'><Link to='/#section-testimonial'>Testimonials</Link></li>
                            <li className='hover:text-violet'><Link to='/shop'>Shop</Link></li>
                        </ul>
                    </div>
                    : <></>
            }
        </nav>
    );
};

export default Nav;