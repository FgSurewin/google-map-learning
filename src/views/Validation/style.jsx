import styled, { css } from "styled-components/macro";
import Background from "../../images/Group1.png";
import Button from "@material-ui/core/Button";
import { REM } from "../../style/helper";

export const ValidationWrapper = styled.section`
	background: url(${Background}) no-repeat;
	height: 800px;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

export const ValidationButtonGroup = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ValidationButton = styled(Button)`
	background-color: ${(props) =>
		props.btn ? props.btn : props.theme.primaryColor} !important;
	color: white !important;
	padding: ${REM(5)} ${REM(20)} !important;
	font-weight: 500 !important;
	font-size: ${REM(18)} !important;
	${(props) =>
		props.ml &&
		css`
			margin-left: ${props.ml}px !important;
		`}
`;

export const ValidationGroup = styled.div`
	margin-bottom: 10px;
	display: flex;
	justify-content: start;
	align-items: center;
	width: 270px;
`;
