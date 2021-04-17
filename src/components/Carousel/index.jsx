import React from "react";
// import Swiper JS
import Swiper, { Navigation } from "swiper";
// import Swiper styles
import "swiper/swiper-bundle.css";
import "./style.scss";
import { CarouselData } from "./data";

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
		<div className="Carousel">
			<img src={CarouselData.curve} alt="curve" />
			<div className="swiper-cover">
				<div className="swiper-container">
					<div className="swiper-wrapper">
						{CarouselData.slides.map((slide, index) => (
							<div className="swiper-slide" key={index}>
								<div className="slide-container">
									<img src={slide.icon} alt="icon" className="slide-icon" />
									<div>
										<p className="slide-name">{slide.name}</p>
										<p className="slide-content">{slide.content}</p>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="swiper-button-next"></div>
					<div className="swiper-button-prev"></div>
				</div>
			</div>
		</div>
	);
}
