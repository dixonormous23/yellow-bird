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
    const { activeChannel, activeChannelMembers } = usePubNubContext();
    return (
        <ChatComponentContainer>
            <ChatComponentInnerContainer>
                <ChatRoomStack>
                    <ChannelList />
                    <CurrentChatWindow id="chat-window">
                        <ChatRoomWrapper>
                            <ChatActionBar activeChannel={activeChannel} activeChannelMembers={activeChannelMembers} />
                            {activeChannel ? <ChatWindow /> : <EmptyChat />}
                        </ChatRoomWrapper>
                        {activeChannel && <ChatInput />}
                    </CurrentChatWindow>
                </ChatRoomStack>
                
            </ChatComponentInnerContainer>
        </ChatComponentContainer>
    );
};
