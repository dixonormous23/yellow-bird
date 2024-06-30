import { UserInterface } from "../../../../../@types";
import { ActiveUsersWrapper, ChatActionsWrapper, CreateChatButton } from "./styles";
import { CreateChannelModal } from "./CreateChannelModal";
import { Channel } from "@pubnub/chat";

interface ChatActionsProps {
    activeChannel: Channel | null;
}

export const ChatActionBar: React.FC<ChatActionsProps> = ({ activeChannel }) => {
    return (
        <ChatActionsWrapper>
            <ActiveUsersWrapper>
                <strong>{activeChannel?.name ?? activeChannel?.id}</strong>
            </ActiveUsersWrapper>
            <CreateChannelModal />
        </ChatActionsWrapper>
    );
};
