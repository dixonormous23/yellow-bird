import styled from "styled-components";
import { breakpoint } from "@/styles/utils";
import { formButtonStyles } from "@/components/common";

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

    ${breakpoint('mobile')} {
        text-align: center;
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

export const GetStartedButton = styled.button`
    ${formButtonStyles};
    min-width: 150px;
    background-color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
`;