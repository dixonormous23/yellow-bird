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
    background-color: ${({ theme }) => theme.colors.primary};
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
