export type AuthContextValue = {
    user: {} | null | false;
    registerUser: (email: string, password: string, name: string) => void;
    loginUser: (email: string, password: string) => void;
    logout: () => void
}