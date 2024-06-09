import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './index.css';

// import required modules
import { EffectCards } from 'swiper/modules';
import { Link } from 'react-router-dom';


function Hero() {
    return (
        <div className='h-screen'>
            <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
                <div className='flex w-full flex-col md:flex-row  justify-between items-center gap-12 py-52'>
                    <div className='md:w-2/3 space-y-8 h-full px-20'>
                        <h2 className='text-5xl font-bold leading-sung text-black'>Buy and Sell Your Books <span className='text-blue-700'>for the best prices</span></h2>
                        <p className='md:w-4/5 font-semibold'>Books are windows to the unknown, guiding us through realms of imagination and wisdom. With each page turned, we embark on journeys of discovery and enlightenment. Reading cultivates empathy, broadens horizons, and fuels the imagination.</p>
                        <button className='bg-blue-500 text-black text-2xl font-semibold border border-white px-10 py-2 hover:bg-blue-400 rounded-full'>
                            <Link  className="no-underline" to={"/all-books"} >Discover Book</Link>
                        </button>
                    </div>

                    <div>
                        <div className='banner px-16'>
                            <Swiper
                                effect={'cards'}
                                grabCursor={true}
                                modules={[EffectCards]}
                                className="mySwiper"
                            >
                                <SwiperSlide></SwiperSlide>
                                <SwiperSlide></SwiperSlide>
                                <SwiperSlide></SwiperSlide>
                                <SwiperSlide></SwiperSlide>
                                <SwiperSlide></SwiperSlide>
                                <SwiperSlide></SwiperSlide>
                            </Swiper>
                        </div>


                    </div>
                </div>
            </div>
        </div>



    )
}

export default Hero