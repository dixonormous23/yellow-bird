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
    padding: 1rem 0.5rem;
    position: absolute;
    bottom: 0;
    width: -webkit-fill-available;
    z-index: 1;
    background: white;
    flex-shrink: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const InputInnerContainer = styled.div<{ $channelName: string }>`
    display: flex;
    flex-grow: 1;
    align-items: center;

    span[contenteditable]:empty:focus::before,
    span[contenteditable]:empty::before {
        color: gray;
        content: "${(props) => `Message ${props.$channelName}`}";
    }
`;

export const StyledChatInput = styled.span<{ $currentValue?: string; }>`
    width: 100%;
    padding-inline: 1rem;
    font-size: 1rem;
    position: relative;
    flex-grow: 1;
    border: none;
    outline: none;
    resize: none;
    background: rgba(0, 0, 0, 0.05);
    margin-inline: 2rem;
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