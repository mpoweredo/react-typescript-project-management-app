import { Calendar } from './CalendarTypes';

type Task = {
	id: string;
	title: string;
	priority: PriorityOptions;
	description: string;
	subtasks: Subtask[];
};

type PriorityOptions = 'high' | 'medium' | 'low';

type Subtask = {
	title: string;
	id: string;
	isCompleted: boolean;
};

type Column = {
	type?: 'done' | 'todo' | 'inProgress';
	color?: string;
	id: string;
	tasks: Task[];
	index: number;
	title: string;
	filter: PriorityOptions | 'all';
};

type Kanban = Column[];

type Project = {
	kanban: Kanban;
	name: string;
	projectId?: string;
	calendar: Calendar;
};

type NewTaskData = {
	taskColumn: number;
	taskDescription: string;
	taskPriority: 'high' | 'low' | 'medium';
	taskTitle: string;
	subtasks?: Subtask[];
	taskIndex?: number;
};

type NewSubtaskData = {
	title: string;
	isCompleted: boolean
}

type Option = {
	value: number | string;
	label: string;
	color?: string;
};

type updatedTaskValues = {
	taskTitle: string;
	taskDescription: string;
	taskPriority: PriorityOptions;
};

export type { Option, NewTaskData, Project, Kanban, Column, Task, Subtask, PriorityOptions, updatedTaskValues, NewSubtaskData };
