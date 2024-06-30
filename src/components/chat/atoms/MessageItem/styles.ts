import { breakpoint } from "@/styles/utils";
import styled from "styled-components";

export const MessageItemWrapper = styled.div`
    display: flex;
    transition: 0.2s;
    padding: 0.3rem 0.8rem;
    margin-top: 1rem;
    cursor: pointer;

    &:hover {
        background-color: rgba(0,0,0,0.05);
    }
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
`;
