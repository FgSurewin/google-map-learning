import styled from "styled-components/macro";
import Background from "../../images/Group1.png";
import Button from "@material-ui/core/Button";
import { REM } from "../../style/helper";

export const ExplorationWrapper = styled.section`
	background: url(${Background}) no-repeat;
	height: 800px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ExplorationContainer = styled.div`
	width: 1236px;
	margin-left: 30px;
	display: flex;
	justify-content: space-between;
`;

export const NextButton = styled(Button)`
	background-color: ${(props) => props.theme.primaryColor} !important;
	color: white !important;
	padding: ${REM(5)} ${REM(100)} !important;
	font-weight: 500 !important;
	font-size: ${REM(18)} !important;
`;
