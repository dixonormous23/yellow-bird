import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Channel, Chat, User } from '@pubnub/chat';
import { ProviderProps, UserInterface } from "../../@types";
import { DEFAULT_AVATAR } from "@/constants";

interface PubNubContextInterface {
    chat?: Chat;
    channels: Channel[];
    fetching: boolean;
    activeUser?: User;
    activeChannel: Channel | null;
    setActiveChannel: React.Dispatch<React.SetStateAction<Channel | null>>;
    refetchChannels: () => void;
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
    const [fetching, setFetching] = useState<boolean>(true);

    // @TODO - refactor this to be DRY, possible throw in API call or in separate useEffect
    const refetchChannels = useCallback(async () => {
        if (!chat || !activeUser) return;

        const channels = (await chat.getChannels()).channels ?? [];
        const memberships = (await activeUser.getMemberships()).memberships;

        const userChannels = await Promise.all(channels.filter((channel) => {
            return memberships.some(async (member) =>
                (await channel.getMembers()).members.find((_member) => _member.user.id === member.user.id))
        }));

        setChannels(userChannels);
    }, [activeUser, chat])

    useEffect(() => {
        const initializeChat = async () => {
            if (!user?.uid) return;

            const chat = await Chat.init({
                publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
                subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUB_KEY,
                userId: user?.uid,
                typingTimeout: 1000
            });
    
            setChat(chat);

            const activeUser = (await chat.updateUser(user.uid, {
                name: user?.username ?? "",
                custom: {
                    avatar: user.avatar ?? DEFAULT_AVATAR
                }
            }));

            const channels = (await chat.getChannels()).channels ?? [];

            setChannels(channels);
            setActiveUser(activeUser);
            setFetching(false);
        };

        initializeChat();
    }, [user]);

    return (
        <PubNubContext.Provider
            value={{
                chat,
                channels,
                fetching,
                activeUser,
                activeChannel,
                setActiveChannel,
                refetchChannels
            }}
        >
            {children}
        </PubNubContext.Provider>
    )
};

export const usePubNubContext = (): PubNubContextInterface => {
    return useContext(PubNubContext);
};