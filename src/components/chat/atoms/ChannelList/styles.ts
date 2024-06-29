import styled from "styled-components";

export const ChannelListContainer = styled.nav`
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ChannelItemWrapper = styled.div`
    display: flex;
    padding: 1rem;
    transition: 0.2s;

    &:hover {
        background-color: ${({ theme }) => theme.colors.border};
    }
`;
