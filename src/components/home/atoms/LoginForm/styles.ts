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
    font-family: ${({ theme }) => theme.fontFamily.primary};

    text-align: center;
`;

export const RegisterAccountWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
