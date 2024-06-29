import { StyledDividerText } from "./styles";

interface DividerTextProps {
    text: string;
    gutters?: boolean;
};

export const DividerText: React.FC<DividerTextProps> = ({ text, gutters = false }) => {
    return (
        <StyledDividerText $gutters={gutters}>
            <span>{text}</span>
        </StyledDividerText>
    );
};
