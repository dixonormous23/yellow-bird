import { StyledInputField, FormLabel, InputFieldContainer } from "./styles";

type InputType = 'text' | 'email' | 'number' | 'password';

interface InputFieldProps {
    placeholder: string;
    autoComplete?: string;
    value?: string;
    name?: string;
    label?: string;
    required?: boolean;
    type?: InputType;
    'data-cy'?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
    name,
    type = 'text',
    autoComplete,
    value,
    label,
    placeholder,
    required = false,
    onChange,
    ...rest
}) => {
    return (
        <InputFieldContainer>
            {label ? <FormLabel>{label}</FormLabel> : null}
            <StyledInputField
                name={name}
                type={type}
                value={value}
                required={required}
                autoComplete={autoComplete}
                placeholder={placeholder}
                onChange={onChange}
                {...rest}
            />
        </InputFieldContainer>
    );
};
