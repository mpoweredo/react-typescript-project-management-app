import { Column as ColumnType, Task as TaskType } from '../../types/KanbanTypes';
import Task from './Task';
import { DragDropContext } from 'react-beautiful-dnd';

const classes = {
	Column: 'w-[260px] h-auto bg-[#11111388] rounded-md px-4 py-4',
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
