import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const hero = () => {
    return (
        <div className='flex flex-col md:flex-row md:gap-14 gap-8 justify-between items-center'>
            <div className='md:w-1/2 w-full mx-auto'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    centeredSlides={true}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
  
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 1,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                >
                    <div className="z-10">
                        <SwiperSlide><img src="/logo.png" className="w-full h-80 lg:h-[400px] sm:h-96" /></SwiperSlide>
                        <SwiperSlide><img src="/home-bg.jpg" className="w-full h-80 lg:h-[400px] sm:h-96" /></SwiperSlide>
                        <SwiperSlide><img src="/logo.png" className="w-full h-80 lg:h-[400px] sm:h-96" /></SwiperSlide>
                        <SwiperSlide><img src="/home-bg.jpg" className="w-full h-80 lg:h-[400px] sm:h-96" /></SwiperSlide>
                    </div>
                </Swiper>
            </div>

            <div className="md:w-1/2 w-full text-center">
                <h1 className='md:text-4xl md:leading-tight text-3xl font-bold'>JUICY TEXT JUICY TEXT JUICY</h1>
                <p className='py-5'>Discovering Skibidi Toilet is a good juicy experience. All mighty Skibidi! All mighty Skibidi! All mighty Skibidi! All mighty Skibidi! All mighty Skibidi! All mighty Skibidi! All mighty Skibidi!</p>
            </div>
        </div>
    )
}

export default hero