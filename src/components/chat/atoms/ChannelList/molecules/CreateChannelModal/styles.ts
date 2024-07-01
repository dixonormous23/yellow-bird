import styled from "styled-components";
import { sharedButtonStyles, sharedListItemStyles } from "../../sharedStyles";

export const CreateChatButton = styled.button`
    ${sharedButtonStyles};
    padding: 0.2rem 1rem;
    margin-inline: 1rem;
    background-color: white;
    color: ${({ theme }) => theme.colors.secondary};
    border: none;

    &:hover:not([disabled]) {
        background-color: rgba(0,0,0,0.1);
    }

    span {
        margin-left: 0.5rem;
    }
`;


export const CreateChatSubmitButton = styled.button`
    ${sharedButtonStyles};
    padding: 0.3rem 3rem;
    max-width: fit-content;
    align-self: center;
`;


export const CreateChatInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    min-width: 300px;
    margin: 2rem 1rem;
`;

export const CreateRoomButton = styled.div`
    ${sharedListItemStyles};

    label {
        cursor: pointer;
        margin-left: 0.5rem;
    }
`;

export const CreateRoomForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
`;