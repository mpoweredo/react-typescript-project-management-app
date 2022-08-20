import { Column as ColumnType, Task as TaskType } from '../../types/KanbanTypes';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

const classes = {
	column: 'w-[260px] h-full bg-[#11111388] rounded-md px-4 py-4',
	columnTitle: 'w-full h-auto bg-[#474DA1] rounded-sm p-3 text-indigo-200 font-semibold mb-5',
};

const Column = ({ tasks, index, id, title }: ColumnType) => {
	return (
		<Droppable key={id} droppableId={index.toString()}>
			{provided => (
				<div {...provided.droppableProps} ref={provided.innerRef} className={classes.column}>
					<h1 className={classes.columnTitle}>{title}</h1>
					<ul>
						<>
							{tasks.map((task: TaskType, index: number) => (
								<Task key={task.id} id={task.id} title={task.title} index={index} />
							))}
							{provided.placeholder}
						</>
					</ul>
				</div>
			)}
		</Droppable>
	);
};

export default Column;
