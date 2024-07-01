import { useMemo, useState } from "react";
import moment from "moment"; 

import { useAuthContext } from "@/context/AuthContext";
import { usePubNubContext } from "@/context/PubNubContext";
import { Icon } from "@/components/common";
import { CHANNEL_BOT_DATA } from "@/constants";
import { CreateJoinChannelModal } from "../../../CreateJoinChatModal";
import { ChannelItemWrapper } from "../../styles";

export const CreateChannelModal: React.FC = () => {
    const { user } = useAuthContext();
    const { chat, channels, refetchChannels } = usePubNubContext();

    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [roomName, setRoomName] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);

    const toggleOpen = () => {
        setOpen(!open);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomName(e.target.value);
    };

    const onCreateRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!roomName || !chat || !user?.uid || submitting) return;

        setSubmitting(true);

        const host = await chat.getUser(user.uid);

        if (!host) {
            setSubmitting(false);
            return setError("You must be logged in to create a room");
        };

        const roomNameExists = channels.find((channel) => channel.name === roomName);

        if (roomNameExists) {
            setSubmitting(false);
            return setError("Room name already in use!")
        };

        try {
            const { channel } = await chat?.createGroupConversation({
                users: [host],
                channelData: {
                    name: roomName
                }
            });

            await channel.sendText(`${host.name} created #${roomName}`, {
                storeInHistory: true,
                meta: {
                    ...CHANNEL_BOT_DATA,
                    timestamp: moment().valueOf()
                }
            });
    
            refetchChannels();
            setSubmitting(false);
            toggleOpen();

        } catch (error) {
            setError(error as string);
            setSubmitting(false);
        }
    };

    const createDisabled = useMemo(() => !(roomName?.length > 0 && !submitting), [roomName, submitting]);

    return (
        <>
            <ChannelItemWrapper role="button" onClick={toggleOpen}>
                <Icon variant="plus" size={12} />
                <label>Create chat</label>
            </ChannelItemWrapper>
            <CreateJoinChannelModal
                open={open}
                modalTitle="Create new channel"
                inputLabel="Enter channel name"
                inputPlaceholder="#general"
                buttonText="Create"
                error={error}
                disabled={createDisabled}
                onChange={onChange}
                toggleOpen={toggleOpen}
                onSubmit={onCreateRoom}
            />
        </>
    )
}