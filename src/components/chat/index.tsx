import { usePubNubContext } from "@/context/PubNubContext";
import { ChannelList, ChatActionBar, EmptyChat } from "./atoms";
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
                            {!activeChannel && <EmptyChat />}
                        </ChatRoomWrapper>
                    </CurrentChatWindow>
                </ChatRoomStack>

            </ChatComponentInnerContainer>
        </ChatComponentContainer>
    );
};
