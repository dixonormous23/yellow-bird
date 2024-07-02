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
    margin-right: ${(props) => props.$stack ? 4 : 1}rem;

    ${breakpoint('mobile')} {
        margin-right: 1rem;
    }
`;

export const MessageBodyWrapper = styled.div`
    display: flex;
    flex-direction: column;
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
    position: absolute;
    bottom: -20px;
    padding: 0.3rem 0.5rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.primaryLight};
`;
