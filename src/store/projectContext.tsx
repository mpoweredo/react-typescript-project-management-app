import { doc, getDoc } from 'firebase/firestore';
import { createContext, PropsWithChildren, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../data/firebaseConfig';
import { updateData } from '../helpers/updateData';
import { Kanban, NewTaskData, Project } from '../types/KanbanTypes';
import { ProjectContextType } from '../types/projectContextType';
import { UserAuth } from './authContext';
import { v4 as uuidv4 } from 'uuid';

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

	const addNewTask = (NewTaskData: NewTaskData) => {
		const newTask = {
			id: uuidv4(),
			title: NewTaskData.taskTitle,
		};

		const updatedData = [...project!.kanban] as Kanban;

		updatedData[NewTaskData.taskColumn].tasks = [...updatedData[NewTaskData.taskColumn].tasks, newTask];

		const newData = {
			...project,
			kanban: updatedData,
		} as Project;

		updateProject(newData);
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

	return <ProjectContext.Provider value={{ updateProject, project, loading, error, addNewTask }}>{children}</ProjectContext.Provider>;
};

export const ProjectData = () => {
	return useContext(ProjectContext) as ProjectContextType;
};
