export type AuthContextValue = {
    user: {} | null;
    registerUser: (email: string, password: string) => void;
    loginUser: (email: string, password: string) => void;
    logout: () => void
}