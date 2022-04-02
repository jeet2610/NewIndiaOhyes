import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import axios, { URL } from '../services/api';

import Layout from '../components/layout';
import Footer from '../components/layout/footer';
import Heading from '../components/heading';
import Category from '../components/category';
import Loader from '../components/loader';
import Service from '../components/service';
import Slider from '../components/slider';
import Testimonial from '../components/testimonial';
import Offer from '../components/offer';
import MakeMoney from '../components/makeMoney';

import Omicon from '../images/omicon.png';
import EvntIcon from '../images/eventicon.png';
import TourIcon from '../images/touricon.png';

const IndexPage = () => {
	// State variables
	const [categories, setCategories] = useState();
	const [services, setServices] = useState();
	const [offers, setOffers] = useState();
	const [testimonials, setTestimonials] = useState();

	// Fetching data from API
	useEffect(() => {
		axios
			.get('/categories')
			.then(response => {
				setCategories(response.data.data.categories);
			})
			.catch(err => {
				setCategories([]);
				console.log(err.response);
			});


			axios
			.get('/testimonials')
			.then(response => {
				setTestimonials(response.data.data.testimonials);
			})
			.catch(err => {
				setTestimonials([]);
				console.log(err.response);
			});	

		axios
			.get('/services')
			.then(response => {
				const data = response.data.data.services;
				setServices(data);
				setOffers(data.filter(srv => srv.offer));
			})
			.catch(err => {
				setServices([]);
				console.log(err.response);
			});
	}, []);

	// JSX to be returned
	return (
		<>
			<Helmet>
				<title>Indiaohyes &mdash; Home</title>
			</Helmet>

			<Layout>
				<header className='bg-cream min-h-screen px-20 grid grid-cols-2 items-center -mt-24 tab-port:mt-0 tab-port:grid-cols-none'>
					<div className='tab-port:text-center tab-port:mt-16'>
						<h1 className='text-5xl leading-relaxed font-semibold'>
							<span className='block'>From India</span>
							<span className='block'>To India</span>
							<span className='block'>By India</span>
						</h1>

						<p className='mt-6 mb-12'>An E-supermarket for Indian Needs</p>

						<Link to='/' className='border-2 border-violet bg-violet text-white py-3 px-6 rounded-tl-full rounded-bl-full'>Let's start</Link>
						<Link to='/quick' className='border-2 border-violet bg-white py-3 px-6 rounded-tr-full rounded-br-full'>Quick contact</Link>
					</div>

					<div className='h-full mt-16 tab-port:h-96 tab-port:mb-16'>
						<Slider minHeight='100%' hideControls={true} autoPlay={true}>
							<img src={Omicon} alt='OM' className='h-full w-full object-contain' />
							<img src={EvntIcon} alt='event' className='h-full w-full object-contain' />
							<img src={TourIcon} alt='tour' className='h-full w-full object-contain' />
						</Slider>
					</div>
				</header>

				<main>
					{
				testimonials?.length 
					?<section id='section-testimonial'>
						<Slider >
							{
						            
										testimonials.map((t, i) => (
										<Testimonial key={i} 
										review={t.comment} 
										writer={`- ${t.author}`}
										writerRole='Customer'
										/>
										))
										
                                }
						</Slider>
					</section>
					: <> </>
					
				}
          

					{
						offers?.length
							? <section className='border-t-2 border-gray-300'>
								<Slider minHeight='60vh'>
									{
										offers.map((srv, i) => (
											<Offer
												summary={srv.offer.description}
												description={srv.description}
												image={srv.image}
												link={srv.slug}
												key={i}
											/>
										))
									}
								</Slider>
							</section>
							: <> </>
					}

					<section className='px-16 py-24 phone:px-12'>
						<Heading className='mb-16'>services</Heading>

						<div className='grid gap-10' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))' }}>
							{
								categories
									? categories.length
										? categories.map((cat, i) => <Category
											key={i}
											title={cat.title}
											image={`${URL}/images/${cat.image}`}
											href={`/#section-categories-${i}`}
										/>)
										: <h2>No data found</h2>
									: <div className='flex justify-center col-span-full'>
										<Loader />
									</div>
							}
						</div>
					</section>


					{
						// Render all sections according to the data fetched
						categories?.length && services?.length
							? <section className='bg-gray-100 pt-5 rounded-xl'>

								<ul className='flex sticky top-0 justify-between bg-violet text-gray-100 capitalize shadow-lg px-6  py-4 tab-port:hidden'>
									{categories?.map((cat, i) => <li key={i}><a href={`/#section-categories-${i}`}>{cat.title}</a></li>)}
								</ul>


								<div className='px-5 space-y-5'>
									{
										categories.map((cat, i) =>
											<section id={`section-categories-${i}`} className='flex items-center bg-white rounded-xl p-8 tab-port:flex-col' key={i}>
												<div className='w-[20rem] justify-self-start mr-12 tab-port:w-full tab-port:mr-0 tab-port:mb-10'>
													<Heading align='left' className='leading-tight tab-port:text-center'>{cat.title} services</Heading>
													<p className='mt-8 tab-port:text-center'>{cat.description}</p>
												</div>
												<div className='grid grid-flow-col gap-x-12 overflow-x-auto pt-28 pb-4 tab-port:w-full' style={{ gridAutoColumns: '18rem' }}>
													{services.filter(cur => cur.category.title === cat.title).map((srv, i) => <Service data={srv} key={i} />)}
												</div>
											</section>
										)
									}
								</div>

							</section>
							: <></>
					}

					<MakeMoney />
				</main>

				<Footer />
			</Layout>
		</>
	);
};

export default IndexPage;