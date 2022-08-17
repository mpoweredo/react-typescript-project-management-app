import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../data/firebaseConfig';
import { UserAuth } from '../store/authContext';

const useProject = (projectId: string) => {
	const { user } = UserAuth();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | {}>(null);
	const [project, setProject] = useState<DocumentData | undefined>(undefined);

	useEffect(() => {
		const fetchProjects = async () => {
			setLoading(true);
			try {
				if (user) {
					setError(null);
					const docRef = doc(db, `users/${user.uid}/projects/${projectId}`);
					const docSnap = await getDoc(docRef);
					console.log(docSnap.data());
                    setProject(docSnap.data())
				}
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				}
			}
			setLoading(false);
		};

		fetchProjects();
	}, []);

	return {
		loading,
		error,
		project,
	};
};

export default useProject;
