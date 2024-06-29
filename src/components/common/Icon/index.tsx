import { useMemo } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";

const EmptyChatIcon = dynamic(() => import('./icons/EmptyChatIcon'));

export type IconType = "emptyChat";

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
            default:
                return null;
        }
    }, [variant]);

    return <IconWrapper {...rest}>{icon}</IconWrapper>;
}
