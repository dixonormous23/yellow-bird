import { useState } from "react";
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

    const [condenseChannels, setCondenseChannels] = useState<boolean>(false);

    return (
        <ChatComponentContainer>
            <ChatComponentInnerContainer>
                <h1>Chat</h1>
                <ChatRoomStack>
                    <ChannelList />
                    <CurrentChatWindow id="chat-window">
                        <ChatRoomWrapper>
                            <ChatActionBar activeChannel={activeChannel} />
                            {activeChannel ? <ChatWindow /> : <EmptyChat />}
                        </ChatRoomWrapper>
                        {activeChannel && <ChatInput />}
                    </CurrentChatWindow>
                </ChatRoomStack>

            </ChatComponentInnerContainer>
        </ChatComponentContainer>
    );
};
