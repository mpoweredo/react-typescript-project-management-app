import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task as TaskType } from '../../../types/KanbanTypes';
import TaskView from './TaskView';

const classes = {
	taskItem: 'w-full h-16 relative bg-[#232325] rounded-sm p-3 text-[#7D7D7D] font-semibold',
	priorityBar: 'h-full absolute right-0 top-0 w-[3px]',
};

type Props = {
	taskData: TaskType;
	index: number;
	columnId: string
};

const Task = ({ index, taskData, columnId }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleTaskView = () => {
		setIsOpen(prevState => !prevState);
	};

	const priorityColor = taskData.priority === 'high' ? '#FB8585' : taskData.priority === 'medium' ? '#fbbf24' : '#4ade80';

	return (
		<>
			<Draggable draggableId={taskData.id.toString()} index={index as number}>
				{provided => (
					<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='mt-4'>
						<li className={classes.taskItem} onClick={() => console.log(index)}>
							{taskData.title}
							<div className={`${classes.priorityBar}`} style={{ backgroundColor: priorityColor }} />
						</li>
					</div>
				)}
			</Draggable>
			<TaskView task={taskData} columnId={columnId} isOpen={isOpen} closeTaskView={toggleTaskView} />
		</>
	);
};

export default Task;
