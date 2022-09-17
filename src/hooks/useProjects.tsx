import { db } from 'data/firebaseConfig';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useState, useEffect, useCallback } from 'react';
import { UserAuth } from 'store/authContext';
import { Project } from 'types/KanbanTypes';

const useProject = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { user } = UserAuth();

	const fetchProjects = useCallback(async () => {
		if (user) {
			let data = [] as Project[];
			setIsLoading(true);
			const docRef = collection(db, `users/${user.uid}/projects`);
			try {
				const docSnap = await getDocs(docRef);
				docSnap.forEach(doc => {
					const item = {
						projectId: doc.id,
						...doc.data(),
					};

					data.push(item as Project);
				});
				if (data) {
					setProjects(data);
				}
				setError(null);
			} catch (error: unknown) {
				if (error instanceof Error) setError(error);
			}
			setIsLoading(false);
		}
	}, []);

	const deleteProject = async (id: string) => {
		setProjects(prevState => prevState.filter(({ projectId }) => id !== projectId));
		const docRef = doc(db, `users/${user && user.uid}/projects/${id}`);
		await deleteDoc(docRef);
	};

	useEffect(() => {
		fetchProjects();
	}, []);

	return { projects, isLoading, deleteProject, error };
};

export default useProject;
