import { Avatar } from "@/components/common";
import { usePubNubContext } from "@/context/PubNubContext";
import { DEFAULT_AVATAR } from "@/constants";
import { ChannelItemWrapper, ChannelItemsContainer, ChannelListContainer, UserActionsContainer, Username } from "./styles";

export const ChannelList: React.FC = () => {
    const { fetching, channels, activeUser, setActiveChannel } = usePubNubContext();

    return (
        <ChannelListContainer>
            <UserActionsContainer>
                <Avatar src={activeUser?.custom?.avatar} size={48} />
                <Username>{activeUser?.name}</Username>
            </UserActionsContainer>
            <ChannelItemsContainer>
                {fetching ? (
                    <small>Loading chats..</small>
                ) : channels?.length ? (
                    channels.map((channel) => (
                        <ChannelItemWrapper key={channel.id} onClick={() => setActiveChannel(channel)}>
                            <span>{channel.name ?? channel.id}</span>
                        </ChannelItemWrapper>
                    ))
                ) : (
                    <small>No chats!</small>
                )}
            </ChannelItemsContainer>
        </ChannelListContainer>
    );
};
