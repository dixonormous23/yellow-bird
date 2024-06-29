import { ProviderProps } from "../../../../@types";
import { Icon } from "../";
import {
    CloseModalButton,
    ModalBackdrop,
    ModalBodyContainer,
    ModalContainer,
    ModalTitleContainer
} from "./styles";

interface ModalProps extends ProviderProps {
    open: boolean;
    title: string;
    handleClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ open, title = "Modal", handleClose, children }) => {
    if (!open) return null;

    return (
        <>
            <ModalBackdrop onClick={handleClose} />
            <ModalContainer>
                <ModalTitleContainer>
                    <strong>{title}</strong>
                    <CloseModalButton onClick={(e) => {
                        e.stopPropagation();
                        handleClose()
                    }}>
                        <Icon variant="close" size={15} />
                    </CloseModalButton>
                </ModalTitleContainer>
                <ModalBodyContainer>
                    {children}
                </ModalBodyContainer>
            </ModalContainer>
        </>
    );
};
