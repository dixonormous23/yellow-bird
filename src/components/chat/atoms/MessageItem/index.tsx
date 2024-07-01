import { Message } from "@pubnub/chat";
import moment from "moment";
import { Avatar } from "@/components/common";
import { DEFAULT_AVATAR } from "@/constants";
import { MessageAvatarWrapper, MessageBodyWrapper, MessageDataWrapper, MessageItemActionsContainer, MessageItemWrapper, ReactionButton, ReactionWrapper } from "./styles";
import EmojiPicker from "emoji-picker-react";
import { useCallback, useEffect, useMemo, useState } from "react";

interface ChatMessageProps {
    message: Message;
    stack: boolean;
};

const reactionEmojis = [
    {
        emoji: "👍",
        code: "\u{1f44d}"
    },
    {
        emoji: "👀",
        code: "\u{1f440}"
    },
    {
        emoji: "😎",
        code: "\u{1f60e}"
    },
    {
        emoji: "😡",
        code: "\u{1f621}"
    },
    {
        emoji: "🚀",
        code: "\u{1f680}"
    }
];

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, stack }) => {
    const [messageData, setMessageData] = useState<Message>(message);

    useEffect(() => {
        message.streamUpdates((updates) => {
            console.log(updates);
            setMessageData(updates)
        });
    }, [message]);

    const reactions = useMemo(() => {
        return Object.entries(messageData?.reactions).filter(([_, value]) => value.length);
    }, [messageData])

    const onClick = useCallback((code: string) => {
        try {
            messageData.toggleReaction(code).catch();
        } catch (error) {
            console.log(error);
        }
    }, [messageData])

    return (
        <MessageItemWrapper>
            <MessageAvatarWrapper $stack={stack}>
                {!stack && <Avatar src={message.meta?.avatar ?? DEFAULT_AVATAR} />}
            </MessageAvatarWrapper>
            <MessageItemActionsContainer>
                {reactionEmojis.map((reaction) => (
                    <ReactionButton key={reaction.code} onClick={() => onClick(reaction.code)}>
                        {reaction.emoji}
                    </ReactionButton>
                ))}
            </MessageItemActionsContainer>
            <MessageBodyWrapper>
                {!stack && (
                    <MessageDataWrapper>
                        <strong>{message?.meta?.username ?? "User"}</strong>
                        <small>{moment(message.meta?.timestamp).format('hh:mm:ss a')}</small>
                    </MessageDataWrapper>
                )}
                <span dangerouslySetInnerHTML={{ __html: message.text }} />
                {reactions?.length ? (
                    <ReactionWrapper>
                        {reactions.map(([emoji]) => <span key={emoji}>{emoji}</span>)}
                    </ReactionWrapper>
                ) : null}
            </MessageBodyWrapper>
        </MessageItemWrapper>
    );
};