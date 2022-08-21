import { User as FirebaseUser } from 'firebase/auth';

type Name = {
	name: string;
};

type User = (FirebaseUser & Name) | null | false;

type AuthContextValue = {
	user: User;
	registerUser: (email: string, password: string, name: string) => void;
	loginUser: (email: string, password: string) => void;
	logout: () => void;
};

export type { AuthContextValue, User, Name };
