import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from { opacity: 0 };
    to { opacity: 1 };
`;

export const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    cursor: pointer;
    background: rgba(0,0,0,0.6);
    animation: 0.3s ease ${fadeIn} forwards;
    z-index: 100;
    pointer-events: all;
`;

export const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    background-color: white;
    display: flex;
    flex-direction: column;
    animation: 0.3s ease ${fadeIn} forwards;
    z-index: 101;
    pointer-events: all;
`;

export const ModalTitleContainer = styled.div`
    padding: 1.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 4rem;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    strong {
        font-size: 1.3rem;
    }
`;

export const CloseModalButton = styled.button`
    background-color: transparent;
    cursor: pointer;
    border: none;
    pointer-events: all;
    display: flex;
`;

export const ModalBodyContainer = styled.div`
    padding-inline: 2rem;
`;
