import { Button, InputField, Modal, SubmissionError } from "@/components/common"
import { CreateJoinChannelForm, CreateJoinInnerContainer } from "./styles";

interface CreateJoinChannelProps {
    open: boolean;
    modalTitle: string;
    inputLabel: string;
    inputPlaceholder: string;
    buttonText: string;
    error?: string;
    disabled?: boolean;
    toggleOpen: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// The main two action modals (Create and Join) share the same UI, so just broke
// this out into it's own component.
export const CreateJoinChannelModal: React.FC<CreateJoinChannelProps> = ({
    open,
    modalTitle,
    inputLabel,
    inputPlaceholder,
    buttonText,
    error,
    disabled,
    toggleOpen,
    onSubmit,
    onChange,
}) => {
    return (
        <Modal title={modalTitle} open={open} handleClose={toggleOpen}>
            <CreateJoinInnerContainer>
                <CreateJoinChannelForm onSubmit={onSubmit}>
                    <InputField
                        label={inputLabel}
                        placeholder={inputPlaceholder}
                        onChange={onChange}
                    />
                    {error && <SubmissionError>{error}</SubmissionError>}
                    <Button
                        label={buttonText}
                        type="submit"
                        disabled={disabled}
                        sx={{
                            maxWidth: 'fit-content',
                            alignSelf: 'center',
                            padding: '0.3rem 3rem'
                        }}
                    />
                </CreateJoinChannelForm>
            </CreateJoinInnerContainer>
        </Modal>
    );
};
