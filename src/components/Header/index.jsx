import React from "react";
import Navbar from "../Navbar";
import { HeaderWrapper, HeaderVideo, Shade } from "./HeaderStyle";
import Background from "../../videos/background.mp4";

export default function Header() {
	const [primary, setPrimary] = React.useState("black");
	React.useEffect(() => {
		window.onscroll = () => {
			if (document.documentElement.scrollTop > 80) setPrimary("white");
			else setPrimary("black");
		};
	}, [setPrimary]);

	return (
		<HeaderWrapper>
			<Navbar primary={primary} isFixed />
			<HeaderVideo muted loop autoPlay src={Background} />
			<Shade />
		</HeaderWrapper>
	);
}
