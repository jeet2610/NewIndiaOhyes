import React from 'react';
import { Helmet } from 'react-helmet';

import Heading from '../components/heading';
import Button from '../components/buttons/button';

import NotfoundSVG from '../assets/notfound.svg';

const NotFoundPage = () => (
	<>
		<Helmet>
			<title>Indiaohyes | Not Found</title>
		</Helmet>

		<main className='grid grid-cols-2 p-16 items-center bg-cream h-screen tab-port:grid-cols-none tab-port:p-6'>
			<div className='space-y-10 text-center tab-port:order-last tab-port:mt-16'>
				<Heading>OOPS...</Heading>
				<p>Looks like this page doesn't exist,<br />but don't let that stop you!</p>
				<Button isLink={true} to='/'>Go Home</Button>
			</div>

			<NotfoundSVG className='h-full w-full' />
		</main>
	</>
);

export default NotFoundPage;