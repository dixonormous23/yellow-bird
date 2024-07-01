import { Message } from "@pubnub/chat";
import moment from "moment";
import { Avatar } from "@/components/common";
import { DEFAULT_AVATAR } from "@/constants";
import { MessageAvatarWrapper, MessageBodyWrapper, MessageDataWrapper, MessageItemActionsContainer, MessageItemWrapper } from "./styles";
import EmojiPicker from "emoji-picker-react";
import { useMemo } from "react";

interface ChatMessageProps {
    message: Message;
    stack: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, stack }) => {
    const text = useMemo(() => {
        if (message?.actions?.edited) {
            console.log(message.actions.edited)
        }
    }, [message]);
    
    return (
        <MessageItemWrapper>
            <MessageAvatarWrapper $stack={stack}>
                {!stack && <Avatar src={message.meta?.avatar ?? DEFAULT_AVATAR} />}
            </MessageAvatarWrapper>
            <MessageItemActionsContainer>
                <button>:)</button>
            </MessageItemActionsContainer>
            <MessageBodyWrapper>
                {!stack && (
                    <MessageDataWrapper>
                        <strong>{message?.meta?.username ?? "User"}</strong>
                        <small>{moment(message.meta?.timestamp).format('hh:mm:ss a')}</small>
                    </MessageDataWrapper>
                )}
                <span dangerouslySetInnerHTML={{ __html: message.text }} />
            </MessageBodyWrapper>
        </MessageItemWrapper>
    );
};