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
	MobileMenu,
	MobileItem,
	MobileLink,
} from "./NavbarStyle";
import { GoThreeBars, GoX } from "react-icons/go";
import WhiterLogo from "../../images/BigLogo.svg";
import BlackLogo from "../../images/blackLogo.svg";
import Fade from "@material-ui/core/Grow";
import { REM } from "../../style/helper";

export default function Navbar({
	primary = "black",
	isStatic = false,
	isFixed = false,
}) {
	const [showMenu, setShowMenu] = React.useState(false);
	const logoSrc = primary === "white" ? BlackLogo : WhiterLogo;
	return (
		<NavbarWrapper primary={primary} isStatic={isStatic} isFixed={isFixed}>
			<NavbarContainer isStatic={isStatic}>
				<NavbarLogo>
					<NavbarLink to="/home">
						<Logo src={logoSrc} alt="BigLogo" />
					</NavbarLink>
				</NavbarLogo>
				{!isStatic && (
					<NavbarHamburger
						primary={primary}
						onClick={() => setShowMenu(!showMenu)}
					>
						{showMenu ? (
							<GoX style={{ fontSize: REM(36) }} />
						) : (
							<GoThreeBars style={{ fontSize: REM(36) }} />
						)}
					</NavbarHamburger>
				)}
				<NavbarList isStatic={isStatic}>
					<NavbarItem>
						<NavbarLink primary={primary} to="/streetView">
							Start Exploring
						</NavbarLink>
					</NavbarItem>
					<NavbarItem>
						<NavbarLink size="circle" primary={primary} to="/signUp">
							Sign In
						</NavbarLink>
					</NavbarItem>
				</NavbarList>
			</NavbarContainer>
			<Fade in={showMenu}>
				<MobileMenu primary={primary}>
					<MobileItem>
						<MobileLink primary={primary} to="/streetView">
							Start Exploring
						</MobileLink>
					</MobileItem>
					<MobileItem>
						<MobileLink primary={primary} to="/streetView">
							Sign In
						</MobileLink>
					</MobileItem>
				</MobileMenu>
			</Fade>
		</NavbarWrapper>
	);
}
