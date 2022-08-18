import { Task as TaskType } from '../../types/KanbanTypes';

const classes = {
	taskItem: 'w-full h-16 bg-gray-500 mb-4 rounded-sm p-3 last:mb-0',
};

const Task = ({ id, title }: TaskType) => {
	return <li className={classes.taskItem}>{title}</li>;
};

export default Task;
