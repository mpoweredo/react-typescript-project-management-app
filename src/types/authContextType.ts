import { User as FirebaseUser } from 'firebase/auth'

export type Name = {
    name: string;
}

export type AuthContextValue = {
    user: FirebaseUser & Name | null | false;
    registerUser: (email: string, password: string, name: string) => void;
    loginUser: (email: string, password: string) => void;
    logout: () => void
}