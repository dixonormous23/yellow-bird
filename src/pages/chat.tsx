import { NextPage } from "next";
import { ChatPageComponent } from "@/components/chat";
import { AppLayout } from "@/layout";
import { useAuthContext } from "@/context/AuthContext";
import { PubNubContextProvider } from "@/context/PubNubContext";
import { Loader } from "@/components/common/Loader";
import { getServerSideAuth } from "@/utils/getServerSideAuth";
import { RouteAuth } from "../../@types";

const ChatPage: NextPage = () => {
    const { initialized, user } = useAuthContext();

    if (!initialized) {
        // Presuming we've passed the getServerSideAuth check we still should wait for user data to be set
        return <Loader />;
    };

    return (
        <PubNubContextProvider user={user}>
            <AppLayout>
                <ChatPageComponent />
            </AppLayout>
        </PubNubContextProvider>
    );
};

export const getServerSideProps = async (ctx: any) => {
    return await getServerSideAuth(ctx, RouteAuth.LOGGED_IN);
}

export default ChatPage;
