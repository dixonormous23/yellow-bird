import { breakpoint } from "@/styles/utils";
import styled from "styled-components";

export const ChatComponentContainer = styled.div`
    display: flex;
    margin-top: 4rem;
    width: 100%;
    height: 100%;
    justify-content: center;
`;

export const ChatComponentInnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 80vh;
    margin-inline: 2rem;
    margin-bottom: 5rem;
    max-width: ${({ theme }) => theme.widths.maxContent};

    ${breakpoint('mobile')} {
        margin-inline: 1rem;
    }
`;

export const ChatRoomStack = styled.div`
    display: flex;
    flex: 1 1 0px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const CurrentChatWindow = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

export const ChatRoomWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
`;
