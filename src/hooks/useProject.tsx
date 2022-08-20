import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../data/firebaseConfig';
import { UserAuth } from '../store/authContext';
import { Project } from '../types/KanbanTypes';

const useProject = (projectId: string) => {
	const { user } = UserAuth();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | {}>(null);
	const [project, setProject] = useState<Project | null>(null);

	useEffect(() => {
		const fetchProjects = async () => {
			setLoading(true);
			try {
				if (user) {
					setError(null);
					const docRef = doc(db, `users/${user.uid}/projects/${projectId}`);
					const docSnap = await getDoc(docRef);
					setProject(docSnap.data() as Project);
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
		setProject,
	};
};

export default useProject;
