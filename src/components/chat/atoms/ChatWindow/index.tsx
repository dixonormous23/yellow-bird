import { useCallback, useEffect, useState } from "react";
import { Message } from "@pubnub/chat";
import { CHANNEL_BOT_DATA } from "@/constants";
import { usePubNubContext } from "@/context/PubNubContext";
import { ChatMessage } from "../MessageItem";
import { ChatAnchor } from "./ChatAnchor";
import { ChatRoomContainer } from "./styles";

export const ChatWindow: React.FC = () => {
    const { activeUser, activeChannel } = usePubNubContext();
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

    useEffect(() => {
        if (!messages?.length) return;

        return Message.streamUpdatesOn(messages, setMessages);
    }, [messages]);

    const toggleReaction = async (message: Message, code: string) => {
        await message.toggleReaction(code)
    };

    const handleEditMessage = async (message: Message, text: string) => {
        await message.editText(text);
    };

    return (
        <ChatRoomContainer data-cy="channel-messages">
            {messages?.map((message: Message, i: number, arr: Message[]) => {
                // Get previous message and compare userIds to stack message block
                const previousMessage = arr[i - 1] ?? {};
                const stack = previousMessage.meta?.userId !== CHANNEL_BOT_DATA.userId && previousMessage.userId === message.userId;

                return (
                    <ChatMessage
                        key={`${message.timetoken}-${i}`}
                        message={message}
                        stack={stack}
                        activeUser={activeUser}
                        toggleReaction={toggleReaction}
                        handleEditMessage={handleEditMessage}
                    />
                );
            })}
            <ChatAnchor messages={messages} />
        </ChatRoomContainer>
    );
};
