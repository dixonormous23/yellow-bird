import styled from "styled-components";

export const StyledAvatar = styled.img<{ $size?: number }>`
    object-fit: contain;
    border-radius: 50%;
    overflow: hidden;
    width: ${(props) => props.$size}px;
    height: ${(props) => props.$size}px;
`;