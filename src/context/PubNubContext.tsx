import { createContext, useContext, useEffect, useState } from "react";
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

    useEffect(() => {
        const initializeChat = async () => {
            if (!user?.uid) return;

            const chat = await Chat.init({
                publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
                subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUB_KEY,
                userId: user?.uid,
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

    const refetchChannels = async () => {
        if (!chat) return;
    
        const channels = (await chat.getChannels()).channels ?? [];
        setChannels(channels);
    }

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