import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../components/layout';
import Footer from '../components/layout/footer';

import constructionImg from '../images/construction.png';

const Showcase = props => (
	<div className='py-12 text-center'>
		<span className='block text-5xl mb-2'>{props.count}</span>
		<span className='text-gray-700'>{props.message}</span>
	</div>
);

const AboutPageActual = () => (
	<>
		<Helmet>
			<title>Indiaohyes &mdash; About</title>
		</Helmet>
		<Layout>
			<header className='bg-cream min-h-screen flex flex-col justify-center text-center'>
				<h1 className='font-semibold text-4xl -mt-40'>Welcome to IndiaOhYes!</h1>
				<p className='p-9 text-lg'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
			</header>

			<main className='p-9 space-y-32'>
				<section className='min-h-screen bg-gray-100 grid gap-x-7' style={{ gridTemplateColumns: '1fr 1.4fr' }}>
					<div className='flex flex-col justify-center text-center p-6'>
						<h2 className='text-3xl mb-3'>Our Mission</h2>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type.</p>
					</div>

					<div className='grid grid-cols-2'>
						<div className='col-span-full bg-red-800'></div>
						<div className='bg-blue-300'></div>
						<div className='bg-gray-600'></div>
					</div>
				</section>

				<section className='border-t-2 border-b-2 border-gray-200 uppercase flex justify-around'>
					<Showcase count='100+' message='happy clients' />
					<Showcase count='10+' message='experiences' />
					<Showcase count='25+' message='states' />
					<Showcase count='32+' message='companies' />
				</section>

				<section className='min-h-screen'>
					<h2 className='text-3xl text-center mb-16'>Co-Founder's</h2>

					<div className='grid' style={{ gridTemplateColumns: '25% 1fr 25%', gridAutoRows: '20rem' }}>
						<div className='bg-gray-300'></div>
						<div className='bg-gray-200 col-span-2'></div>
						<div className='bg-gray-200 col-span-2'></div>
						<div className='bg-gray-300'></div>
					</div>
				</section>
			</main>

			<Footer />
		</Layout>
	</>
);

const AboutPage = () => (
	<div className='h-screen bg-cream flex flex-col items-center'>
		<img src={constructionImg} alt='WORK IN PROGRESS' className='h-[40rem]' />
		<h1 className='text-violet text-3xl'>Page under construction</h1>
	</div>
);

export default AboutPage;