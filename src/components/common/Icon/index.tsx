import { useMemo } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";

const EmptyChatIcon = dynamic(() => import('./icons/EmptyChatIcon'));
const CloseIcon = dynamic(() => import('./icons/CloseIcon'));
const PlusIcon = dynamic(() => import('./icons/PlusIcon'));
const UploadIcon = dynamic(() => import('./icons/UploadIcon'));

export type IconType = 'emptyChat' | 'close' | 'plus' | 'upload';

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
        fill: ${(props) => props.fill ?? props.theme.colors.secondary};
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
            default:
                return null;
        }
    }, [variant]);

    return <IconWrapper {...rest}>{icon}</IconWrapper>;
}
