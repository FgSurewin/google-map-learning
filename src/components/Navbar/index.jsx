import React from "react";
import {
	NavbarHamburger,
	NavbarLogo,
	NavbarWrapper,
	NavbarList,
	NavbarItem,
	NavbarLink,
	Logo,
	NavbarContainer,
} from "./NavbarStyle";
import { GoThreeBars } from "react-icons/go";
import { navbarData } from "./data";

export default function Navbar({ primary = "white", isStatic = true }) {
	const logoSrc =
		primary === "white" ? navbarData.blackLogo : navbarData.whiteLogo;
	return (
		<NavbarWrapper primary={primary} isStatic={isStatic}>
			<NavbarContainer isStatic={isStatic}>
				<NavbarLogo>
					<NavbarLink to="/home">
						<Logo src={logoSrc} alt="BigLogo" />
					</NavbarLink>
				</NavbarLogo>
				{!isStatic && (
					<NavbarHamburger>
						<GoThreeBars />
					</NavbarHamburger>
				)}
				<NavbarList isStatic={isStatic}>
					{navbarData.nav.map((item, index) => (
						<NavbarItem
							{...item.style}
							key={index + item.text}
							primary={primary}
						>
							<NavbarLink primary={primary} to="/streetView">
								{item.text}
							</NavbarLink>
						</NavbarItem>
					))}
				</NavbarList>
			</NavbarContainer>
		</NavbarWrapper>
	);
}
