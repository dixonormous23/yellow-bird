export type MainTheme = typeof theme;

export const MOBILE_BREAKPOINT = 480;
export const TABLET_BREAKPOINT = 850;

// @TODO - Dark mode
export const theme = {
    colors: {
        primary: "#2F4858",
        secondary: "#ffcc04",
        primaryLight: "rgba(47, 72, 88, 0.05)",
        border: "rgba(0,0,0,0.2)",
        surface: "white",
        surfaceLight: "rgba(0, 0, 0, 0.02)",
        error: "indianred",
        success: "lawngreen"
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
