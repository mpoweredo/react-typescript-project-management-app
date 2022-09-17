import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task as TaskType } from 'types/KanbanTypes';
import { calculateProgress } from 'helpers/calculateSubtaskProgress';
import TaskView from './TaskView';

const classes = {
	taskItem: 'w-full h-20 relative bg-[#232325] rounded-sm p-3 text-[#7D7D7D] font-semibold flex flex-col',
	priorityBar: 'h-full absolute right-0 top-0 w-[3px]',
	progressBarContainer: 'mt-auto flex gap-2 items-center text-[12px] text-gray-400',
	progressBar: 'w-full h-1 rounded-md bg-gray-600',
	progressIndicator: 'rounded-md h-full bg-gray-400',
};

type Props = {
	taskData: TaskType;
	index: number;
	columnId: string;
};

const Task = ({ index, taskData, columnId }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const subtaskProgresData = calculateProgress(taskData.subtasks);

	const toggleTaskView = () => {
		setIsOpen(prevState => !prevState);
	};

	const priorityColor = taskData.priority === 'high' ? '#FB8585' : taskData.priority === 'medium' ? '#fbbf24' : '#4ade80';

	return (
		<>
			<Draggable draggableId={taskData.id.toString()} index={index as number}>
				{provided => (
					<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='mt-4'>
						<li className={classes.taskItem} onClick={() => setIsOpen(true)}>
							{taskData.title}
							<div className={`${classes.priorityBar}`} style={{ backgroundColor: priorityColor }} />
							{!!subtaskProgresData.subtasksLength && (
								<div className={classes.progressBarContainer}>
									<p>
										{subtaskProgresData.completedSubtasksLength}/{subtaskProgresData.subtasksLength}
									</p>
									<div className={classes.progressBar}>
										<div style={{ width: `${subtaskProgresData.percent}%` }} className={classes.progressIndicator} />
									</div>
								</div>
							)}
						</li>
					</div>
				)}
			</Draggable>
			<TaskView task={taskData} columnId={columnId} isOpen={isOpen} closeTaskView={toggleTaskView} />
		</>
	);
};

export default Task;
