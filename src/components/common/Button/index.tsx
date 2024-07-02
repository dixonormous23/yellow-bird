import { CSSProperties } from "styled-components";
import { StyledButton } from "./styles";

type ButtonType = "button" | "submit" | "reset" | undefined;
export type ButtonTheme = 'primary' | 'secondary';

interface ButtonProps {
    label: string;
    type?: ButtonType;
    theme?: ButtonTheme;
    disabled?: boolean;
    // Style overrides for any edge case styles, saves on having to define one-off props
    sx?: CSSProperties;
    onClick?: () => void;
    'data-cy'?: string;
}

export const Button: React.FC<ButtonProps> = ({
    label,
    type = 'button',
    disabled = false,
    theme = 'primary',
    sx = {},
    onClick = () => {},
    ...rest
}) => {
    return (
        <StyledButton
            type={type}
            disabled={disabled}
            $theme={theme}
            style={{ ...sx }}
            onClick={onClick}
            {...rest}
        >
            {label}
        </StyledButton>
    );
};
