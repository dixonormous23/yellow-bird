import { useState, useEffect, createContext, useContext, } from "react";
import { useRouter } from "next/router";
import { deleteCookie, hasCookie, setCookie } from 'cookies-next';

import { auth, db, onAuthStateChanged } from "@/firebase";
import { ProviderProps, UserInterface } from "../../@types";
import { USER_COOKIE_KEY } from "@/constants";

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
        onAuthStateChanged(auth, async (user) => {
            if (!user) return setInitialized(true);
        
            const userData = await db.get<UserInterface>(`/users/${user.uid}`);
            const token = await user.getIdToken();

            setUser({ ...user, ...userData });
            setCookie(USER_COOKIE_KEY, token);

            setInitialized(true);
        })
    }, []);

    const signOut = () => {
        deleteCookie(USER_COOKIE_KEY);
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
