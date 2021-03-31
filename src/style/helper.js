import { css } from "styled-components";

export const REM = (pixel) => `${pixel / 16}rem`;

const phone = 640;
const tablet = 1024;
const laptop = 1400;

export const SMALL = "small";
export const MEDIUM = "medium";
export const LARGE = "large";
export const X_LARGE = "xLarge";

export const BREAKPOINT_UP = {
	medium: REM(phone),
	large: REM(tablet),
	xLarge: REM(laptop),
};

export const BREAKPOINT_DOWN = {
	small: REM(phone - 1),
	medium: REM(tablet - 1),
	large: REM(laptop - 1),
};

export const greaterThan = (size, content) => css`
	@media screen and (min-width: ${BREAKPOINT_UP[size]}) {
		${content}
	}
`;

export const lessThan = (size, content) => css`
	@media screen and (max-width: ${BREAKPOINT_DOWN[size]}) {
		${content}
	}
`;

// When the screen size is less than or equal to small screen.
export const hide_for_mobile = lessThan(MEDIUM, "display: none");

// When the screen size is greater than or equal to small screen.
export const hide_for_desktop = greaterThan(LARGE, "display: none");
