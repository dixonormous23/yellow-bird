import styled from "styled-components";

export const ChannelListContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 270px;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

export const UserActionsContainer = styled.div`
    padding: 0.5rem 2rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Username = styled.span`
    margin-left: 1rem;;
`;

export const ChannelItemsContainer = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    small {
        text-align: center;
    }
`;

export const ChannelItemWrapper = styled.div`
    display: flex;
    padding: 0.3rem 1rem;
    transition: 0.2s;
    cursor: pointer;
    margin-bottom: 1rem;
    margin-inline: 0.5rem;
    border-radius: 10px;
    &:hover {
        background-color: rgba(0,0,0,0.05);
    }
`;
