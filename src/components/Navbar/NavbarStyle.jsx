import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { hide_for_desktop, hide_for_mobile } from "../../style/helper";

// const hide_for_mobile = (size, content) => `
// 	@media screen and (max-width: ${size}px) {
// 		${content}
// 	}
// `;

export const NavbarWrapper = styled.nav`
	background-color: black;
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
	${hide_for_mobile}
`;

export const NavbarItem = styled.li`
	margin: 0 5px;
`;

export const NavbarLink = styled(NavLink)`
	text-decoration: none;
	color: white;
`;
