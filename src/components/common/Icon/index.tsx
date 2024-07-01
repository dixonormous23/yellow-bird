import { useMemo } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";

// Dynamically load in the SVGs currently being requested
const BackIcon = dynamic(() => import('./icons/BackIcon'));
const CopyIcon = dynamic(() => import('./icons/CopyIcon'));
const PlusIcon = dynamic(() => import('./icons/PlusIcon'));
const MoreIcon = dynamic(() => import('./icons/MoreIcon'));
const EmojiIcon = dynamic(() => import('./icons/EmojiIcon'));
const CloseIcon = dynamic(() => import('./icons/CloseIcon'));
const UploadIcon = dynamic(() => import('./icons/UploadIcon'));
const JoinChatIcon = dynamic(() => import('./icons/JoinChatIcon'));
const EmptyChatIcon = dynamic(() => import('./icons/EmptyChatIcon'));
const UploadFileIcon = dynamic(() => import('./icons/UploadFileIcon'));
const SendMessageIcon = dynamic(() => import('./icons/SendMessageIcon'));

export type IconType =
    'emptyChat' |
    'close' |
    'plus' |
    'upload' |
    'joinChat' |
    'more' |
    'sendMessage' |
    'back' |
    'emoji' |
    'uploadFile' |
    'copy';

export interface StyledIconProps {
    size?: number;
    fill?: string;
}

export interface IconProps extends StyledIconProps {
    variant: IconType;
};

const IconWrapper = styled.div<StyledIconProps>`
    display: flex;

    svg {
        fill: ${(props) => props.fill ?? props.theme.colors.primary};
        width: ${(props) => props.size ?? 25}px;
        height: ${(props) => props.size ?? 25}px; 
    }
`;

export const Icon: React.FC<IconProps> = ({ variant, ...rest }) => {
    const icon = useMemo(() => {
        switch (variant) {
            case 'emptyChat':
                return <EmptyChatIcon />;
            case 'close':
                return <CloseIcon />;
            case 'plus':
                return <PlusIcon />;
            case 'upload':
                return <UploadIcon />;
            case 'joinChat':
                return <JoinChatIcon />;
            case 'more':
                return <MoreIcon />;
            case 'sendMessage':
                return <SendMessageIcon />;
            case 'back':
                return <BackIcon />;
            case 'emoji':
                return <EmojiIcon />;
            case 'uploadFile':
                return <UploadFileIcon />;
            case 'copy':
                return <CopyIcon />;
            default:
                return null;
        }
    }, [variant]);

    return <IconWrapper {...rest}>{icon}</IconWrapper>;
}
