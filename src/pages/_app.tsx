import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import StyledComponentsRegistry from "../../lib/registry";
import { AuthContextProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <StyledComponentsRegistry>
            <AuthContextProvider>
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </AuthContextProvider>
        </StyledComponentsRegistry>
    );
}
