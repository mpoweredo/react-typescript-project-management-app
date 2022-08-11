import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../data/firebaseConfig';
import { User as FirebaseUser } from 'firebase/auth';
import { db } from '../data/firebaseConfig';
import { AuthContextValue } from '../types/authContextType';
import { doc, setDoc } from 'firebase/firestore';

const UserContext = createContext<AuthContextValue | null>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<FirebaseUser | null>(null);

	const registerUser = async (email: string, password: string, name: string) => {
		try {
			const response = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', response.user.uid), {
                email,
				name
            })
            console.log(response)
		} catch (e: unknown) {
            // TODO: BETTER ERROR HANDLING
			if (e instanceof Error) {
				console.log(e.message);
			}
		}
	};

	const loginUser = (email: string, password: string) => {
		signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		signOut(auth);
		setUser(null)
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<UserContext.Provider
			value={{
				registerUser,
				loginUser,
				logout,
				user,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(UserContext) as AuthContextValue;
};
