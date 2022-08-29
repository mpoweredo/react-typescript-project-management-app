import { Subtask as SubtaskType } from '../../../../types/KanbanTypes';
import Subtask from './Subtask';

const classes = {
	subtasksContainer: 'w-full bg-[#212428] text-[#bdbdbf] h-auto max-h-48 overflow-y-auto no-scroll px-3 pb-3 flex flex-col',
};

type Props = {
	subtasks: SubtaskType[];
  taskIndex: number
	columnIndex: number;
};

const Subtasks = ({ subtasks, columnIndex, taskIndex }: Props) => {
	return (
		<div className={classes.subtasksContainer}>
			{subtasks.map(subtask => (
				<Subtask columnIndex={columnIndex} key={subtask.id} taskIndex={taskIndex} subtask={subtask} />
			))}
		</div>
	);
};

export default Subtasks;
