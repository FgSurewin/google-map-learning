import styled, { createGlobalStyle, css } from "styled-components";
import { lessThan, MEDIUM } from "./helper";

export const GlobalStyle = createGlobalStyle`
 *{
	 margin: 0;
	 padding: 0;
	 box-sizing: border-box;
	 font-family: 'Poppins', sans-serif;
 }
 ul{
	 list-style:none;
 }
 a{
	 text-decoration: none;
 }
`;

export const Container = styled.div`
	max-width: 1256px;
	display: flex;
	align-items: center;
	${lessThan(
		MEDIUM,
		css`
			flex-direction: column;
		`
	)}
`;
