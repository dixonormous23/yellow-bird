import { ProviderProps } from "../../@types";
import { Metadata } from "./Metadata";
import { AppLayoutContainer } from "./styles";

export const AppLayout: React.FC<ProviderProps> = ({ children }) => {
    return (
        <>
            <Metadata />        
            <AppLayoutContainer>
                {children}
            </AppLayoutContainer>
        </>
    );
};
