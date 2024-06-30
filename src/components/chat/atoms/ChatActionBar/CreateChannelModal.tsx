import { useMemo, useState } from "react";

import { useAuthContext } from "@/context/AuthContext";
import { usePubNubContext } from "@/context/PubNubContext";
import { Icon, InputField, Modal, SubmissionError } from "@/components/common";
import { CreateChatButton, CreateChatInnerContainer, CreateChatSubmitButton, CreateRoomForm } from "./styles";

export const CreateChannelModal: React.FC = () => {
    const { user } = useAuthContext();
    const { chat, channels, refetchChannels } = usePubNubContext();

    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [roomName, setRoomName] = useState<string>();

    const toggleOpen = () => {
        setOpen(!open);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomName(e.target.value);
    };

    const onCreateRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!roomName || !chat || !user?.uid) return;
    
        const host = await chat.getUser(user.uid);

        if (!host) return setError("You must be logged in to create a room");

        const roomNameExists = channels.find((channel) => channel.name === roomName);

        if (roomNameExists) return setError("Room name already in use!");

        try {
            await chat?.createGroupConversation({
                users: [host],
                channelData: {
                    name: roomName
                }
            });

            refetchChannels();

            toggleOpen();

        } catch (error) {
            setError(error as string);
        }
    };

    const createDisabled = useMemo(() => !roomName?.length, [roomName]);

    return (
        <>
            <CreateChatButton onClick={toggleOpen}>
                <span>Create chat</span>
                <Icon variant="plus" size={12} fill="white" />
            </CreateChatButton>
            <Modal title="Create new chat" open={open} handleClose={toggleOpen}>
                <CreateChatInnerContainer>
                    <CreateRoomForm onSubmit={onCreateRoom}>
                        <InputField
                            label="Enter room name"
                            placeholder="#general"
                            onChange={onChange}
                        />
                        {error && <SubmissionError>{error}</SubmissionError>}
                        <CreateChatSubmitButton type="submit" disabled={createDisabled}>Create</CreateChatSubmitButton>
                    </CreateRoomForm>
                </CreateChatInnerContainer>

            </Modal>
        </>
    )
}