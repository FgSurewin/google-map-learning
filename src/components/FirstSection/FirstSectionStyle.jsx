import styled, { css } from "styled-components/macro";
import { lessThan, MEDIUM, REM, SMALL } from "../../style/helper";

export const FirstSectionWrapper = styled.section`
	height: ${REM(810)};
	background-color: rgba(225, 207, 185, 0.15);
	display: flex;
`;

export const FirstSectionIllustration = styled.img`
	margin-left: ${REM(110)};
	${lessThan(
		MEDIUM,
		css`
			margin-left: ${REM(0)};
			width: ${REM(400)};
		`
	)}
	${lessThan(
		SMALL,
		css`
			width: ${REM(340)};
			margin-left: ${REM(0)};
		`
	)}
`;

export const FirstSectionBox = styled.div`
	position: relative;
	${lessThan(
		SMALL,
		css`
			position: inherit;
		`
	)}
`;

export const FirstSectionContent = styled.div`
	position: absolute;
	top: ${REM(130)};
	left: ${REM(110)};
	${lessThan(
		MEDIUM,
		css`
			top: ${REM(115)};
			left: ${REM(90)};
		`
	)}
	${lessThan(
		SMALL,
		css`
			position: inherit;
			top: ${REM(0)};
			left: ${REM(0)};
		`
	)}
`;

export const FirstSectionTitle = styled.h2`
	font-size: ${REM(36)};
	font-weight: bold;
	color: ${(props) => props.theme.primaryFont};
	margin-bottom: ${REM(10)};
	${lessThan(
		MEDIUM,
		css`
			font-size: ${REM(28)};
		`
	)}
	${lessThan(
		SMALL,
		css`
			text-align: center;
		`
	)}
`;

export const FirstSectionText = styled.p`
	width: ${REM(455)};
	font-weight: 500;
	font-size: ${REM(18)};
	line-height: ${REM(40)};
	color: ${(props) => props.theme.primaryFont};
	${lessThan(
		MEDIUM,
		css`
			font-size: ${REM(14)};
			width: ${REM(380)};
		`
	)}
	${lessThan(
		SMALL,
		css`
			width: ${REM(320)};
			font-size: ${REM(14)};
		`
	)}
`;

export const DotBackground = styled.img`
	${lessThan(
		MEDIUM,
		css`
			width: ${REM(510)};
		`
	)}
	${lessThan(
		SMALL,
		css`
			display: none;
		`
	)}
`;
