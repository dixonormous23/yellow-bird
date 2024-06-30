import { UserInterface } from "../../../../../@types";
import { JoinChannelModal } from "./JoinChatModal";
import { ActiveUsersWrapper, ChatActionsWrapper, ClipboardButton, CreateChatButton } from "./styles";
// import { CreateChannelModal } from "./CreateChannelModal";
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
            {!activeChannel && <JoinChannelModal />}
        </ChatActionsWrapper>
    );
};
