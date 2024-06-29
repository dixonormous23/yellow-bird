import { StyledAvatar } from "./styles";

interface AvatarProps {
    src: string;
    alt?: string;
    size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt = "", size = 50 }) => {
    return <StyledAvatar src={src} alt={alt} $size={size} />;
}