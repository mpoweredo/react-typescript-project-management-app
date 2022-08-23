export type Task = {
	id: string;
	title: string;
	index?: number;
	priority: 'high' | 'low' | 'medium';
};

export type Column = {
	id: string;
	tasks: Task[];
	index: number;
	title: string;
};

export type Kanban = Column[];

export type Project = {
	kanban: Kanban;
	name: string;
};

export type NewTaskData = {
	taskColumn: number;
	taskDescription: string;
	taskPriority: 'high' | 'low' | 'medium';
	taskTitle: string;
};
