import { css } from "styled-components";

export const sharedListItemStyles = css`
    display: flex;
    align-items: center;
    position: relative;
    padding: 0.3rem 1rem;
    transition: 0.2s;
    cursor: pointer;
    margin-bottom: 1rem;
    margin-inline: 0.5rem;
    border-radius: 10px;
        
    &:hover {
        background-color: rgba(0,0,0,0.05);

        button {
            opacity: 1;
        }
    };
`;

export const sharedButtonStyles = css`
    display: flex;
    align-items: center;
    font-weight: 500;
    transition: 0.2s;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.secondary};

    &:hover:not([disabled]) {
        background-color: white;
        color: ${({ theme }) => theme.colors.secondary};

        svg {
            fill: ${({ theme }) => theme.colors.secondary};
        }
    }

    &:disabled {
        opacity: 0.6;
        cursor: default;
    }
`;
