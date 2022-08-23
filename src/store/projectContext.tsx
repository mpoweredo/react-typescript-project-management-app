import { doc, getDoc } from 'firebase/firestore';
import { createContext, PropsWithChildren, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../data/firebaseConfig';
import { updateData } from '../helpers/updateData';
import { Project } from '../types/KanbanTypes';
import { ProjectContextType } from '../types/projectContextType';
import { UserAuth } from './authContext';

const ProjectContext = createContext<ProjectContextType | false>(false);

export const ProjectContextProvider = ({ children }: PropsWithChildren) => {
	const [project, setProject] = useState<Project | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | {}>(null);
	const { projectId } = useParams();
	const { user } = UserAuth();

	const updateProject = (newData: Project) => {
		setProject(newData);
		updateData(newData, projectId!, user);
	};

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

	return <ProjectContext.Provider value={{ updateProject, project, loading, error }}>{children}</ProjectContext.Provider>;
};

export const ProjectData = () => {
	return useContext(ProjectContext) as ProjectContextType;
};
