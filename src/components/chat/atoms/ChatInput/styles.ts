import { breakpoint } from "@/styles/utils";
import styled from "styled-components";

export const ChatInputContainer = styled.div`
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4375em;
    box-sizing: border-box;
    position: relative;
    display: inline-flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    padding: 1rem 0.5rem;
    position: absolute;
    bottom: 0;
    width: -webkit-fill-available;
    background: white;
    flex-shrink: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const InputInnerContainer = styled.div<{ $channelName: string }>`
    display: flex;
    flex-grow: 1;
    align-items: center;
    width: 100%;

    span[contenteditable]:empty:focus::before,
    span[contenteditable]:empty::before {
        color: gray;
        content: "${(props) => `Message #${props.$channelName}`}";
    }
`;

export const InputElementsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    margin-inline: 0.2rem;
`;

export const InputActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
`;

export const StyledChatInput = styled.span<{ $currentValue?: string; }>`
    padding-inline: 1rem;
    font-size: 1rem;
    position: relative;
    flex-grow: 1;
    border: none;
    outline: none;
    resize: none;
    cursor: text;
    background: rgba(0, 0, 0, 0.05);
    margin-inline: 1rem;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    font-family: ${({ theme }) => theme.fontFamily.primary};
`;

export const SubmitButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-right: 0.5rem;
`;

export const StyledTypingIndicator = styled.label`
    position: absolute;
    top: -24px;
    right: -50px;
    font-size: 0.9rem;
    font-style: italic;
    font-weight: 300;
    background: white;
    width: 100%;
    z-index: 1;
    color: gray;
`;

export const InputActionButton = styled.div`
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding-left: 1rem;
`;

export const UploadFileInput = styled.input`
    display: none;
`;

export const EmojiPickerWrapper = styled.div<{ $open: boolean }>`
    position: absolute;
    bottom: 50px;
    left: 50px;
    transition: 0.2s;
    z-index: 100;
    opacity: ${(props) => props.$open ? 1 : 0};
    pointer-events: ${(props) => props.$open ? 'all' : 'none'};

    aside {
        z-index: inherit;
    }
`;
