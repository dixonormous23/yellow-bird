import { createContext, useContext, useEffect, useState } from "react";
import { Chat } from '@pubnub/chat';
import { ProviderProps, UserInterface } from "../../@types";

interface PubNubContextInterface {
    chat?: Chat;
}

interface PubNupProviderProps extends ProviderProps {
    user: UserInterface | null;
}

export const PubNubContext = createContext(undefined as unknown as PubNubContextInterface);

export const PubNubContextProvider: React.FC<PubNupProviderProps> = ({ children, user }) => {
    const [chat, setChat] = useState<Chat>();

    useEffect(() => {
        const initializeChat = async () => {
            if (!user?.uid) return;

            const chat = await Chat.init({
                publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
                subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUB_KEY,
                userId: user?.uid,
            });
            setChat(chat);

            const channels = (await chat.getChannels()).channels ?? [];
            console.log(channels);
        };

        initializeChat();
    }, [user?.uid]);

    return (
        <PubNubContext.Provider value={{ chat }}>
            {children}
        </PubNubContext.Provider>
    )
};

export const usePubNubContext = (): PubNubContextInterface => {
    return useContext(PubNubContext);
};