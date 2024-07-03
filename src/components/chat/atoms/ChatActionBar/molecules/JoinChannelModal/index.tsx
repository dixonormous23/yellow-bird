import { useMemo, useState } from "react";
import moment from "moment";

import { useAuthContext } from "@/context/AuthContext";
import { usePubNubContext } from "@/context/PubNubContext";
import { Icon  } from "@/components/common";
import { CreateJoinChannelModal } from "../../../CreateJoinChatModal";
import { JoinChannelButton } from "./styles";
import { CHANNEL_BOT_DATA } from "@/constants";

export const JoinChannelModal: React.FC = () => {
    const { user } = useAuthContext();
    const { chat, refetchChannels } = usePubNubContext();

    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [roomId, setRoomName] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);

    const toggleOpen = () => {
        setOpen(!open);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomName(e.target.value);
    };

    const onJoinRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!roomId || !chat || !user?.uid || submitting) return;

        setSubmitting(true);
        const host = await chat.getUser(user.uid);

        if (!host) {
            setSubmitting(false);
            return setError("You must be logged in to create a room");
        };

        try {
            const channel = await chat.getChannel(roomId.trim())

            if (!channel) {
                setSubmitting(false);
                return setError("Invalid room id");
            }

            await channel.invite(host);
            // Attaching bot metadata to send message to channel that the user has joined
            await channel.sendText(`${host.name} has joined!`, {
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

    const joinDisabled = useMemo(() => !(roomId?.length > 0 && !submitting), [roomId, submitting]);

    return (
        <>
            <JoinChannelButton onClick={toggleOpen}>
                <label>Join Chat</label>
                <Icon variant="joinChat" size={12} fill="white" />
            </JoinChannelButton>
            <CreateJoinChannelModal
                open={open}
                modalTitle="Join channel"
                inputLabel="Enter channel code"
                inputPlaceholder="c6c649cb-747e-497a-9c45-f806b73283fe"
                buttonText="Join"
                error={error}
                disabled={joinDisabled}
                toggleOpen={toggleOpen}
                onChange={onChange}
                onSubmit={onJoinRoom}
            />
        </>
    )
}