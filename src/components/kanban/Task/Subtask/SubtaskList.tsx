import { NewSubtaskData, Subtask as SubtaskType } from 'types/KanbanTypes';
import { ProjectData } from 'store/projectContext';
import Subtask from './Subtask';
import AddIcon from '@mui/icons-material/Add';
import { Field, Formik } from 'formik';
import { subtaskTitleSchema } from 'data/formikValidationSchemas';

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

const SubtaskList = ({ subtasks, columnIndex, taskIndex }: Props) => {
	const { addNewSubtask } = ProjectData();

	const addSubtaskHandler = (subtaskTitle: string) => {
		const newSubtaskData: NewSubtaskData = {
			title: subtaskTitle,
			isCompleted: false,
		};

		addNewSubtask(newSubtaskData, columnIndex, taskIndex);
	};

	return (
		<Formik
			initialValues={{ subtaskTitle: '' }}
			validationSchema={subtaskTitleSchema}
			onSubmit={({ subtaskTitle }, { resetForm }) => {
				addSubtaskHandler(subtaskTitle);
				resetForm();
			}}>
			{({ submitForm }) => (
				<div className={classes.subtasksContainer}>
					<div className='max-h-48 overflow-y-auto vertical-scroll px-1'>
						{subtasks && subtasks.map(subtask => <Subtask columnIndex={columnIndex} key={subtask.id} taskIndex={taskIndex} subtask={subtask} />)}
					</div>
					<div className='mt-3 flex justify-between px-1'>
						<Field
							className={classes.addSubtaskInput}
							type='text'
							placeholder='Add new subtask'
							name='subtaskTitle'
							id='subtaskTitle'
							spellCheck='false'
						/>
						<button type='button' onClick={submitForm} className={classes.addSubtask}>
							<AddIcon />
						</button>
					</div>
				</div>
			)}
		</Formik>
	);
};

export default SubtaskList;
