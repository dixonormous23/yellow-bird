import styled from "styled-components";

export const InputFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: -webkit-fill-available;
`;

export const StyledInputField = styled.input`
    font-size: 1rem;
    padding: 1rem;
    background-color: rgba(145, 158, 171, 0.08);
    border: none;
    outline: none;
    border-radius: 10px;
    font-family: inherit;
    line-height: 1.5;

    &:disabled {
        background-color: rgba(145, 158, 171, 0.4);
        opacity: 0.5;
    }
`;

export const FormLabel = styled.label`
    padding-left: 0.5rem;
    padding-bottom: 0.5rem;
    font-weight: bold;
    opacity: 0.7;
`;