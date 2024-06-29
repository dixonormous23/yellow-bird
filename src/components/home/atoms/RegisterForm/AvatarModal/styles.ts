import styled, { css } from "styled-components";

export const UserAvatarWrapper = styled.div`
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    padding-block: 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const avatarStyles = css`
    width: 120px;
    height: 120px;
    border-radius: 50%;
`;

export const AvatarUploadPlaceholder = styled.div`
    ${avatarStyles};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;
    background-color: ${({ theme }) => theme.colors.secondary};

    &:hover {
        opacity: 0.5;
    };
`;

export const SelectedAvatar = styled.img`
    ${avatarStyles};
    object-fit: contain;
`;

export const DefaultAvatarsContainer = styled.div`
    display: grid;
    row-gap: 2rem;
    grid-template-columns: repeat(4, 1fr);
    padding: 2rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);    
`;

export const DefaultAvatarImage = styled.img`
    width: 80px;
    height: 80px;
    object-fit: contain;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        opacity: 0.6;
    }
`; 

export const FileUploadInput = styled.input`
    display: none;
`;

export const SaveAvatarContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-block: 1rem;
`;

export const SaveAvatarButton = styled.button`
    padding: 0.2rem 3rem;
    border-radius: 10px;
    font-weight: 500;
    font-size: 1rem;
    transition: 0.2s;
    color: white;
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.secondary};

    &:hover:not([disabled]) {
        background-color: white;
        color: ${({ theme }) => theme.colors.secondary};
    }

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;