import { css } from "styled-components";

export const sharedButtonStyles = css`
    display: flex;
    align-items: center;
    font-weight: 500;
    transition: 0.2s;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary};

    &:hover:not([disabled]) {
        background-color: white;
        color: ${({ theme }) => theme.colors.primary};

        svg {
            fill: ${({ theme }) => theme.colors.primary};
        }
    }

    &:disabled {
        opacity: 0.6;
        cursor: default;
    }
`;
