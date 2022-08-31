type Task = {
	id: string;
	title: string;
	priority: PriorityOptions
	description: string;
	subtasks: Subtask[]
};

type PriorityOptions = 'high' | 'medium' | 'low'

type Subtask = {
	title: string;
	id: string;
	isCompleted: boolean;
}

type Column = {
	id: string;
	tasks: Task[];
	index: number;
	title: string;
	filter: PriorityOptions | 'all'
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
	subtasks?: Subtask[]
};

type Option = {
	value: number | string;
	label: string;
	color?: string
};

export type {Option, NewTaskData, Project, Kanban, Column, Task, Subtask, PriorityOptions}