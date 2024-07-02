import { useEffect } from "react";
import { Message } from "@pubnub/chat";
import { LastMessageAnchor } from "./styles";

interface ChatAnchorProps {
    messages: Message[];
}

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