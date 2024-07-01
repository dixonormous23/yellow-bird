import styled from "styled-components";
import { breakpoint } from "@/styles/utils";

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

export const ChannelItemsContainer = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 2rem;
    height: -webkit-fill-available;
    background: ${({ theme }) => theme.colors.surfaceLight};

    small {
        text-align: center;
    }
`;

export const ChannelItemWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    padding: 0.3rem 1rem;
    transition: 0.2s;
    cursor: pointer;
    margin-bottom: 1rem;
    margin-inline: 0.5rem;
    border-radius: 10px;

    label {
        cursor: pointer;
        margin-left: 0.5rem;
    }

    &:hover {
        background-color: rgba(0,0,0,0.05);

        button {
            opacity: 1;
        }
    };
`;
