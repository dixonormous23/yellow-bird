import { useState, useEffect, createContext, useContext, useCallback } from "react";

import { auth, db, onAuthStateChanged } from "@/firebase";
import { ProviderProps, UserInterface } from "../../@types";
import { useRouter } from "next/router";

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
            setUser((prev) => ({
                ...prev,
                ...user,
                ...userData
            }));
            setInitialized(true);
        })
    }, []);

    const signOut = () => {
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
