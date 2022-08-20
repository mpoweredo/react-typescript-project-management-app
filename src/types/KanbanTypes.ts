export type Task = {
	id: string;
	title: string;
	index: number;
};

export type Column = {
	id: string;
	tasks: Task[];
	index: number;
	title: string;
};

export type Kanban = Column[]

export type Project = {
	kanban: Kanban;
	name: string;
}