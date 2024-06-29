import { UserInterface } from "../../../../../@types";
import { ActiveUsersWrapper, ChatActionsWrapper, CreateChatButton } from "./styles";
import { CreateChannelModal } from "./CreateChannelModal";

interface ChatActionsProps {
    users?: UserInterface[];
}

export const ChatActionBar: React.FC<ChatActionsProps> = ({ users = [] }) => {
    return (
        <ChatActionsWrapper>
            <ActiveUsersWrapper>
                {users?.map((user) => <strong key={user?.uid}>{user?.displayName}</strong>)}
            </ActiveUsersWrapper>
            <CreateChannelModal />
        </ChatActionsWrapper>
    );
};
