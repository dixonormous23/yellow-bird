import { Message } from "@pubnub/chat";
import { useEffect } from "react";
import { LastMessageAnchor } from "./styles";

interface ChatAnchorProps {
    messages: Message[];
}

export const ChatAnchor: React.FC<ChatAnchorProps> = ({ messages }) => {
    useEffect(() => {
        const anchor = document.getElementById('chatAnchor');

        if (!anchor) return console.log('no anchor');

        anchor.scrollIntoView(true);
    }, [messages]);

    return <LastMessageAnchor id="chatAnchor" />;
}