import styled from "styled-components";

export const ChatInputContainer = styled.div`
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4375em;
    box-sizing: border-box;
    position: relative;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    padding-left: 8px;
    padding-right: 8px;
    height: 56px;
    flex-shrink: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const InputInnerContainer = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
`;

export const StyledChatInput = styled.span<{ $currentValue?: string; }>`
    width: 100%;
    padding-left: 1rem;
    font-size: 1rem;
    position: relative;
    flex-grow: 1;
    border: none;
    outline: none;
    resize: none;
    font-family: ${({ theme }) => theme.fontFamily.primary};
`;