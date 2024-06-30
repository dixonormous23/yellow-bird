export type MainTheme = typeof theme;

export const MOBILE_BREAKPOINT = 480;
export const TABLET_BREAKPOINT = 850;

export const theme = {
    colors: {
        primary: "#ffcc04",
        secondary: "#2F4858",
        border: "rgba(0,0,0,0.2)"
    },
    fontFamily: {
        primary: "Poppins",
        secondary: "Barlow"
    },
    breakpoints: {
        mobile: `${MOBILE_BREAKPOINT}px`,
        tablet: `${TABLET_BREAKPOINT}px`,
    },
    widths: {
        maxContent: "1350px"
    }
};
