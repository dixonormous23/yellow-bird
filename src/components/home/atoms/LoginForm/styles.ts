import Link from "next/link";
import styled, { keyframes, css } from "styled-components";

const borderAnimation = keyframes`
    from {
        width: calc(0%);
    }

    to {
        width: calc(100% - 2rem);
    }
`;

export const LoginFormWrapper = styled.div`
    position: relative;
`;

export const HeroTitle = styled.h1`
    font-size: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
    font-family: ${({ theme }) => theme.fontFamily.secondary};

    /* &::after {
        content: "";
        display: flex;
        width: calc(100% - 2rem);
        height: 5px;
        border-radius: 10px;
        margin-top: 1rem;
        background-color: ${({ theme }) => theme.colors.primary};;
        animation: 0.5s ease ${borderAnimation};
    } */
`;

export const HeroSubTitle = styled.p`
    text-align: center;
    margin: 0;
    font-style: italic;
    font-weight: 500;
    opacity: 0.8;
    color: ${({ theme }) => theme.colors.secondary};
`;

export const RegisterAccountWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const formButtonStyles = css`
    text-decoration: none;
    color: white;
    font-size: 1rem;
    padding: 0.5rem 2rem;
    font-weight: 500;
    border-radius: 20px;
    transition: 0.2s;
    cursor: pointer;
    text-align: center;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.secondary};

    &:hover:not([disabled]) {
        background-color: white;
        color: ${({ theme }) => theme.colors.secondary};
    }

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

export const GetStartedButton = styled.button`
    ${formButtonStyles};
    min-width: 150px;
    background-color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
`;