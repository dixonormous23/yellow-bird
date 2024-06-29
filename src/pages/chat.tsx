import { NextPage } from "next";
import { ChatPageComponent } from "@/components/chat";
import { AppLayout } from "@/layout";

const ChatPage: NextPage = () => {
    return (
        <AppLayout>
            <ChatPageComponent />
        </AppLayout>
    );
};

export default ChatPage;
