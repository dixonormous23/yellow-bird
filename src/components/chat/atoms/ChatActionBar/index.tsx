import { Channel, User } from "@pubnub/chat";
import { JoinChannelModal } from "./JoinChatModal";
import { ActiveUsersWrapper, ChatActionsWrapper } from "./styles";
import { NetworkStatus } from "./molecules/NetworkStatus";

interface ChatActionsProps {
    activeChannel: Channel | null;
    activeChannelMembers: User[];
}

export const ChatActionBar: React.FC<ChatActionsProps> = ({ activeChannel, activeChannelMembers }) => {
    return (
        <ChatActionsWrapper>
            <NetworkStatus />
            <ActiveUsersWrapper>
                {activeChannel && (
                    <>                    
                        <strong>{activeChannel?.name ?? activeChannel?.id}</strong>
                        <small>{activeChannelMembers?.length} members</small>
                    </>
                )}
            </ActiveUsersWrapper>
            {!activeChannel && <JoinChannelModal />}
        </ChatActionsWrapper>
    );
};
