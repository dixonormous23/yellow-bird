import { NextPage } from "next";
import { ChatPageComponent } from "@/components/chat";
import { AppLayout } from "@/layout";
import { useAuthContext } from "@/context/AuthContext";
import { PubNubContextProvider } from "@/context/PubNubContext";
import { Loader } from "@/components/common/Loader";
import { Navbar } from "@/layout/Navbar";
import { getServerSideAuth } from "@/utils/getServerSideAuth";
import { RouteAuth } from "../../@types";

const ChatPage: NextPage = () => {
    const { initialized, user } = useAuthContext();

    if (!initialized) {
        return <Loader />;
    };

    return (
        <PubNubContextProvider user={user}>
            <Navbar />
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
