import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Channel, Chat, User } from '@pubnub/chat';
import { ProviderProps, UserInterface } from "../../@types";
import { DEFAULT_AVATAR, WELCOME_CHANNEL_ID } from "@/constants";

interface PubNubContextInterface {
    chat?: Chat;
    channels: Channel[];
    fetching: boolean;
    activeUser?: User;
    activeChannel: Channel | null;
    activeChannelMembers: User[];
    refetchChannels: () => void;
    setNewChannel: (channel: Channel) => Promise<void>;
}

interface PubNupProviderProps extends ProviderProps {
    user: UserInterface | null;
}

export const PubNubContext = createContext(undefined as unknown as PubNubContextInterface);

export const PubNubContextProvider: React.FC<PubNupProviderProps> = ({ children, user }) => {
    const [chat, setChat] = useState<Chat>();
    const [channels, setChannels] = useState<Channel[]>([]);
    const [activeUser, setActiveUser] = useState<User>();
    const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
    const [activeChannelMembers, setActiveChannelMembers] = useState<User[]>([]);
    const [fetching, setFetching] = useState<boolean>(true);

    const refetchChannels = useCallback(async () => {
        if (!chat || !activeUser) return;

        const userChannels = (await activeUser.getMemberships()).memberships.map(({ channel }) => channel);
        setChannels(userChannels);
    }, [activeUser, chat])

    useEffect(() => {
        const initializeChat = async () => {
            if (!user?.uid) return;

            const chat = await Chat.init({
                publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
                subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUB_KEY,
                userId: user.uid,
                typingTimeout: 1000
            });

            setChat(chat);

            const activeUser = (await chat?.updateUser(user.uid, {
                name: user?.username ?? "user",
                custom: {
                    avatar: user?.avatar ?? DEFAULT_AVATAR
                }
            }) ?? await chat?.createUser(user.uid, {
                name: user?.username ?? "user",
                custom: {
                    avatar: user.avatar ?? DEFAULT_AVATAR
                }
            }));

            const channels = (await chat.getChannels()).channels ?? [];
            console.log(channels);
            // // If we have a new user invite them to the #welcome channel
            const userChannels = (await activeUser.getMemberships()).memberships ?? [];

            if (!userChannels?.length) {
                const welcomeChannel = await chat.getChannel(WELCOME_CHANNEL_ID);
                await welcomeChannel?.invite(activeUser);
            }

            setChannels(channels);
            setActiveUser(activeUser);
            setFetching(false);
        };

        initializeChat();
    }, [user]);

    // Setting active channel from <ChannelList /> to attach the user to the desired channel
    const setNewChannel = useCallback(async (channel: Channel): Promise<void> => {
        if (!chat || !channel) return;

        const memberData = (await channel.getMembers()).members ?? [];

        const members = await Promise.all(memberData.map(async (member) => {
            const user = await chat.getUser(member.user.id) ?? {} as User;
            return { ...user };
        })) as User[];

        setActiveChannel(channel);
        setActiveChannelMembers(members);
    }, [chat]);

    return (
        <PubNubContext.Provider
            value={{
                chat,
                channels,
                fetching,
                activeUser,
                activeChannel,
                activeChannelMembers,
                refetchChannels,
                setNewChannel
            }}
        >
            {children}
        </PubNubContext.Provider>
    )
};

export const usePubNubContext = (): PubNubContextInterface => {
    return useContext(PubNubContext);
};