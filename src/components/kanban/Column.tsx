import { Column as ColumnType, Task as TaskType } from '../../types/KanbanTypes';
import Task from './Task';

const classes = {
	Column: 'w-[300px] h-auto bg-[#313336] rounded-md px-4 py-4',
};

const Column = ({ tasks }: ColumnType) => {
	return (
		<ul className={classes.Column}>
			{tasks.map((task: TaskType) => (
				<Task key={task.id} id={task.id} title={task.title} />
			))}
		</ul>
	);
};

export default Column;
