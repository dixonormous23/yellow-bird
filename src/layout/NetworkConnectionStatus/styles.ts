import styled, { keyframes } from "styled-components";

const offlineAnim = keyframes`
    from { top: -60px };
    to { top: 25px };
`;

const onlineAnim = keyframes`
    from { top: 25px };
    to { top: -60px };
`;

export const NetworkStatusChip = styled.div<{ $online?: boolean; }>`
    position: absolute;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 25px;
    padding: 0.3rem 2rem;
    min-width: 200px;
    color: ${({ theme }) => theme.colors.surface};
    animation-delay: ${(props) => props.$online ? 1 : 0}s;
    animation: 1s ease ${(props) => props.$online ? onlineAnim : offlineAnim} forwards;
    background-color: ${(props) => props.theme.colors[props.$online ? 'success' : 'error']};
`;