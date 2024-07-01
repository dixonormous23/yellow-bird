import { useState } from "react";
import { Channel, User } from "@pubnub/chat";
import { Icon } from "@/components/common";
import { JoinChannelModal } from "./molecules";
import { ActiveUsersWrapper, ChannelOptionsWrapper, ChatActionsWrapper, CopyChannelCodeButton } from "./styles";

interface ChatActionsProps {
    activeChannel: Channel | null;
    activeChannelMembers: User[];
}

export const ChatActionBar: React.FC<ChatActionsProps> = ({ activeChannel, activeChannelMembers }) => {
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
                    <>
                        <strong>{activeChannel?.name ?? activeChannel?.id}</strong>
                        <small>{activeChannelMembers?.length} members</small>
                    </>
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
