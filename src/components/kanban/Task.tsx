import { Task as TaskType } from '../../types/KanbanTypes';

const classes = {
	taskItem: 'w-full h-16 bg-[#232325] mb-4 rounded-sm p-3 last:mb-0 text-[#7D7D7D] font-semibold',
};

const Task = ({ id, title }: TaskType) => {
	return <li className={classes.taskItem}>{title}</li>;
};

export default Task;
