import React from "react";
// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "./style.scss";

// install Swiper modules
SwiperCore.use([Navigation]);
export default function Carousel() {
	return (
		<Swiper
			spaceBetween={100}
			slidesPerView={1}
			navigation
			onSwiper={(swiper) => console.log(swiper)}
			onSlideChange={() => console.log("slide change")}
		>
			<SwiperSlide>Slide 1</SwiperSlide>
			<SwiperSlide>Slide 2</SwiperSlide>
			<SwiperSlide>Slide 3</SwiperSlide>
			<SwiperSlide>Slide 4</SwiperSlide>
		</Swiper>
	);
}
