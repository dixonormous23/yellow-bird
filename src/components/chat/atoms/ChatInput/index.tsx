import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";

import { usePubNubContext } from "@/context/PubNubContext";
import { useAuthContext } from "@/context/AuthContext";
import { Icon } from "@/components/common";
import { ChatInputContainer, InputActionButton, EmojiPickerWrapper, InputElementsWrapper, InputInnerContainer, StyledChatInput, SubmitButton, InputActionsContainer, UploadFileInput } from "./styles";
import { TypingIndicator } from "./TypingIndicator";
import EmojiPicker from "emoji-picker-react";

export const ChatInput: React.FC = () => {
    const { user } = useAuthContext();
    const { activeChannel } = usePubNubContext();
    const [emojisOpen, setEmojisOpen] = useState<boolean>(false);

    const inputRef = useRef<HTMLSpanElement | null>(null);
    const emojiRef = useRef<HTMLDivElement | null>(null);

    const handleSubmitMessage = useCallback(async () => {
        const message = inputRef?.current;

        if (!activeChannel || !message?.innerText.trim().length) return;

        const formattedMessage = message.innerText.replaceAll('\n', '<br />');

        await activeChannel.sendText(formattedMessage, {
            storeInHistory: true,
            meta: {
                avatar: user?.avatar,
                username: user?.username,
                userId: user?.uid,
                timestamp: moment().valueOf(),
            }
        });

        message.innerText = '';

    }, [activeChannel, user])

    const listenForSubmit = useCallback((e: KeyboardEvent) => {
        if (e.code === "Enter" && !e.shiftKey && inputRef.current) {
            handleSubmitMessage();
        };

    }, [handleSubmitMessage]);

    const listenForTypingEvent = useCallback((e: KeyboardEvent) => {
        if (e.code === "Enter" || e.key === "Shift") return;
        activeChannel?.startTyping();
    }, [activeChannel]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', listenForSubmit);
            window.addEventListener('keyup', listenForTypingEvent);

            return () => {
                window.removeEventListener('keydown', listenForSubmit);
                window.removeEventListener('keyup', listenForTypingEvent);

            }
        }
    }, [listenForSubmit, listenForTypingEvent]);

    const handleAppendEmoji = (emoji: string) => {
        const inputText = inputRef.current;

        if (!inputText) return;

        if (inputText.innerText.length) {
            inputText.innerText = inputText.innerText + emoji;
        } else {
            inputText.innerText = emoji;
        }
    };

    return (
        <ChatInputContainer>
            <TypingIndicator />
            <InputInnerContainer $channelName={activeChannel?.name ?? "channel"}>
                <InputActionButton onClick={() => setEmojisOpen(!emojisOpen)}>
                    <Icon variant="emoji" size={20} />
                    <EmojiPickerWrapper $open={emojisOpen} ref={emojiRef}>
                        <EmojiPicker
                            lazyLoadEmojis
                            onEmojiClick={({ emoji }) => handleAppendEmoji(emoji)}
                        />
                    </EmojiPickerWrapper>
                </InputActionButton>
                <StyledChatInput
                    contentEditable
                    role="textbox"
                    ref={inputRef}
                    $currentValue={inputRef.current?.innerText}
                    onKeyDown={(e) => {
                        if (e.code === 'Enter' && !e.shiftKey) e.preventDefault();
                    }}
                />
                <SubmitButton onClick={handleSubmitMessage}>
                    <Icon variant="sendMessage" size={20} />
                </SubmitButton>
            </InputInnerContainer>
        </ChatInputContainer>
    );
};
