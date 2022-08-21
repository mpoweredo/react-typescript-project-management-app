import { Draggable } from 'react-beautiful-dnd';
import { Task as TaskType } from '../../types/KanbanTypes';

const classes = {
	taskItem: 'w-full h-16 bg-[#232325] rounded-sm p-3 text-[#7D7D7D] font-semibold',
};

const Task = ({ id, title, index }: TaskType) => {
	return (
		<Draggable key={id} draggableId={id.toString()} index={index}>
			{provided => (
				<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='mt-4'>
					<li className={classes.taskItem}>{title}</li>
				</div>
			)}
		</Draggable>
	);
};

export default Task;
