import styled from "styled-components/macro";
import Background from "../../images/Group1.png";
import Button from "@material-ui/core/Button";
// import { REM } from "../../style/helper";

export const ValidationWrapper = styled.section`
	background: url(${Background}) no-repeat;
	height: 800px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ValidationButtonGroup = styled.div``;

export const ValidationButton = styled(Button)``;
