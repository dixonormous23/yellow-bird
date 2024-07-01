import { CSSProperties } from "styled-components";
import { StyledButton } from "./styles";

type ButtonType = "button" | "submit" | "reset" | undefined;
export type ButtonTheme = 'primary' | 'secondary';

interface ButtonProps {
    label: string;
    type?: ButtonType;
    theme?: ButtonTheme;
    disabled?: boolean;
    sx?: CSSProperties;
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
    label,
    type = 'button',
    disabled = false,
    theme = 'primary',
    sx = {},
    onClick = () => {}
}) => {
    return (
        <StyledButton
            type={type}
            disabled={disabled}
            $theme={theme}
            style={{ ...sx }}
            onClick={onClick}
        >
            {label}
        </StyledButton>
    );
};
