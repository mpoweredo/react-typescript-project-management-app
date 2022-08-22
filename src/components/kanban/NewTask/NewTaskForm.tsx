import { useFormik } from 'formik';
import * as Yup from 'yup';
import { columnSelectStyles, prioritySelectStyles } from '../../../data/selectStyles';
import { Project } from '../../../types/KanbanTypes';
import CustomSelect from './CustomSelect';

const classes = {
	label: 'font-semibold text-[#8c8e92] text-2xl',
	form: 'flex flex-col gap-5',
	input: 'bg-[#212428] w-full h-10 rounded px-3 focus:outline focus:outline-indigo-500 duration-500 hover:bg-[#2d3137] text-gray-300 mt-2',
	error: 'text-red-400 mt-2',
	buttonCreate: 'w-full h-11 mt-4 rounded font-semibold bg-[#0d0e10] text-[#bdbdbf] hover:bg-[#101114]',
	buttonsContainer: 'flex w-full gap-2',
	description:
		'bg-[#212428] w-full h-10 rounded p-3 h-32 focus:outline focus:outline-indigo-500 duration-500 hover:bg-[#2d3137] text-gray-300 mt-2 resize-none',
};

type Props = {
	project: Project;
};

export type Option = {
	value: number | string;
	label: string;
};

const priorityOptions = [
	{
		value: 'High',
		label: 'High',
		color: '#FB8585',
	},
	{
		value: 'Medium',
		label: 'Medium',
		color: '#fbbf24',
	},
	{
		value: 'Low',
		label: 'Low',
		color: '#4ade80',
	},
];

const NewTaskForm = ({ project }: Props) => {
	const columnOptions: Option[] = project.kanban.map(column => column.title).map((title, index) => ({ value: index, label: title }));

	const formik = useFormik({
		initialValues: {
			taskTitle: '',
			taskDescription: '',
			taskPriority: 'high',
			taskColumn: 0,
		},
		validationSchema: Yup.object({
			taskTitle: Yup.string().min(4, 'Title name must have atleast 4 characters!').required('This field is required!'),
		}),
		onSubmit: values => {
			console.log(values);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} className={classes.form}>
			<div>
				<label htmlFor='taskTitle' className={classes.label}>
					Title
				</label>
				<input
					type='text'
					id='taskTitle'
					name='taskTitle'
					autoComplete='off'
					className={`${classes.input} ${formik.touched.taskTitle && formik.errors.taskTitle && 'outline outline-1 !outline-red-400'}`}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.taskTitle}
				/>
				{formik.touched.taskTitle && formik.errors.taskTitle ? <p className={classes.error}>{formik.errors.taskTitle}</p> : null}
			</div>
			<div>
				<label htmlFor='taskDescription' className={classes.label}>
					Description
				</label>
				<textarea
					id='taskDescription'
					name='taskDescription'
					onChange={formik.handleChange}
					value={formik.values.taskDescription}
					className={classes.description}
				/>
			</div>
			<div>
				<label htmlFor='taskDescription' className={classes.label}>
					Select task priority
				</label>
				<CustomSelect
					onChange={(value: Option) => formik.setFieldValue('taskPriority', value.value)}
					value={formik.values.taskColumn}
					options={priorityOptions}
					passedStyles={prioritySelectStyles}
				/>
			</div>
			<div>
				<label htmlFor='taskDescription' className={classes.label}>
					Select column
				</label>
				<CustomSelect
					onChange={(value: Option) => formik.setFieldValue('taskColumn', value.value)}
					value={formik.values.taskColumn}
					options={columnOptions}
					passedStyles={columnSelectStyles}
				/>
			</div>
			<div className={classes.buttonsContainer}>
				<button type='submit' className={classes.buttonCreate}>
					Create
				</button>
			</div>
		</form>
	);
};

export default NewTaskForm;
