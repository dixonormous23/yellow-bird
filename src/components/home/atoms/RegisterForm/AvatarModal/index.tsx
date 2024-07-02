import React, { useEffect, useRef, useState } from "react";

import { useUploadPhoto } from "@/hooks/useUploadFile";
import { DEFAULT_AVATAR } from "@/constants";
import { Icon, Modal } from "@/components/common";
import {
    AvatarUploadPlaceholder,
    DefaultAvatarImage,
    DefaultAvatarsContainer,
    FileUploadInput,
    SaveAvatarButton,
    SaveAvatarContainer,
    SelectedAvatar,
    UserAvatarWrapper
} from "./styles";

interface AvatarModalProps {
    open: boolean;
    handleClose: () => void;
    handleSelectedAvatar: (avatar: string | null) => void;
}

interface DefaultAvatarsProps {
    onClick: (image: string) => void;
}

const DefaultAvatars: React.FC<DefaultAvatarsProps> = ({ onClick }) => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        // Fetches and returns local files for default avatars
        const fetchAvatars = async () => {
            const imageFiles = await fetch('/api/get-default-avatars');
            const images = await imageFiles.json();
            const avatars = images?.avatars?.map((file: string) => `https://yellow-bird.vercel.app/avatars/${file}`)
            setImages(avatars);
        };

        fetchAvatars();
    }, []);

    return (
        <>
            {images?.map((image, index) => (
                <React.Fragment key={image}>
                    <DefaultAvatarImage
                        alt={`avatar-${index}`}
                        src={image}
                        onClick={() => onClick(image)}
                    />
                </React.Fragment>
            ))}
        </>
    );
}

export const AvatarModal: React.FC<AvatarModalProps> = ({ open, handleClose, handleSelectedAvatar }) => {
    const { upload } = useUploadPhoto();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [avatar, setAvatar] = useState<string | null>(null);

    const handleClick = () => {
        inputRef?.current?.click();
    }

    const handleUploadPhoto = async (e: any) => {
        const avatar = await upload(e);
        setAvatar(avatar);
    };

    const handleSelectDefaultAvatar = (image: string) => {
        setAvatar(image);
    };

    const handleSaveAndClose = () => {
        handleSelectedAvatar(avatar);
    };

    return (
        <Modal open={open} title="Upload or choose your avatar" handleClose={handleClose}>
            <UserAvatarWrapper onClick={handleClick}>
                {!avatar ? (
                    <AvatarUploadPlaceholder>
                        <Icon variant="upload" fill="white" />
                    </AvatarUploadPlaceholder>
                ) : (
                    <SelectedAvatar src={avatar ?? DEFAULT_AVATAR} alt="avatar" />
                )}
                <FileUploadInput
                    ref={inputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    id="image-upload"
                    onChange={handleUploadPhoto}
                />
            </UserAvatarWrapper>
            <DefaultAvatarsContainer>
                <DefaultAvatars onClick={handleSelectDefaultAvatar} />
            </DefaultAvatarsContainer>
            <SaveAvatarContainer>
                <SaveAvatarButton disabled={!avatar} onClick={handleSaveAndClose}>Save</SaveAvatarButton>
            </SaveAvatarContainer>
        </Modal>
    );
};
