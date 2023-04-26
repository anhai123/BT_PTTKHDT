import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";
import MovieCarouselItem from "../MovieCarouselItem/MovieCarouselItem";
// import required modules
import { Pagination, Navigation } from "swiper";

export default function SwiftMovie(props) {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {props.filmrender.map((film) => {
          return (
            <SwiperSlide>
              <MovieCarouselItem film={film} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
