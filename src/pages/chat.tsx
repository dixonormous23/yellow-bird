import { NextPage } from "next";
import { ChatPageComponent } from "@/components/chat";
import { AppLayout } from "@/layout";
import { useAuthContext } from "@/context/AuthContext";
import { PubNubContextProvider } from "@/context/PubNubContext";
import { Loader } from "@/components/common/Loader";
import { useRouter } from "next/router";

const ChatPage: NextPage = () => {
    const router = useRouter();
    const { initialized, user } = useAuthContext();

    if (!initialized) {
        return <Loader />;
    };

    if (initialized && !user) {
        router.push('/');
    };

    return (
        <PubNubContextProvider user={user}>
            <AppLayout>
                <ChatPageComponent />
            </AppLayout>
        </PubNubContextProvider>
    );
};

export default ChatPage;
