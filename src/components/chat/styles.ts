import styled from "styled-components";

export const ChatComponentContainer = styled.div`
    display: flex;
    margin-top: 4rem;
    width: 100%;
    justify-content: center;
`;

export const ChatComponentInnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 80vh;
    max-width: ${({ theme }) => theme.widths.maxContent};
`;

export const ChatRoomStack = styled.div`
    display: flex;
    flex: 1 1 0px;
    position: relative;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    overflow: hidden;
`;

export const CurrentChatWindow = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

export const ChatRoomWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
`;
