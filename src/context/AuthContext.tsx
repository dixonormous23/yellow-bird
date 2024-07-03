import { useState, useEffect, createContext, useContext, } from "react";
import { useRouter } from "next/router";
import { deleteCookie, setCookie } from 'cookies-next';

import { auth, db, onAuthStateChanged } from "@/firebase";
import { CYPRESS_COOKIE, USER_COOKIE_KEY } from "@/constants";
import { ProviderProps, UserInterface } from "../../@types";

export interface AuthContextInterface {
    user: UserInterface | null;
    initialized: boolean;
    signOut: () => void;
}

export const AuthContext = createContext(undefined as unknown as AuthContextInterface);

export const AuthContextProvider: React.FC<ProviderProps> = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState<UserInterface | null>(null);
    const [initialized, setInitialized] = useState<boolean>(false);

    useEffect(() => {
        // This fires when Firebase detects an update in user credentials, e.g logs in or no auth user present
        onAuthStateChanged(auth, async (user) => {
            if (!user) return setInitialized(true);
        
            const userData = await db.get<UserInterface>(`/users/${user.uid}`);
            const token = await user.getIdToken();

            setUser({ ...user, ...userData });

            // Set token for server side auth
            setCookie(USER_COOKIE_KEY, token);
            // Set token for Cypress test suite
            setCookie(CYPRESS_COOKIE, user.uid);
            setInitialized(true);
        })
    }, []);

    const signOut = () => {
        deleteCookie(USER_COOKIE_KEY);
        deleteCookie(CYPRESS_COOKIE);
        auth.signOut();
        router.replace('/');
    };

    return (
        <AuthContext.Provider value={{ user, initialized, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextInterface => {
    return useContext(AuthContext);
};
