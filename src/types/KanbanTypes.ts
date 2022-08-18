export type Task = {
	id: string;
	title: string;
};

export type Column = {
	id: string;
	tasks: Task[];
};
