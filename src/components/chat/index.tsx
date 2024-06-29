import {
    ChatComponentContainer,
    ChatComponentInnerContainer,
    ChatRoomStack,
    ChatRoomWrapper,
    CurrentChatWindow
} from "./styles";


export const ChatPageComponent = () => {
    return (
        <ChatComponentContainer>
            <ChatComponentInnerContainer>
                <h1>Chat</h1>
                <ChatRoomStack>
                    <div>
                        <p>Chat list</p>
                    </div>
                    <CurrentChatWindow>
                        <ChatRoomWrapper>
                            <div>
                                <h1>Chat room</h1>
                            </div>
                        </ChatRoomWrapper>
                    </CurrentChatWindow>
                </ChatRoomStack>

            </ChatComponentInnerContainer>
        </ChatComponentContainer>
    );
};
