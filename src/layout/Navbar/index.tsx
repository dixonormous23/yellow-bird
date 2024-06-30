import { useAuthContext } from "@/context/AuthContext";
import { NavbarContainer, NavbarInnerContainer } from "./styles";

export const Navbar = () => {
    const { signOut } = useAuthContext();

    const onClick = () => signOut();

    return (
        <NavbarContainer>
            <NavbarInnerContainer>
                <button onClick={onClick}>Sign out</button>
            </NavbarInnerContainer>
        </NavbarContainer>
    );
};
