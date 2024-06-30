import {  useCallback, useEffect, useState } from "react";
import { ChatRoomContainer } from "./styles";
import { usePubNubContext } from "@/context/PubNubContext";
import { Message } from "@pubnub/chat";

export const ChatWindow: React.FC= () => {
    const { activeChannel } = usePubNubContext();
    const [messages, setMessages] = useState<Message[]>([]);
    const [channelId, setChannelId] = useState<string>();

    useEffect(() => {
        const fetchChannelHistory = async () => {
            if (!activeChannel) return;

            const history = (await activeChannel.getHistory()).messages ?? [];

            setMessages(history);
        };
        fetchChannelHistory();
    }, []);

    useEffect(() => {
        if (!activeChannel) return;

        activeChannel.connect((message) => setMessages((prev) => [...prev, message]));
    }, [activeChannel]);

    return (
        <ChatRoomContainer>
            {messages?.map((item: Message) => (
                <div key={item.timetoken}>
                    <p>{item.content.text}</p>
                </div>
            ))}
        </ChatRoomContainer>
    )
}