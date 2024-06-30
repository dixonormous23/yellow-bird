import styled from "styled-components";

export const ChannelActionButton = styled.button`
    width: 20px;
    height: 20px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    display: flex;
    border: 1px solid transparent;
    background-color: transparent;
    cursor: pointer;
    /* pointer-events: none; */
    transition: 0.2s;
    z-index: 1000;

    &:hover {
        border: 1px solid ${({ theme }) => theme.colors.secondary};
    }
`;

export const ActionsWrapper = styled.div<{ $open: boolean; }>`
    position: absolute;
    background-color: white;
    right: -128px;
    z-index: 101;
    bottom: -55px;
    border-radius: 10px;
    padding: 0.5rem;
    transition: 0.2s;
    border: 1px solid ${({ theme }) => theme.colors.secondary};

    opacity: ${(props) => props.$open ? 1 : 0};
    pointer-events: ${(props) => props.$open ? 'all' : 'none'};
`;

export const CopyChannelButton = styled.button`
    border: none;
    padding: 0.3rem 2rem;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s;
    background-color: transparent;

    &:hover {
        background-color: rgba(0,0,0,0.1);
    }

`;
