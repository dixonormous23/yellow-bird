import { useMemo, useState } from "react";

import { useAuthContext } from "@/context/AuthContext";
import { usePubNubContext } from "@/context/PubNubContext";
import { Icon, InputField, Modal, SubmissionError } from "@/components/common";
import { CreateChatButton, CreateChatInnerContainer, CreateChatSubmitButton, CreateRoomForm } from "./styles";

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

    const onCreateRoom = async (e: React.FormEvent<HTMLFormElement>) => {
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

            await channel.invite(host)
            refetchChannels();
            setSubmitting(false);
            toggleOpen();

        } catch (error) {
            setError(error as string);
            setSubmitting(false);
        }
    };

    const createDisabled = useMemo(() => !(roomId?.length > 0 && !submitting), [roomId, submitting]);

    return (
        <>
            <CreateChatButton onClick={toggleOpen}>
                <label>Join Chat</label>
                <Icon variant="joinChat" size={12} fill="white" />
            </CreateChatButton>
            <Modal title="Join chat" open={open} handleClose={toggleOpen}>
                <CreateChatInnerContainer>
                    <CreateRoomForm onSubmit={onCreateRoom}>
                        <InputField
                            label="Enter room ID"
                            placeholder="c6c649cb-747e-497a-9c45-f806b73283fe"
                            onChange={onChange}
                        />
                        {error && <SubmissionError>{error}</SubmissionError>}
                        <CreateChatSubmitButton type="submit" disabled={createDisabled}>Join</CreateChatSubmitButton>
                    </CreateRoomForm>
                </CreateChatInnerContainer>

            </Modal>
        </>
    )
}