import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../data/firebaseConfig';
import { User as FirebaseUser } from 'firebase/auth';
import { db } from '../data/firebaseConfig';
import { AuthContextValue, Name } from '../types/authContextType';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';

const UserContext = createContext<AuthContextValue | false>(false);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<(FirebaseUser & Name) | null | false>(null);

	const registerUser = async (email: string, password: string, name: string) => {
		try {
			const response = await createUserWithEmailAndPassword(auth, email, password);
			const docRef = doc(db, 'users', response.user.uid)
			await setDoc(docRef, {
				email,
				name,
			});
		} catch (e: unknown) {
			// TODO: BETTER ERROR HANDLING
			if (e instanceof Error) {
				console.log(e.message);
			}
		}
	};

	const loginUser = async (email: string, password: string) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {}
	};

	const logout = () => {
		signOut(auth);
		setUser(null);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async currentUser => {
			if (currentUser) {
				const docRef = doc(db, 'users', currentUser.uid);
				const docSnap = await getDoc(docRef);
				const fetchedUserData = docSnap.data();

				const userData: FirebaseUser & Name = {
					...currentUser,
					name: fetchedUserData!.name,
				};

				setUser(userData);
			} else {
				setUser(false);
			}

			console.log(currentUser);
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
