import { useCallback, useEffect, useState } from "react";
import { Message } from "@pubnub/chat";
import { usePubNubContext } from "@/context/PubNubContext";
import { ChatMessage } from "../MessageItem";
import { ChatAnchor } from "./ChatAnchor";
import { ChatRoomContainer } from "./styles";
import { CHANNEL_BOT_DATA } from "@/constants";

export const ChatWindow: React.FC = () => {
    const { activeChannel } = usePubNubContext();
    const [messages, setMessages] = useState<Message[]>([]);

    const fetchChannelHistory = useCallback(async () => {
        if (!activeChannel) return;

        const history = (await activeChannel.getHistory()).messages ?? [];

        setMessages(history);
    }, [activeChannel]);

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
            {messages?.map((message: Message, i: number, arr: Message[]) => {
                // Get previous message and compare userIds to stack message block
                const previousMessage = arr[i - 1] ?? {};
                const stack = previousMessage.meta?.userId !== CHANNEL_BOT_DATA.userId && previousMessage.userId === message.userId;
                return <ChatMessage key={`${message.timetoken}-${i}`} message={message} stack={stack} />;
            })}
            <ChatAnchor messages={messages} />
        </ChatRoomContainer>
    )
}