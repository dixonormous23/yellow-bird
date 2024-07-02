import { useMemo, useRef, useState } from "react";
import { Message, User } from "@pubnub/chat";
import moment from "moment";
import { Avatar } from "@/components/common";
import { CHANNEL_BOT_DATA, DEFAULT_AVATAR } from "@/constants";
import {
    MessageAvatarWrapper,
    MessageBodyWrapper,
    MessageDataWrapper,
    MessageItemActionsContainer,
    MessageItemWrapper,
    ReactionButton,
    ReactionWrapper
} from "./styles";

interface ChatMessageProps {
    message: Message;
    stack: boolean;
    activeUser?: User;
    toggleReaction: (message: Message, code: string) => void;
    handleEditMessage: (message: Message, newText: string) => void;
};

interface IReaction {
    emoji: string;
    code: string;
}

const reactionEmojis: IReaction[] = [
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

export const ChatMessage: React.FC<ChatMessageProps> = ({
    activeUser,
    message,
    stack,
    toggleReaction,
    handleEditMessage
}) => {
    const [editing, setEditing] = useState<boolean>(false);
    const textRef = useRef<HTMLDivElement | null>(null);

    const reactions = useMemo(() => {
        return Object.entries(message?.reactions).filter(([_, value]) => value.length);
    }, [message])

    const onClick = (reaction: IReaction) => {
        toggleReaction(message, reaction.code)
    };

    const handleStartEditing = () => {
        setEditing(!editing);
        setTimeout(() => textRef.current?.focus(), );
    };

    const onEditTextSubmitted = () => {
        // opting for innerHTML vs innerText to support line breaks
        if (!textRef.current?.innerHTML) return;
    
        if (message.text === textRef.current.innerHTML) return setEditing(false);
        handleEditMessage(message, textRef.current?.innerHTML);
        setEditing(false);
    };

    // dynamically set element to div while in edit mode to support focus
    const TextElement = editing ? 'div' : 'span';

    return (
        <MessageItemWrapper>
            <MessageAvatarWrapper $stack={stack}>
                {!stack && <Avatar src={message.meta?.avatar ?? DEFAULT_AVATAR} />}
            </MessageAvatarWrapper>
            <MessageItemActionsContainer>
                {reactionEmojis.map((reaction) => (
                    <ReactionButton key={reaction.code} onClick={() => onClick(reaction)}>
                        {reaction.emoji}
                    </ReactionButton>
                ))}
                {message.userId === activeUser?.id && message?.meta?.userId !== CHANNEL_BOT_DATA.userId && (
                    <>
                        {'|'}
                        <ReactionButton onClick={handleStartEditing}>{editing ? 'Close' : 'Edit'}</ReactionButton>
                    </>
                )}
            </MessageItemActionsContainer>
            <MessageBodyWrapper>
                {!stack && (
                    <MessageDataWrapper>
                        <strong>{message?.meta?.username ?? "User"}</strong>
                        <small>{moment(message.meta?.timestamp).format('h:mm a')}</small>
                    </MessageDataWrapper>
                )}
                <TextElement
                    ref={textRef}
                    contentEditable={editing}
                    dangerouslySetInnerHTML={{ __html: message.text }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();

                            if (!e.shiftKey) {
                                onEditTextSubmitted();
                            }
                        };
                    }}
                />
                {reactions?.length ? (
                    <ReactionWrapper>
                        {reactions.map(([emoji]) => <span key={emoji}>{emoji}</span>)}
                    </ReactionWrapper>
                ) : null}
            </MessageBodyWrapper>
        </MessageItemWrapper>
    );
};
