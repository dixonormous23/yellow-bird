import { usePubNubContext } from "@/context/PubNubContext";
import { ChannelList, ChatActionBar, ChatInput, ChatWindow, EmptyChat } from "./atoms";
import {
    ChatComponentContainer,
    ChatComponentInnerContainer,
    ChatRoomStack,
    ChatRoomWrapper,
    CurrentChatWindow
} from "./styles";


export const ChatPageComponent = () => {
    const { activeChannel } = usePubNubContext();

    return (
        <ChatComponentContainer>
            <ChatComponentInnerContainer>
                <h1>Chat</h1>
                <ChatRoomStack>
                    <ChannelList />
                    <CurrentChatWindow>
                        <ChatRoomWrapper>
                            <ChatActionBar />
                            {activeChannel ? <ChatWindow /> : <EmptyChat />}
                            {activeChannel && <ChatInput />}
                        </ChatRoomWrapper>
                    </CurrentChatWindow>
                </ChatRoomStack>

            </ChatComponentInnerContainer>
        </ChatComponentContainer>
    );
};
