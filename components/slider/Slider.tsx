'use client';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

import Image from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import ArrowLeft from './ui/LeftArrow';
import ArrowRight from './ui/RightArrow';
import first from '../../public/assets/img/food_1.jpg';
import second from '../../public/assets/img/food_2.jpg';
import third from '../../public/assets/img/food_3.jpg';
import Button from '../button';

export default function Slider() {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{ nextEl: '.myNext', prevEl: '.myPrev' }}
        pagination={{
          clickable: true,
          el: '.myPag',
          modifierClass: 'myPag-',
        }}
        scrollbar={{ draggable: true }}
        className="max-w-[670px] rounded-[35px]"
      >
        <SwiperSlide>
          <Image src={first} className="mySlide" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={second} className="mySlide" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={third} className="mySlide" alt="" />
        </SwiperSlide>
        <div className="mt-10 flex w-full justify-center gap-5">
          <Button type="rounded" className="myPrev cursor-pointer p-2">
            <ArrowLeft />
          </Button>
          <div className="myPag flex items-center justify-around gap-[10px] "></div>
          <Button type="rounded" className="myNext cursor-pointer p-2">
            <ArrowRight />
          </Button>
        </div>
      </Swiper>
    </div>
  );
}
