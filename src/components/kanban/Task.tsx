import { Draggable } from 'react-beautiful-dnd';
import { Task as TaskType } from '../../types/KanbanTypes';

const classes = {
	taskItem: 'w-full h-16 relative bg-[#232325] rounded-sm p-3 text-[#7D7D7D] font-semibold',
	priorityBar: 'h-full absolute right-0 top-0 w-[3px]'
};

const Task = ({ id, title, index, priority }: TaskType) => {

	const priorityColor = priority === 'high' ? '#FB8585' : priority === 'medium' ? '#fbbf24' : '#4ade80'

	return (
		<Draggable draggableId={id.toString()} index={index as number}>
			{provided => (
				<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='mt-4'>
					<li className={classes.taskItem}>
						{title}
						<div className={`${classes.priorityBar}`} style={{backgroundColor: priorityColor}} />
					</li>
				</div>
			)}
		</Draggable>
	);
};

export default Task;
