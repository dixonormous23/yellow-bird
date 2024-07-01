import { useState } from "react";
import { Channel, User } from "@pubnub/chat";
import { Icon } from "@/components/common";
import { JoinChannelModal } from "./molecules";
import { ActiveUsersActionsWrapper, ActiveUsersInnerWrapper, ActiveUsersWrapper, ChannelOptionsWrapper, ChatActionsWrapper, CloseChatButton, CopyChannelCodeButton } from "./styles";

interface ChatActionsProps {
    activeChannel: Channel | null;
    activeChannelMembers: User[];
    handleCloseChat: () => void;
}

export const ChatActionBar: React.FC<ChatActionsProps> = ({ activeChannel, activeChannelMembers, handleCloseChat }) => {
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopyChannelCode = () => {
        if (!activeChannel?.id || copied) return;

        if (typeof navigator !== 'undefined') {
            navigator.clipboard.writeText(activeChannel.id);

            setCopied(true);

            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <ChatActionsWrapper>
            <ActiveUsersWrapper>
                {activeChannel && (
                    <ActiveUsersActionsWrapper>
                        <CloseChatButton onClick={handleCloseChat}>
                            <Icon variant="back" size={15} />
                        </CloseChatButton>
                        <ActiveUsersInnerWrapper>
                            <strong>{activeChannel?.name ?? activeChannel?.id}</strong>
                            <small>{activeChannelMembers?.length} members</small>
                        </ActiveUsersInnerWrapper>
                    </ActiveUsersActionsWrapper>
                )}
            </ActiveUsersWrapper>
            <ChannelOptionsWrapper>
                {activeChannel && (
                    <div title="Copy channel id">
                        <CopyChannelCodeButton onClick={handleCopyChannelCode}>
                            <label>{copied ? "Copied!" : "Copy Channel ID"}</label>
                            <Icon variant="copy" size={15} />
                        </CopyChannelCodeButton>
                    </div>
                )}
                <JoinChannelModal />
            </ChannelOptionsWrapper>
        </ChatActionsWrapper>
    );
};
