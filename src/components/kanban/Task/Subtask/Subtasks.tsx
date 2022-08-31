import { useRef } from 'react';
import { Project, Subtask as SubtaskType } from '../../../../types/KanbanTypes';
import { ProjectData } from '../../../../store/projectContext';
import Subtask from './Subtask';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';

const classes = {
	subtasksContainer: 'w-full bg-[#212428] text-[#bdbdbf] h-auto px-2 pb-3 flex flex-col rounded',
	addSubtaskInput: 'border-b-2 w-64 border-indigo-500 bg-transparent focus:bg-[#1D2024] px-2 py-1 outline-none',
	addSubtask: 'bg-[#11111388] hover:bg-[#232325] text-slate-50 w-8 h-8 rounded-sm font-medium cursor-pointer mt-3 ',
};

type Props = {
	subtasks: SubtaskType[];
	taskIndex: number;
	columnIndex: number;
};

const Subtasks = ({ subtasks, columnIndex, taskIndex }: Props) => {
	const { project, updateProject } = ProjectData();
	const subtaskTitleRef = useRef<HTMLInputElement>(null);

	const addSubtaskHandler = () => {
		if (subtaskTitleRef!.current!.value.trim().length === 0) return

		const newSubtask: SubtaskType = {
			title: subtaskTitleRef!.current!.value.trim(),
			isCompleted: false,
			id: uuidv4(),
		};

		const updatedData = project?.kanban;
		console.log(updatedData![columnIndex].tasks[taskIndex].subtasks);

		updatedData![columnIndex].tasks[taskIndex].subtasks = [...updatedData![columnIndex].tasks[taskIndex].subtasks, newSubtask];

		const newData = {
			...project,
			kanban: updatedData,
		} as Project;

		updateProject(newData);
		subtaskTitleRef!.current!.value = '' // THIS IS BAD!!!
	};

	return (
		<div className={classes.subtasksContainer}>
			<div className='max-h-48 overflow-y-auto vertical-scroll px-1'>
				{subtasks &&
					subtasks.map(subtask => (
						<Subtask columnIndex={columnIndex} key={subtask.id} taskIndex={taskIndex} subtask={subtask} />
					))}
			</div>
			<div className='mt-3 flex justify-between px-1'>
				<input
					className={classes.addSubtaskInput}
					type='text'
					placeholder='Add new subtask'
					name='newSubtaskTitle'
					id='newSubtaskTitle'
					spellCheck='false'
					ref={subtaskTitleRef}
				/>
				<button type='button' onClick={addSubtaskHandler} className={classes.addSubtask}>
					<AddIcon />
				</button>
			</div>
		</div>
	);
};

export default Subtasks;
