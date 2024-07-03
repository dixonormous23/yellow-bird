import { css } from 'styled-components';

export type MobileBreakpoint = 'mobile' | 'tablet';

// Small helper util to reduce the need to rewrite similar media queries
// e.g: ${breakpoint('mobile')} { display: none };
export const breakpoint = (type: MobileBreakpoint) => {
    return css`@media screen and (max-width: ${(props) => props.theme.breakpoints[type]})`
};
