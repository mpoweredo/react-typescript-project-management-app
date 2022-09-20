import { useState } from 'react';
import { useFormik } from 'formik';
import { ProjectData } from 'store/projectContext';
import { Project, Subtask as SubtaskType } from 'types/KanbanTypes';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

const classes = {
	subtaskContainer: 'w-full bg-[#1D2024] py-3 px-2 mt-3 flex gap-3 items-center',
	input: 'rounded focus:outline focus:outline-indigo-500 duration-500 px-2 bg-[#292d33] p-1 w-3/6',
	checkbox: 'form-checkbox rounded-sm w-[17px] h-[17px] text-indigo-500 bg-gray-600 border-none focus:ring-offset-0 ring-offset-0 focus:ring-0',
};

type Props = {
	columnIndex: number;
	subtask: SubtaskType;
	taskIndex: number;
};

const Subtask = ({ subtask, columnIndex, taskIndex }: Props) => {
	const { project, updateProject } = ProjectData();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const subtaskIndex = project?.kanban[columnIndex].tasks[taskIndex].subtasks.findIndex(({ id }) => id === subtask.id) as number;

	const formik = useFormik({
		initialValues: {
			isTaskCompleted: subtask.isCompleted,
			subtaskTitle: subtask.title,
		},
		onSubmit: values => {
			console.log(values);
		},
	});

	const changeSubtaskStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
		formik.handleChange(e);
		const updatedData = project?.kanban;
		updatedData![columnIndex].tasks[taskIndex].subtasks[subtaskIndex].isCompleted = !formik.values.isTaskCompleted;

		const newData = {
			...project,
			kanban: updatedData,
		} as Project;

		updateProject(newData);
	};

	const changeSubtaskTitle = () => {
		setIsEditing(false);
		const updatedData = project?.kanban;

		updatedData![columnIndex].tasks[taskIndex].subtasks[subtaskIndex].title = formik.values.subtaskTitle;

		const newData = {
			...project,
			kanban: updatedData,
		} as Project;

		updateProject(newData);
	};

	const editHandler = () => {
		setIsEditing(prevState => !prevState);
	};

	return (
		<div className={classes.subtaskContainer}>
			<input
				type='checkbox'
				checked={formik.values.isTaskCompleted}
				onChange={changeSubtaskStatus}
				name='isTaskCompleted'
				className={classes.checkbox}
				id={subtask.id}
			/>
			<div className='flex justify-between w-full'>
				{!isEditing ? (
					<label htmlFor={subtask.id} className={`py-1 ${formik.values.isTaskCompleted && 'line-through text-gray-600'}`}>
						{subtask.title}
					</label>
				) : (
					<input
						className={classes.input}
						autoFocus
						spellCheck='false'
						type='text'
						onChange={formik.handleChange}
						name='subtaskTitle'
						value={formik.values.subtaskTitle}
					/>
				)}
				<div className='flex gap-2'>
					<button type='button' onClick={editHandler}>
						{!isEditing ? <EditIcon className='text-gray-300' /> : <ClearIcon className='text-red-300' />}
					</button>
					{isEditing && (
						<button type='button' onClick={changeSubtaskTitle}>
							<DoneIcon className='text-green-300' />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Subtask;
