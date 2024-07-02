import styled from "styled-components";
import { sharedButtonStyles } from "../ChannelList/sharedStyles";
import { breakpoint } from "@/styles/utils";

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

export const CloseChatButton = styled.button`
    display: none;

    ${breakpoint('mobile')} {
        display: flex;
        margin-right: 1rem;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
`;

export const ActiveUsersActionsWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const ActiveUsersInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
`;

export const ChannelOptionsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const CopyChannelCodeButton = styled.button`
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0.2rem 1rem;
    border-radius: 20px;
    border: 1px solid ${({ theme }) => theme.colors.primary};

    label {
        cursor: pointer;
        margin-right: 0.5rem;
    }

    ${breakpoint('tablet')} {
        label {
            display: none;
        }
    }
`;
