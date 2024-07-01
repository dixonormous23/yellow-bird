import styled from "styled-components";

export const FormTitle = styled.h1`
    font-size: 2.5rem;
    margin: 0;
    font-family: ${({ theme }) => theme.fontFamily.secondary};
`;

export const FormSubtitle = styled.p`
    margin-top: 0;
    font-size: 0.9rem;

    span {
        text-decoration: underline;
    }
`;

export const AvatarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

export const UploadAvatarButton = styled.button`
    padding: 0.4rem 1.5rem;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.secondary};

    &:hover {
        color: white;
        background-color: ${({ theme }) => theme.colors.secondary};
    }
`;

export const UserAvatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: contain;
    border: 2px solid rgba(0,0,0,0.2);
`;
