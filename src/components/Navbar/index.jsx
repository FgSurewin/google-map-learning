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

export default function Navbar() {
	return (
		<NavbarWrapper>
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
						<NavbarLink to="/streetView">one</NavbarLink>
					</NavbarItem>
					<NavbarItem>
						<NavbarLink to="/streetView">two</NavbarLink>
					</NavbarItem>
				</NavbarList>
			</NavbarContainer>
		</NavbarWrapper>
	);
}
