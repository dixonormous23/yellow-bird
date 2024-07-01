import { Channel, User } from "@pubnub/chat";
import { InviteUserModal, JoinChannelModal } from "./molecules";
import { ActiveUsersWrapper, ChannelOptionsWrapper, ChatActionsWrapper, CopyChannelCodeButton } from "./styles";
import { Icon } from "@/components/common";

interface ChatActionsProps {
    activeChannel: Channel | null;
    activeChannelMembers: User[];
}

export const ChatActionBar: React.FC<ChatActionsProps> = ({ activeChannel, activeChannelMembers }) => {
    const handleCopyChannelCode = () => {
        if (!activeChannel?.id) return;
    
        navigator.clipboard.writeText(activeChannel.id);
    }
    return (
        <ChatActionsWrapper>
            <ActiveUsersWrapper>
                {activeChannel && (
                    <>                    
                        <strong>{activeChannel?.name ?? activeChannel?.id}</strong>
                        <small>{activeChannelMembers?.length} members</small>
                    </>
                )}
            </ActiveUsersWrapper>
            <ChannelOptionsWrapper>
                {activeChannel && (
                    <div title="Copy channel code">
                        <CopyChannelCodeButton onClick={handleCopyChannelCode}>
                            <Icon variant="copy" />
                        </CopyChannelCodeButton>
                    </div>
                )}
                <JoinChannelModal />
            </ChannelOptionsWrapper>
        </ChatActionsWrapper>
    );
};
