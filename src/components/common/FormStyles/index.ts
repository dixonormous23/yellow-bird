import { breakpoint } from "@/styles/utils";
import styled, { keyframes, css } from "styled-components";

const fadeInAnimation = keyframes`
    0% {
        top: 100px;
        opacity: 0;
    }

    100% {
        top: 0px;
        opacity: 1;
    }
`;


export const FormPageContainer = styled.section`
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

export const FormContainer = styled.div`
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

    ${breakpoint('mobile')} {
        width: auto;
    };

`;

export const StyledForm = styled.form<{ $gutter?: boolean; }>`
    margin-top: ${(props) => props.$gutter ? 3 : 0}rem;
    gap: 1.5rem;
    display: flex;
    flex-direction: column;
`;

export const FormSubmitContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
`;

export const formButtonStyles = css`
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

export const SubmitButton = styled.button`
    ${formButtonStyles};
    min-width: 220px;
`;

export const SubmissionError = styled.strong`
    color: red;
    text-align: center;
`;