import { useCallback, useEffect, useState } from "react";
import { ChatRoomContainer, LastMessageAnchor } from "./styles";
import { usePubNubContext } from "@/context/PubNubContext";
import { Message } from "@pubnub/chat";

export const ChatWindow: React.FC = () => {
    const { activeChannel } = usePubNubContext();
    const [messages, setMessages] = useState<Message[]>([]);

    const fetchChannelHistory = useCallback(async () => {
        if (!activeChannel) return;

        const history = (await activeChannel.getHistory()).messages ?? [];

        setMessages(history);
        
        const anchor = document.getElementById('chatAnchor');

        if (!anchor) return console.log('no anchor');

        setTimeout(() => {
            anchor?.scrollIntoView();
        })
    }, [activeChannel])

    useEffect(() => {
        fetchChannelHistory();
    }, [fetchChannelHistory]);

    useEffect(() => {
        if (!activeChannel) return;
        activeChannel.connect((message) => {
            setMessages((prev) => [...prev, message])
        });
    }, [activeChannel]);

    return (
        <ChatRoomContainer>
            {messages?.map((item: Message, i: number) => (
                <div key={`${item.timetoken}-${i}`}>
                    <p dangerouslySetInnerHTML={{ __html: item.content.text }} />
                </div>
            ))}
            <LastMessageAnchor id="chatAnchor" />
        </ChatRoomContainer>
    )
}