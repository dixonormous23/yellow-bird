import Head from "next/head";

interface MetadataProps {
    title?: string;
    description?: string;
}

const DEFAULT_TITLE = "Canary Chat";
const DEFAULT_DESCRIPTION = "Cool little bird, cool little app. Chat with anyone around the world in real-time!";

export const Metadata: React.FC<MetadataProps> = ({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};