import Link from "next/link";
import styled, { keyframes, css } from "styled-components";

export const HomePageContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 96px;
    padding-bottom: 96px;
    min-height: 80vh;
    background-position: center center;
    background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)) center center / cover no-repeat, url(https://zone-ui.vercel.app/assets/background/overlay_1.jpg);
`;

const borderAnimation = keyframes`
    from {
        width: calc(0%);
    }

    to {
        width: calc(100% - 2rem);
    }
`;

const fadeInAnimation = keyframes`
    0% {
        left: 200px;
        opacity: 0;
    }

    100% {
        left: 0px;
        opacity: 1;
    }
`;

export const WelcomeActionsContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    width: 100%;
    margin-inline: auto;
    overflow: hidden;
    max-width: 450px;
    border-radius: 16px;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(145, 158, 171, 0.24) -24px 24px 72px -8px;
    margin-bottom: 5rem;
    transition: 0.2s;
    animation: 1s ease ${fadeInAnimation} forwards;
`;

export const LoginFormWrapper = styled.div`
    position: relative;
`;

export const FormWrapper = styled.form`
    margin-top: 3rem;
    gap: 1.5rem;
    display: flex;
    flex-direction: column;
`;

export const HeroTitle = styled.h1`
    font-size: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
    font-family: ${({ theme }) => theme.fontFamily.secondary};

    &::after {
        content: "";
        display: flex;
        width: calc(100% - 2rem);
        height: 5px;
        border-radius: 10px;
        margin-top: 1rem;
        background-color: ${({ theme }) => theme.colors.primary};;
        animation: 0.5s ease ${borderAnimation};
    }
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

export const GetStartedButton = styled(Link)`
    ${formButtonStyles};
    min-width: 150px;
    background-color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
`;