import { Message } from "@pubnub/chat";
import { MessageAvatarWrapper, MessageBodyWrapper, MessageDataWrapper, MessageItemWrapper } from "./styles";
import { Avatar } from "@/components/common";
import { DEFAULT_AVATAR } from "@/constants";
import moment from "moment";

interface ChatMessageProps {
    message: Message;
    stack: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, stack }) => {
    return (
        <MessageItemWrapper>
            <MessageAvatarWrapper $stack={stack}>
                {!stack && <Avatar src={message.meta?.avatar ?? DEFAULT_AVATAR} />}
            </MessageAvatarWrapper>
            <MessageBodyWrapper>
                {!stack && (
                    <MessageDataWrapper>
                        <strong>{message?.meta?.username ?? "User"}</strong>
                        <small>{moment(message.meta?.timestamp).format('hh:mm:ss a')}</small>
                    </MessageDataWrapper>
                )}
                <span dangerouslySetInnerHTML={{ __html: message.content.text }} />
            </MessageBodyWrapper>
        </MessageItemWrapper>
    );
};