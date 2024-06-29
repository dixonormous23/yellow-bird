import { useMemo, useState } from "react";

import { useAuthContext } from "@/context/AuthContext";
import { usePubNubContext } from "@/context/PubNubContext";
import { Icon, InputField, Modal, SubmissionError } from "@/components/common";
import { CreateChatButton, CreateChatInnerContainer, CreateChatSubmitButton } from "./styles";

export const CreateChannelModal: React.FC = () => {
    const { user } = useAuthContext();
    const { chat } = usePubNubContext();

    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [roomName, setRoomName] = useState<string>();

    const toggleOpen = () => {
        setOpen(!open);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomName(e.target.value);
    };

    const onCreateRoom = async () => {
        if (!roomName || !chat || !user) return;
    
        const host = await chat.getUser(user.uid);

        if (!host) return setError("You must be logged in to create a room");

        try {
            chat?.createGroupConversation({
                users: [host],
                channelData: {
                    name: roomName
                }
            })
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
                    <InputField
                        label="Enter room name"
                        placeholder="#general"
                        onChange={onChange}
                    />
                    {error && <SubmissionError>{error}</SubmissionError>}
                    <CreateChatSubmitButton disabled={createDisabled} onClick={onCreateRoom}>Create</CreateChatSubmitButton>
                </CreateChatInnerContainer>

            </Modal>
        </>
    )
}