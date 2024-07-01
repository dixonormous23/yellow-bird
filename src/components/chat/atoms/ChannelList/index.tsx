import { useCallback, useEffect, useState } from "react";
import { Channel } from "@pubnub/chat";

import { Avatar } from "@/components/common";
import { usePubNubContext } from "@/context/PubNubContext";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { CreateChannelModal } from "./molecules";
import { ChannelItemWrapper, ChannelItemsContainer, ChannelListContainer, UserActionsContainer, Username } from "./styles";

interface ChannelListProps {
    condensed: boolean;
    setCondensed: React.Dispatch<React.SetStateAction<boolean>>
}

export const ChannelList: React.FC<ChannelListProps> = ({ condensed, setCondensed }) => {
    const { isMobile } = useWindowWidth();
    const { fetching, channels, activeUser, setNewChannel } = usePubNubContext();

    const [userChannels, setUserChannels] = useState<Channel[]>([]);

    const fetchUserChannels = useCallback(async () => {
        if (!activeUser) return;

        const userChannels = (await activeUser.getMemberships()).memberships.map(({ channel }) => channel);

        setUserChannels(userChannels);
    }, [activeUser]);


    useEffect(() => {
        fetchUserChannels();
    }, [channels, fetchUserChannels]);

    const onChannelItemClick = (channel: Channel) => {
        setNewChannel(channel);
        setCondensed(isMobile);
    };

    return (
        <ChannelListContainer $condense={condensed}>
            <UserActionsContainer>
                <Avatar src={activeUser?.custom?.avatar} size={48} />
                <Username>{activeUser?.name}</Username>
            </UserActionsContainer>
            <ChannelItemsContainer>
                {fetching ? (
                    <small>Loading chats..</small>
                ) : userChannels?.length ? (
                    userChannels.map((channel) => (
                        <ChannelItemWrapper key={channel.id} onClick={() => onChannelItemClick(channel)}>
                            <span># {channel.name ?? channel.id}</span>
                        </ChannelItemWrapper>
                    ))
                ) : null}
                {!fetching && <CreateChannelModal />}
            </ChannelItemsContainer>
        </ChannelListContainer>
    );
};
