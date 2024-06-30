import { Avatar, Icon } from "@/components/common";
import { usePubNubContext } from "@/context/PubNubContext";
import { CreateChannelModal, ChannelActions } from "./molecules";
import { ChannelItemWrapper, ChannelItemsContainer, ChannelListContainer, UserActionsContainer, Username } from "./styles";
import { useCallback, useEffect, useState } from "react";
import { Channel } from "@pubnub/chat";
import { useWindowWidth } from "@/hooks/useWindowWidth";

export const ChannelList: React.FC = () => {
    const { isMobile } = useWindowWidth();
    const { fetching, channels, activeUser, setActiveChannel } = usePubNubContext();

    const [userChannels, setUserChannels] = useState<Channel[]>([]);
    const [condense, setCondense] = useState<boolean>(false);

    const fetchUserChannels = useCallback(async () => {
        if (!activeUser) return;

        const memberships = (await activeUser.getMemberships()).memberships;

        const userChannels = await Promise.all(channels.filter((channel) => {
            return memberships.some(async (member) =>
                (await channel.getMembers()).members.find((_member) => _member.user.id === member.user.id))
        }));

        setUserChannels(userChannels);
    }, [activeUser, channels]);


    useEffect(() => {
        fetchUserChannels();
    }, [channels, fetchUserChannels]);

    const onChannelItemClick = (channel: Channel) => {
        setActiveChannel(channel);

        if (isMobile) {
            setCondense(true);
        }
    }

    return (
        <ChannelListContainer $condense={condense}>
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
                            <span>{channel.name ?? channel.id}</span>
                            <ChannelActions channel={channel} />
                        </ChannelItemWrapper>
                    ))
                ) : null}
                {!fetching && <CreateChannelModal />}
            </ChannelItemsContainer>
        </ChannelListContainer>
    );
};
