import { doc, getDoc } from 'firebase/firestore';
import { createContext, PropsWithChildren, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from 'data/firebaseConfig';
import { updateData } from 'helpers/updateData';
import { Kanban, NewTaskData, Project } from 'types/KanbanTypes';
import { ProjectContextType, UpdatedData } from 'types/projectContextType';
import { UserAuth } from './authContext';
import { v4 as uuidv4 } from 'uuid';
import { CalendarEvent } from 'types/CalendarTypes';

const ProjectContext = createContext<ProjectContextType | false>(false);

export const ProjectContextProvider = ({ children }: PropsWithChildren) => {
	const [project, setProject] = useState<Project | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | {}>(null);
	const { projectId } = useParams();
	const { user } = UserAuth();

	const getUpdatedProject = (updatedData: UpdatedData) => {
		return {
			...project,
			...updatedData,
		} as Project;
	};

	const updateProject = (newData: Project) => {
		if (newData) {
			setProject(newData);
			updateData(newData, projectId!, user);
		}
	};

	const deleteColumn = (index: number) => {
		const updatedData = [...project!.kanban] as Kanban;
		updatedData.splice(index, 1);

		updateProject(getUpdatedProject({ kanban: updatedData }));
	};

	const deleteTask = (taskId: string, columnIndex: number) => {
		const updatedData = [...project!.kanban] as Kanban;
		updatedData[columnIndex].tasks = updatedData[columnIndex].tasks.filter(({ id }) => id !== taskId);

		updateProject(getUpdatedProject({ kanban: updatedData }));
	};

	const addNewTask = (NewTaskData: NewTaskData) => {
		const newTask = {
			id: uuidv4(),
			title: NewTaskData.taskTitle,
			description: NewTaskData.taskDescription || '*Click to add description!*',
			priority: NewTaskData.taskPriority,
			subtasks: [],
		};

		const updatedData = [...project!.kanban] as Kanban;

		updatedData[NewTaskData.taskColumn].tasks = [...updatedData[NewTaskData.taskColumn].tasks, newTask];

		updateProject(getUpdatedProject({ kanban: updatedData }));
	};

	const updateTask = (NewTaskData: NewTaskData) => {
		const updatedData = [...project!.kanban] as Kanban;
		const selectedTask = { ...updatedData[NewTaskData.taskColumn].tasks[NewTaskData.taskIndex!] };
		const updatedTask = {
			...selectedTask,
			title: NewTaskData.taskTitle,
			priority: NewTaskData.taskPriority,
			description: NewTaskData.taskDescription,
		};

		updatedData[NewTaskData.taskColumn].tasks[NewTaskData.taskIndex!] = updatedTask;

		updateProject(getUpdatedProject({ kanban: updatedData }));
	};

	const addNewColumn = (title: string) => {
		const updatedData = [...project!.kanban, { title, id: uuidv4(), tasks: [] }] as Kanban;

		updateProject(getUpdatedProject({ kanban: updatedData }));
	};

	const addNewEvent = (newEvent: CalendarEvent) => {
		const updatedData = [...project!.calendar, newEvent];
		updateProject(getUpdatedProject({ calendar: updatedData }));
	};

	const updateEvent = (updatedEvent: CalendarEvent) => {
		const updatedData = [...project!.calendar];
		const selectedEvent = updatedData.findIndex(({ id }) => id === updatedEvent.id);
		updatedData[selectedEvent] = updatedEvent;

		updateProject(getUpdatedProject({ calendar: updatedData }));
	};

	const deleteEvent = (eventId: string) => {
		const updatedData = [...project!.calendar.filter(({ id }) => id !== eventId)];
		updateProject(getUpdatedProject({ calendar: updatedData }));
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

	return (
		<ProjectContext.Provider
			value={{
				updateProject,
				updateEvent,
				deleteEvent,
				deleteColumn,
				addNewColumn,
				addNewEvent,
				project,
				loading,
				error,
				addNewTask,
				deleteTask,
				updateTask,
				getUpdatedProject,
			}}>
			{children}
		</ProjectContext.Provider>
	);
};

export const ProjectData = () => {
	return useContext(ProjectContext) as ProjectContextType;
};
