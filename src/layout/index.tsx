import Head from "next/head";
import { ProviderProps } from "../../@types";
import { AppLayoutContainer } from "./styles";

export interface AppMetadataProps extends ProviderProps {
    title?: string;
    description?: string;
}

const DEFAULT_TITLE = "Canary Chat";
const DEFAULT_DESCRIPTION = "Cool little bird, cool little app. Chat with anyone around the world in real-time!";

export const AppLayout: React.FC<AppMetadataProps> = ({
    title = DEFAULT_TITLE,
    description = DEFAULT_DESCRIPTION,
    children
}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>   
            <AppLayoutContainer>
                {children}
            </AppLayoutContainer>
        </>
    );
};
