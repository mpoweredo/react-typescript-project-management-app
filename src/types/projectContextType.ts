import { Calendar, CalendarEvent, NewCalendarEvent } from './CalendarTypes';
import { Kanban, NewSubtaskData, NewTaskData, Project, SubtaskIndexes } from './KanbanTypes';

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
	addNewEvent: (newEvent: NewCalendarEvent) => void;
	updateEvent: (updatedEvent: CalendarEvent) => void;
	deleteEvent: (eventId: string) => void;
	addNewSubtask: (newSubtaskData: NewSubtaskData, indexes: SubtaskIndexes) => void;
	changeSubtaskStatus: (isTaskCompleted: boolean , indexes: SubtaskIndexes) => void;
	changeSubtaskTitle: (newSubtaskTitle: string, indexes: SubtaskIndexes) => void
};

export type { ProjectContextType, UpdatedData };
