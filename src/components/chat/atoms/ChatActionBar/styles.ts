import styled from "styled-components";
import { sharedButtonStyles } from "../ChannelList/sharedStyles";

export const ChatActionsWrapper = styled.div`
    position: absolute;
    padding: 0.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: -webkit-fill-available;
    z-index: 1;
    background: white;
    height: 48px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ActiveUsersWrapper = styled.div`
    height: 65px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    small {
        opacity: 0.7;
        font-size: 0.7rem;
        margin-top: 0.2rem;
    }
`;

export const CreateRoomForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
`;


export const CreateChatButton = styled.button`
    ${sharedButtonStyles};
    padding: 0.2rem 1rem;

    &:hover:not([disabled]) {
        background-color: white;
    }

    label {
        cursor: pointer;
        margin-right: 0.5rem;
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
