import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import ReactDom from 'react-dom';
import Backdrop from '../../UI/Backdrop';
import { Option, Task as TaskType } from '../../../types/KanbanTypes';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import gfm from 'remark-gfm';
import remarkGfm from 'remark-gfm';
import { priorityOptions } from '../../../data/priorityOptions';
import { prioritySelectStyles } from '../../../data/selectStyles';
import { ProjectData } from '../../../store/projectContext';
import CustomSelect from '../ReusableComponents/CustomSelect';
import Subtasks from './Subtask/Subtasks';

type Props = {
	isOpen: boolean;
	task: TaskType;
	closeTaskView: () => void;
	columnId: string;
};

const classes = {
	header: 'w-full flex justify-between items-start mb-4 md:mb-8',
	title: 'text-3xl hover:bg-[#212428] w-full font-bold bg-transparent text-indigo-300 cursor-pointer',
	input: 'rounded focus:outline focus:outline-indigo-500 duration-500',
	description: 'w-full bg-[#212428] p-3 rounded text-[#bdbdbf] vertical-scroll focus:outline focus:outline-indigo-500 resize-none max-h-[200px] overflow-y-auto',
	content: 'w-full max-h-[720px] h-auto overflow-auto bg-[#1a1b1f] rounded flex flex-col p-5 md:w-[700px] md:h-auto md:p-8 vertical-scroll',
	formContainer: 'w-full flex flex-col gap-2',
	buttonClose: 'w-8 h-8 ml-2 rounded font-semibold justify-start bg-[#151619] text-[#bdbdbf] hover:bg-[#1d1f24]',
	closeDescriptionButton: 'w-14 h-8 rounded font-semibold justify-start bg-indigo-700 text-[#bdbdbf] hover:bg-indigo-600 mt-1',
	buttonChange: 'w-full h-11 mt-4 rounded font-semibold bg-[#0d0e10] text-[#bdbdbf] hover:bg-[#101114]',
	buttonContainer: 'flex w-full gap-2',
};

const TaskView = ({ isOpen, task, closeTaskView, columnId }: Props) => {
	const [isDescriptionEdited, setIsDescriptionEdited] = useState<boolean>(false);
	const { project } = ProjectData();

	console.log(task.subtasks);

	const deafultPriorityValue = priorityOptions.find((option: Option) => {
		if (option.value === task.priority) return option;
	});

	const columnIndex = project!.kanban.findIndex(({ id }) => id === columnId);
	const taskIndex = project!.kanban[columnIndex].tasks.findIndex(({ id }) => id === task.id);

	const closeHandler = () => {
		closeTaskView();
	};

	const formik = useFormik({
		initialValues: {
			taskTitle: task.title,
			taskDescription: task.description,
			taskPriority: task.priority,
		},
		validationSchema: Yup.object({
			taskTitle: Yup.string().min(4, 'Title name must have atleast 4 characters!').required('This field is required!'),
		}),
		onSubmit: (values: unknown) => {
			console.log(values);
		},
	});

	return ReactDom.createPortal(
		<>
			{isOpen && (
				<Backdrop>
					<div className={classes.content}>
						<form autoComplete='off' onSubmit={formik.handleSubmit}>
							<header className={classes.header}>
								<input
									spellCheck='false'
									onChange={formik.handleChange}
									className={`${classes.title} ${classes.input} px-2 py-1`}
									name='taskTitle'
									id='taskTitle'
									value={formik.values.taskTitle}
								/>
								<button type='button' className={classes.buttonClose} onClick={closeHandler}>
									<CloseIcon />
								</button>
							</header>
							<div className='w-full'>
								<div className={classes.formContainer}>
									{isDescriptionEdited && (
										<div>
											<textarea
												name='taskDescription'
												id='taskDescription'
												className={`${classes.description} h-[120px]`}
												value={formik.values.taskDescription}
												onChange={formik.handleChange}
											/>
											<button className={classes.closeDescriptionButton} onClick={() => setIsDescriptionEdited(false)}>
												close
											</button>
											<p className='text-[#8c8e92] font-semibold mb-2 mt-2 text-xl '>Live preview:</p>
										</div>
									)}

									<div className={`${classes.description} ${!isDescriptionEdited && 'cursor-pointer'}`} onClick={() => setIsDescriptionEdited(true)}>
										<ReactMarkdown remarkPlugins={[gfm, remarkGfm]} children={formik.values.taskDescription} />
									</div>
									<Subtasks subtasks={task.subtasks} columnIndex={columnIndex} taskIndex={taskIndex} />
									<div>
										<CustomSelect
											onChange={(value: Option) => formik.setFieldValue('taskPriority', value.value)}
											options={priorityOptions}
											passedStyles={prioritySelectStyles}
											PassedDefaultValue={deafultPriorityValue}
										/>
									</div>
								</div>
							</div>
							{(task.description !== formik.values.taskDescription ||
								task.title !== formik.values.taskTitle ||
								task.priority !== formik.values.taskPriority) && (
								<div className={classes.buttonContainer}>
									<button type='submit' className={classes.buttonChange}>
										Change
									</button>
								</div>
							)}
						</form>
					</div>
				</Backdrop>
			)}
		</>,
		document.getElementById('task-details') as HTMLElement
	);
};

export default TaskView;
