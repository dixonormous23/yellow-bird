import styled from "styled-components";

export const StyledDividerText = styled.div<{ $gutters?: boolean; }>`
    font-style: italic;
    width: -webkit-fill-available;
    text-align: center;
    display: flex;
    align-items: center;
    margin-block: ${(props) => props.$gutters ? 2 : 0}rem;
    
    &::before {
        content: "";
        width: 100%;
        border-top: thin solid rgba(0, 0, 0, 0.12);
    }

    &::after {
        content: "";
        width: 100%;
        border-top: thin solid rgba(0, 0, 0, 0.12);
    }
    
    span {
        padding-inline: 1rem;
    }
`;