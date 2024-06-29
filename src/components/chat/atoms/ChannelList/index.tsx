import { Channel } from "@pubnub/chat";

import { Avatar } from "@/components/common";
import { usePubNubContext } from "@/context/PubNubContext";
import { DEFAULT_AVATAR } from "@/constants";
import { ChannelItemWrapper, ChannelListContainer } from "./styles";

export const ChannelList: React.FC = () => {
    const { fetching, channels, setActiveChannel } = usePubNubContext();

    return (
        <ChannelListContainer>
            {fetching ? (
                <span>Loading chats..</span>
            ) : channels?.length ? (
                channels.map((channel) => (
                    <ChannelItemWrapper key={channel.id} onClick={() => setActiveChannel(channel)}>
                        <Avatar src={DEFAULT_AVATAR} />
                        <p>{channel.name ?? channel.id}</p>
                    </ChannelItemWrapper>
                ))
            ) : (
                <div>
                    <strong>No chats!</strong>
                </div>
            )}
        </ChannelListContainer>
    );
};
