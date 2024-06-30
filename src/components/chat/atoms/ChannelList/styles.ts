import styled from "styled-components";
import { formButtonStyles } from "@/components/common";
import { breakpoint } from "@/styles/utils";
import { sharedListItemStyles } from "./sharedStyles";

export const ChannelListContainer = styled.div<{ $condense: boolean; }>`
    display: flex;
    flex-direction: column;
    min-width: 270px;
    border-right: 1px solid ${({ theme }) => theme.colors.border};

    ${breakpoint('mobile')} {
        min-width: 100%;
        position: absolute;
        z-index: 10;
        background: white;
        height: -webkit-fill-available;
        border-radius: 10px;
        transition: 0.2s;
        left: ${(props) => props.$condense ? -400 : 0}px;
    }
`;

export const UserActionsContainer = styled.div`
    padding: 0.5rem 2rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Username = styled.span`
    margin-left: 1rem;
`;

export const JoinChannelContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const JoinChannelButton = styled.div`
    ${formButtonStyles};
`;

export const ChannelItemsContainer = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 2rem;

    small {
        text-align: center;
    }
`;

export const ChannelItemWrapper = styled.div`
    ${sharedListItemStyles};
    justify-content: space-between;
`;
