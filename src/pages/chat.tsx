import { NextPage } from "next";
import { ChatPageComponent } from "@/components/chat";
import { AppLayout } from "@/layout";
import { useAuthContext } from "@/context/AuthContext";
import { PubNubContextProvider } from "@/context/PubNubContext";

const ChatPage: NextPage = () => {
    const { user } = useAuthContext();
    return (
        <PubNubContextProvider user={user}>
            <AppLayout>
                <ChatPageComponent />
            </AppLayout>
        </PubNubContextProvider>
    );
};

export default ChatPage;
