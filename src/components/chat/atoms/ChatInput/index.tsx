import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";

import { usePubNubContext } from "@/context/PubNubContext";
import { useAuthContext } from "@/context/AuthContext";
import { Icon } from "@/components/common";
import { TypingIndicator } from "./TypingIndicator";
import { ChatInputContainer, InputActionButton, EmojiPickerWrapper, InputInnerContainer, StyledChatInput, SubmitButton } from "./styles";

/**
 * Background on <StyledChatInput /> (contentEditable div used for chat input)
 * 
 * Opted to go with this approach for a few reasons, mostly due to contentEditable allows for multiline input,
 * as well as a <div /> will dynamically size to its innerText / innerHTML
 */

export const ChatInput: React.FC = () => {
    const { user } = useAuthContext();
    const { activeChannel } = usePubNubContext();
    const [emojisOpen, setEmojisOpen] = useState<boolean>(false);

    const inputRef = useRef<HTMLDivElement | null>(null);
    const emojiRef = useRef<HTMLDivElement | null>(null);
    const emojiButtonRef = useRef<HTMLDivElement | null>(null);

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

    const handleToggleEmojis = useCallback((e: MouseEvent) => {
        if (emojisOpen && !emojiRef.current?.contains(e.target as Node) && !emojiButtonRef?.current?.contains(e.target as Node)) {
            setEmojisOpen(!emojisOpen);
        };
    }, [emojisOpen]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', listenForSubmit);
            window.addEventListener('keyup', listenForTypingEvent);
            window.addEventListener('click', handleToggleEmojis)

            return () => {
                window.removeEventListener('keydown', listenForSubmit);
                window.removeEventListener('keyup', listenForTypingEvent);
                window.removeEventListener('click', handleToggleEmojis);
            }
        }
    }, [handleToggleEmojis, listenForSubmit, listenForTypingEvent]);

    const handleAppendEmoji = (emoji: string) => {
        const inputText = inputRef.current;

        if (!inputText) return;

        // Check current innerText to determine if we're appending to or initializing message text
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
                <InputActionButton role="button" ref={emojiButtonRef} onClick={() => setEmojisOpen(!emojisOpen)}>
                    <Icon variant="emoji" size={20} />
                </InputActionButton>
                <EmojiPickerWrapper $open={emojisOpen} ref={emojiRef} >
                    <EmojiPicker
                        open
                        lazyLoadEmojis
                        onEmojiClick={({ emoji }) => handleAppendEmoji(emoji)}
                    />
                </EmojiPickerWrapper>
                <StyledChatInput
                    contentEditable
                    role="textbox"
                    ref={inputRef}
                    data-cy="channel-input"
                    $currentValue={inputRef.current?.innerText}
                    onKeyDown={(e) => {
                        // Allows for resetting innerText and spacing when submitting the message
                        if (e.code === 'Enter' && !e.shiftKey) e.preventDefault();
                    }}
                />
                <SubmitButton onClick={handleSubmitMessage} data-cy="channel-input-submit">
                    <Icon variant="sendMessage" size={20} />
                </SubmitButton>
            </InputInnerContainer>
        </ChatInputContainer>
    );
};
