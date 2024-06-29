import { User } from "firebase/auth";

export interface ProviderProps {
    children: React.ReactNode;
}

export interface UserInterface extends Partial<User> {
    uid: string;
    username: string;
    avatar: string;
}