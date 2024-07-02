import styled from "styled-components";
import { breakpoint } from "@/styles/utils";

export const MessageItemWrapper = styled.div`
    display: flex;
    transition: 0.2s;
    padding: 0.8rem;
    margin-top: 1rem;
    border-radius: 10px;
    position: relative;
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primaryLight};

        aside {
            opacity: 1;
        }

        small {
            opacity: 1;
        }
    }
`;

export const MessageItemActionsContainer = styled.aside`
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    padding: 0.2rem;
    border-radius: 10px;
    z-index: 1;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const MessageAvatarWrapper = styled.div<{ $stack: boolean }>`
    margin-right: 1rem;

    small {
        transition: 0.2s;
        color: gray;
        opacity: 0;
    }
`;

export const MessageBodyWrapper = styled.div`
    display: flex;
    flex-direction: column;

    label {
        font-size: 0.7rem;
        color: gray;
    }
`;

export const MessageDataWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    ${breakpoint('mobile')} {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.2rem;
    }
`;

export const ReactionButton = styled.button`
    border-radius: 50%;
    height: 30px;
    margin-right: 0.2rem;
    cursor: pointer;
    border: none;
    background-color: transparent;
`;

export const ReactionWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.7rem;
    margin-top: 0.5rem;
`;

export const ReactionItem = styled.span`
    border-radius: 25px;
    padding: 0.3rem 0.5rem;
    background-color: ${({ theme }) => theme.colors.primaryLight};
    border: 1px solid ${({ theme }) => theme.colors.primaryLight};

    small {
        font-size: 0.75rem;
        font-weight: 600;
    }
`;

export const EditingCalloutLabel = styled.strong`
    font-size: 0.8rem;
    position: absolute;
    right: 1rem;
    bottom: 0;
    color: gray;
`;
