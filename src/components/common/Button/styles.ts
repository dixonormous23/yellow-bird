import styled from "styled-components";
import { ButtonTheme } from ".";

interface StyledButtonProps {
    $theme: ButtonTheme;
};

export const StyledButton = styled.button<StyledButtonProps>`
    text-decoration: none;
    color: white;
    font-size: 1rem;
    padding: 0.5rem 2rem;
    font-weight: 500;
    border-radius: 20px;
    transition: 0.2s;
    cursor: pointer;
    text-align: center;
    color: ${(props) => props.$theme === 'primary' ? props.theme.colors.surface : props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors[props.$theme]};
    background-color: ${(props) => props.theme.colors[props.$theme]};

    &:hover:not([disabled]) {
        background-color: white;
        color: ${(props) => props.theme.colors[props.$theme]};
    }

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;