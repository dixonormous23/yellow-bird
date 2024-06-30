import { Channel } from "@pubnub/chat";
import { JoinChannelModal } from "./JoinChatModal";
import { ActiveUsersWrapper, ChatActionsWrapper } from "./styles";

interface ChatActionsProps {
    activeChannel: Channel | null;
}

export const ChatActionBar: React.FC<ChatActionsProps> = ({ activeChannel }) => {
    return (
        <ChatActionsWrapper>
            <ActiveUsersWrapper>
                <strong>{activeChannel?.name ?? activeChannel?.id}</strong>
            </ActiveUsersWrapper>
            {!activeChannel && <JoinChannelModal />}
        </ChatActionsWrapper>
    );
};
