import { useCallback, useEffect, useRef } from "react";

import { usePubNubContext } from "@/context/PubNubContext";
import { ChatInputContainer, InputInnerContainer, StyledChatInput } from "./styles";

export const ChatInput: React.FC = () => {
    const { activeChannel } = usePubNubContext();

    const inputRef = useRef<HTMLDivElement | null>(null);

    const listenForSubmit = useCallback(async (e: KeyboardEvent) => {
        const message = inputRef?.current?.innerText;
        if (!activeChannel || !message?.trim().length) return;
        
        if (e.code === "Enter" && !e.shiftKey && inputRef.current) {
            inputRef.current.innerText = '';
            const formattedMessage = message.replaceAll('\n', '<br />');
            await activeChannel.sendText(formattedMessage, { storeInHistory: true });
            document.getElementById('chatAnchor')?.scrollIntoView();
        };
    
    }, [activeChannel])

    useEffect(() => {
        window.addEventListener('keydown', listenForSubmit);

        return () => {
            window.removeEventListener('keydown', listenForSubmit);
        }
    }, [listenForSubmit]);

    return (
        <ChatInputContainer>
            <InputInnerContainer>
                <StyledChatInput
                    contentEditable
                    role="textbox"
                    ref={inputRef}
                    $currentValue={inputRef.current?.innerText}
                    onKeyDown={(e) => {
                        if (e.code === 'Enter' && !e.shiftKey) e.preventDefault();
                    }}
                />
                <button type="submit">Send</button>
            </InputInnerContainer>
        </ChatInputContainer>
    );
};
