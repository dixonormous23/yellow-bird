import { Channel } from "@pubnub/chat";
import { JoinChannelModal } from "./JoinChatModal";
import { ActiveUsersWrapper, ChatActionsWrapper } from "./styles";
import { useEffect, useMemo, useState } from "react";

interface ChatActionsProps {
    activeChannel: Channel | null;
}

export const ChatActionBar: React.FC<ChatActionsProps> = ({ activeChannel }) => {
    const [channelMembers, setChannelMembers] = useState<number>(0);

    useEffect(() => {
        if (!activeChannel) return;

        const fetchChannelMembers = async () => {
            const members = (await activeChannel.getMembers()).total;
            setChannelMembers(members ?? 0);
        }

        fetchChannelMembers();
    }, [activeChannel]);
    
    return (
        <ChatActionsWrapper>
            <ActiveUsersWrapper>
                <strong>{activeChannel?.name ?? activeChannel?.id}</strong>
                <small>{channelMembers} members</small>
            </ActiveUsersWrapper>
            {!activeChannel && <JoinChannelModal />}
        </ChatActionsWrapper>
    );
};
