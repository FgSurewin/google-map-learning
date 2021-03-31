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
import BigLogo from "../../images/BigLogo.svg";

export default function Navbar({ primary = "white" }) {
	return (
		<NavbarWrapper primary={primary}>
			<NavbarContainer>
				<NavbarLogo>
					<NavbarLink to="/home">
						<Logo src={BigLogo} alt="BigLogo" />
					</NavbarLink>
				</NavbarLogo>
				<NavbarHamburger>
					<GoThreeBars />
				</NavbarHamburger>
				<NavbarList>
					<NavbarItem>
						<NavbarLink to="/streetView">Start Exploring</NavbarLink>
					</NavbarItem>
					<NavbarItem circle>
						<NavbarLink to="/streetView">Sign In</NavbarLink>
					</NavbarItem>
				</NavbarList>
			</NavbarContainer>
		</NavbarWrapper>
	);
}
