import { User } from "firebase/auth";

export interface ProviderProps {
    children: React.ReactNode;
}

export interface UserInterface extends Partial<User> {
    username: string;
    avatar: string;
}

export enum RouteAuth {
    LOGGED_OUT = 'logged_out',
    LOGGED_IN = 'logged_in'
}