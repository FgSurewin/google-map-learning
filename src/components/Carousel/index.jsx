import React from "react";
// import Swiper JS
import Swiper, { Navigation } from "swiper";
// import Swiper styles
import "swiper/swiper-bundle.css";
import "./style.scss";
import { CarouselData } from "./data";
import {
	CarouselIllustration,
	CarouselWrapper,
	NavigationButton,
	SlideContainer,
	SlideContent,
	SlideCover,
	SlideIcon,
	SlideName,
	SwiperCover,
	SwiperSlide,
} from "./CarouselStyle";

Swiper.use([Navigation]);

export default function Carousel() {
	React.useEffect(() => {
		const swiper = new Swiper(".swiper-container", {
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
		console.log(swiper);
	}, []);

	return (
		<CarouselWrapper>
			<CarouselIllustration src={CarouselData.curve} alt="curve" />
			<SwiperCover>
				<div className="swiper-container">
					<div className="swiper-wrapper">
						{CarouselData.slides.map((slide, index) => (
							<SwiperSlide className="swiper-slide" key={index}>
								<SlideContainer>
									<SlideIcon src={slide.icon} alt="icon" />
									<SlideCover>
										<SlideName className="test">{slide.name}</SlideName>
										<SlideContent>{slide.content}</SlideContent>
									</SlideCover>
								</SlideContainer>
							</SwiperSlide>
						))}
					</div>
					<NavigationButton right className="swiper-button-next" />
					<NavigationButton left className="swiper-button-prev" />
				</div>
			</SwiperCover>
		</CarouselWrapper>
	);
}
