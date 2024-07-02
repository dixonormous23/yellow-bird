import { Icon } from "@/components/common";
import { EmptyChatWrapper } from "./styles";

export const EmptyChat = (): React.ReactElement => {
    return (
        <EmptyChatWrapper data-cy="empty-chat">
            <Icon variant="emptyChat" size={250} />
            <span>Create or join a chat to get started!</span>
        </EmptyChatWrapper>
    );
};