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
    const { activeChannel, activeChannelMembers } = usePubNubContext();
    const [condenseList, setCondenseList] = useState<boolean>(false);

    return (
        <ChatComponentContainer>
            <ChatComponentInnerContainer>
                <ChatRoomStack>
                    <ChannelList
                        condensed={condenseList}
                        setCondensed={setCondenseList}
                    />
                    <CurrentChatWindow id="chat-window">
                        <ChatRoomWrapper>
                            <ChatActionBar
                                activeChannel={activeChannel}
                                activeChannelMembers={activeChannelMembers}
                                handleCloseChat={() => setCondenseList(false)}
                            />
                            {activeChannel ? <ChatWindow /> : <EmptyChat />}
                        </ChatRoomWrapper>
                        {activeChannel && <ChatInput />}
                    </CurrentChatWindow>
                </ChatRoomStack>
            </ChatComponentInnerContainer>
        </ChatComponentContainer>
    );
};
