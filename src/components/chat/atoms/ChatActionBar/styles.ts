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

export const ChannelOptionsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const CopyChannelCodeButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
`;
