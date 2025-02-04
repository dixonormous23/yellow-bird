import { useCallback, useEffect, useState } from "react";
import { Channel } from "@pubnub/chat";

import { Avatar, Button } from "@/components/common";
import { usePubNubContext } from "@/context/PubNubContext";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { useAuthContext } from "@/context/AuthContext";
import { CreateChannelModal } from "./molecules";
import { ChannelItemWrapper, ChannelItemsContainer, ChannelListContainer, SignOutWrapper, UserActionsContainer, Username } from "./styles";
import { DEFAULT_AVATAR } from "@/constants";

interface ChannelListProps {
    condensed: boolean;
    setCondensed: React.Dispatch<React.SetStateAction<boolean>>
}

export const ChannelList: React.FC<ChannelListProps> = ({ condensed, setCondensed }) => {
    const { isMobile } = useWindowWidth();
    const { signOut } = useAuthContext();
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
                <Avatar src={activeUser?.custom?.avatar ?? DEFAULT_AVATAR} size={48} />
                <Username>{activeUser?.name}</Username>
            </UserActionsContainer>
            <ChannelItemsContainer>
                {fetching ? (
                    <small>Loading chats..</small>
                ) : userChannels?.length ? (
                    userChannels.map((channel) => (
                        <ChannelItemWrapper data-cy={`channel-${channel.name ?? channel.id}`} key={channel.id} onClick={() => onChannelItemClick(channel)}>
                            <span># {channel.name ?? channel.id}</span>
                        </ChannelItemWrapper>
                    ))
                ) : null}
                {!fetching && <CreateChannelModal />}
            </ChannelItemsContainer>
            <SignOutWrapper>
                <Button
                    data-cy="sign-out-button"
                    label="Sign out"
                    sx={{ padding: '0.2rem 2rem', fontSize: '0.85rem' }}
                    onClick={signOut}
                />
            </SignOutWrapper>
        </ChannelListContainer>
    );
};
