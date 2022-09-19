import { Calendar, CalendarEvent } from './CalendarTypes';
import { Kanban, NewTaskData, Project } from './KanbanTypes';

type UpdatedData = {
	[key: string]: Calendar | Kanban;
}

type ProjectContextType = {
	project: Project | null;
	error: null | {};
	loading: boolean;
	getUpdatedProject: (updatedData: UpdatedData) => Project
	updateProject: (arg0: Project) => void;
	addNewTask: (NewTaskData: NewTaskData) => void;
	addNewColumn: (arg0: string) => void;
	deleteColumn: (index: number) => void;
	deleteTask: (taskId: string, columnIndex: number) => void;
	updateTask: (NewTaskData: NewTaskData) => void;
	addNewEvent: (newEvent: CalendarEvent) => void;
	updateEvent: (updatedEvent: CalendarEvent) => void;
	deleteEvent: (eventId: string) => void;
};

export type { ProjectContextType, UpdatedData };
