import { useCallback, useEffect, useMemo, useRef } from "react";
import moment from "moment";

import { usePubNubContext } from "@/context/PubNubContext";
import { useAuthContext } from "@/context/AuthContext";
import { ChatInputContainer, InputInnerContainer, StyledChatInput, SubmitButton } from "./styles";
import { Icon } from "@/components/common";

export const ChatInput: React.FC = () => {
    const { user } = useAuthContext();
    const { activeChannel } = usePubNubContext();

    const inputRef = useRef<HTMLDivElement | null>(null);

    const handleSubmitMessage = useCallback(async () => {
        const message = inputRef?.current;
    
        if (!activeChannel || !message?.innerText.trim().length) return;
    
        const formattedMessage = message.innerText.replaceAll('\n', '<br />');

        await activeChannel.sendText(formattedMessage, {
            storeInHistory: true,
            meta: {
                avatar: user?.avatar,
                username: user?.username,
                timestamp: moment().valueOf()
            }
        });

        message.innerText = '';

    }, [activeChannel, user?.avatar, user?.username])

    const listenForSubmit = useCallback(async (e: KeyboardEvent) => {       
        if (e.code === "Enter" && !e.shiftKey && inputRef.current) {
            handleSubmitMessage();
        };
    
    }, [handleSubmitMessage]);

    const listenForTypingEvent = useCallback(() => {
        activeChannel?.startTyping();
    }, [activeChannel]);

    useEffect(() => {
        window.addEventListener('keydown', listenForSubmit);
        window.addEventListener('keyup', listenForTypingEvent);

        return () => {
            window.removeEventListener('keydown', listenForSubmit);
            window.removeEventListener('keyup', listenForTypingEvent);

        }
    }, [listenForSubmit, listenForTypingEvent]);

    useEffect(() => {
        activeChannel?.getTyping((ids) => console.log(ids));
    }, [activeChannel]);

    return (
        <ChatInputContainer>
            <InputInnerContainer $channelName={activeChannel?.name ?? "channel"}>
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
                    <Icon variant="sendMessage" />
                </SubmitButton>
            </InputInnerContainer>
        </ChatInputContainer>
    );
};
