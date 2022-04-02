import React, { useState, useEffect } from 'react';
import axios from '../../../services/api';

import Service from '../../../components/service';
import Loader from '../../../components/loader';

const ServiceListingPage = ({ params }) => {
    const [services, setServices] = useState();

    useEffect(() => {
        axios
            .get('/services')
            .then(res => setServices(res.data.data.services))
            .catch(err => {
                console.log(err);
                setServices([]);
            });
    }, []);

    return (
        <main className='pt-32 grid justify-center items-center space-y-40' style={{ gridAutoColumns: '20rem' }}>
            {
                services
                    ? services.length
                        ? services.map((srv, i) => <Service data={srv} key={i} />)
                        : <h1>No data found</h1>
                    : <Loader className='h-screen' />

            }
        </main>
    )
};

export default ServiceListingPage;