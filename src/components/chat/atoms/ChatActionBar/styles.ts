import styled, { css } from "styled-components";

export const ChatActionsWrapper = styled.div`
    padding: 0.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ActiveUsersWrapper = styled.div`
    margin-block: 1.5rem;
    display: flex;
    align-items: center;
`;

export const CreateRoomForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
`;

const sharedButtonStyles = css`
    display: flex;
    align-items: center;
    font-weight: 500;
    transition: 0.2s;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.secondary};

    &:hover:not([disabled]) {
        background-color: white;
        color: ${({ theme }) => theme.colors.secondary};

        svg {
            fill: ${({ theme }) => theme.colors.secondary};
        }
    }

    &:disabled {
        opacity: 0.6;
        cursor: default;
    }
`;

export const CreateChatButton = styled.button`
    ${sharedButtonStyles};
    padding: 0.2rem 1rem;
    span {
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
