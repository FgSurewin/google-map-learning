import styled, { css } from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { hide_for_desktop, hide_for_mobile, REM } from "../../style/helper";

const circleStyle = css`
	border: 1px solid white;
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	border-radius: 30px;
	padding: 2px 10px;
`;

export const NavbarWrapper = styled.nav`
	background-color: black;
	${(props) =>
		props.primary === "white" &&
		css`
			background: rgba(255, 255, 255, 0.9);
			box-shadow: 0px 4px 10px 6px rgba(0, 0, 0, 0.25);
			color: props.theme.primaryFont;
		`}
`;

export const NavbarContainer = styled.div`
	max-width: 1256px;
	margin: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 90px;
	padding: 0 30px;
`;

export const NavbarLogo = styled.div``;

export const Logo = styled.img``;

export const NavbarHamburger = styled.div`
	color: white;
	${hide_for_desktop}
`;

export const NavbarList = styled.ul`
	list-style: none;
	display: flex;
	justify-content: space-between;
	align-items: center;
	${hide_for_mobile}
`;

export const NavbarItem = styled.li`
	margin: 0 ${REM(38)};
	${(props) => props.circle && circleStyle}
`;

export const NavbarLink = styled(NavLink)`
	text-decoration: none;
	color: white;
	font-size: ${REM(18)};
`;
