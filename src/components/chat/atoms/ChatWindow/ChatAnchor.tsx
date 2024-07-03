import { useEffect } from "react";
import { Message } from "@pubnub/chat";
import { LastMessageAnchor } from "./styles";

interface ChatAnchorProps {
    messages: Message[];
}

// Once a message is sent, received, or updated, <ChatWindow /> will scroll to this element
export const ChatAnchor: React.FC<ChatAnchorProps> = ({ messages }) => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
                const anchor = document.getElementById('chatAnchor');
        
                if (!anchor) return;
        
                anchor.scrollIntoView(true);
        }
    }, [messages]);

    return <LastMessageAnchor id="chatAnchor" />;
}