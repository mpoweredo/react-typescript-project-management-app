type Task = {
	id: string;
	title: string;
	priority: 'high' | 'low' | 'medium';
	description: string
};

type Column = {
	id: string;
	tasks: Task[];
	index: number;
	title: string;
};

type Kanban = Column[];

type Project = {
	kanban: Kanban;
	name: string;
};

type NewTaskData = {
	taskColumn: number;
	taskDescription: string;
	taskPriority: 'high' | 'low' | 'medium';
	taskTitle: string;
};

type Option = {
	value: number | string;
	label: string;
	color?: string
};

export type {Option, NewTaskData, Project, Kanban, Column, Task}