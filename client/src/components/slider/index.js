import React, { useState, useEffect } from 'react';

import Slide from './slide';
import Control from './control';

import ArrowLeft from '../../assets/arrowleft.svg';
import ArrowRight from '../../assets/arrowright.svg';

const Slider = props => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const MAX_SLIDES = props.children?.length;

    useEffect(() => {
        if (!props.autoPlay) return;

        const timer = setTimeout(() => {
            setCurrentSlide((currentSlide + 1) % MAX_SLIDES);
        }, 3000);

        return () => clearTimeout(timer);
    });

    return (
        <div className='relative overflow-x-hidden' style={{ minHeight: props.minHeight || '40vh' }}>
            {
                props.children?.map((child, slideNumber) => (
                    <Slide key={slideNumber} translate={100 * (slideNumber - currentSlide)}>
                        {child}
                    </Slide>
                ))
                ||
                <></>
            }

            {
                props.hideControls
                    ? <></>
                    : <>
                        <Control align='left' label={<ArrowLeft />} onClick={() => setCurrentSlide(currentSlide - 1 >= 0 ? currentSlide - 1 : MAX_SLIDES - 1)} />
                        <Control align='right' label={<ArrowRight />} onClick={() => setCurrentSlide((currentSlide + 1) % MAX_SLIDES)} />
                    </>
            }
        </div>
    );
};

export default Slider;