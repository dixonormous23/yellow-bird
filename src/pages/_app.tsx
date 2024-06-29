import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import StyledComponentsRegistry from "../../lib/registry";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </StyledComponentsRegistry>
    );
}
