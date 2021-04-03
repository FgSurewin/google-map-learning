import React from "react";

export const useScroll = () => {
	const [primary, setPrimary] = React.useState("black");
	React.useEffect(() => {
		window.onscroll = () => {
			if (document.documentElement.scrollTop > 80) setPrimary("white");
			else setPrimary("black");
		};
	}, [setPrimary]);
	return primary;
};
