import styled from "styled-components";

export const NavbarContainer = styled.nav`
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: -webkit-fill-available;
    min-height: 80px;
`;

export const NavbarInnerContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin-inline: auto;
    padding-inline: 2rem;
    color: ${({ theme }) => theme.colors.primary};
    max-width: ${({ theme }) => theme.widths.maxContent};
`;