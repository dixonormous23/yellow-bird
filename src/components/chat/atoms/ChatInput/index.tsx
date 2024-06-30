import { useCallback, useEffect, useRef } from "react";
import moment from "moment";

import { usePubNubContext } from "@/context/PubNubContext";
import { useAuthContext } from "@/context/AuthContext";
import { ChatInputContainer, InputInnerContainer, StyledChatInput, SubmitButton } from "./styles";
import { Icon } from "@/components/common";

export const ChatInput: React.FC = () => {
    const { user } = useAuthContext();
    const { activeChannel } = usePubNubContext();

    const inputRef = useRef<HTMLDivElement | null>(null);

    const listenForSubmit = useCallback(async (e: KeyboardEvent) => {
        const message = inputRef?.current?.innerText;
        if (!activeChannel || !message?.trim().length) return;
        
        if (e.code === "Enter" && !e.shiftKey && inputRef.current) {
            inputRef.current.innerText = '';
            const formattedMessage = message.replaceAll('\n', '<br />');
            await activeChannel.sendText(formattedMessage, {
                storeInHistory: true,
                meta: {
                    avatar: user?.avatar,
                    username: user?.username,
                    timestamp: moment().valueOf()
                }
            });
            document.getElementById('chatAnchor')?.scrollIntoView();
        };
    
    }, [activeChannel, user])

    useEffect(() => {
        window.addEventListener('keydown', listenForSubmit);

        return () => {
            window.removeEventListener('keydown', listenForSubmit);
        }
    }, [listenForSubmit]);

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
                <SubmitButton type="submit">
                    <Icon variant="sendMessage" />
                </SubmitButton>
            </InputInnerContainer>
        </ChatInputContainer>
    );
};
