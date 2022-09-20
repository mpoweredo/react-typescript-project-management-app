import { useState } from 'react';
import { Field, Formik, useFormik } from 'formik';
import { ProjectData } from 'store/projectContext';
import { Project, Subtask as SubtaskType } from 'types/KanbanTypes';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { subtaskTitleSchema } from 'data/formikValidationSchemas';

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
	const { project, changeSubtaskStatus, changeSubtaskTitle } = ProjectData();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const subtaskIndex = project?.kanban[columnIndex].tasks[taskIndex].subtasks.findIndex(({ id }) => id === subtask.id) as number;

	const changeSubtaskStatusHandler = (
		e: React.ChangeEvent<HTMLInputElement>,
		handleChange: { (e: React.ChangeEvent<any>): void },
		isTaskCompleted: boolean
	) => {
		handleChange(e);
		changeSubtaskStatus(isTaskCompleted, { columnIndex, taskIndex, subtaskIndex });
	};

	const changeSubtaskTitleHandler = (subtaskTitle: string) => {
		setIsEditing(false);
		changeSubtaskTitle(subtaskTitle, { columnIndex, taskIndex, subtaskIndex });
	};

	const editHandler = () => {
		setIsEditing(prevState => !prevState);
	};

	return (
		<Formik
			initialValues={{
				isTaskCompleted: subtask.isCompleted,
				subtaskTitle: subtask.title,
			}}
			validationSchema={subtaskTitleSchema}
			onSubmit={({ subtaskTitle }) => changeSubtaskTitleHandler(subtaskTitle)}>
			{({ values, submitForm, handleChange }) => (
				<div className={classes.subtaskContainer}>
					<Field
						type='checkbox'
						checked={values.isTaskCompleted}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeSubtaskStatusHandler(e, handleChange, values.isTaskCompleted)}
						name='isTaskCompleted'
						className={classes.checkbox}
						id={subtask.id}
					/>
					<div className='flex justify-between w-full'>
						{!isEditing ? (
							<label htmlFor={subtask.id} className={`py-1 ${values.isTaskCompleted && 'line-through text-gray-600'}`}>
								{subtask.title}
							</label>
						) : (
							<Field className={classes.input} autoFocus spellCheck='false' type='text' name='subtaskTitle' />
						)}
						<div className='flex gap-2'>
							<button type='button' onClick={editHandler}>
								{!isEditing ? <EditIcon className='text-gray-300' /> : <ClearIcon className='text-red-300' />}
							</button>
							{isEditing && (
								<button type='button' onClick={submitForm}>
									<DoneIcon className='text-green-300' />
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</Formik>
	);
};

export default Subtask;
