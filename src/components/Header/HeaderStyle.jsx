import styled from "styled-components/macro";

export const HeaderWrapper = styled.header`
	width: 100vw;
	height: 100vh;
	position: relative;
`;

export const HeaderVideo = styled.video`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const Shade = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 1;
	background: rgba(196, 196, 196, 0.29);
`;
