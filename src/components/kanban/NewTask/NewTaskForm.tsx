import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Project } from '../../../types/KanbanTypes';

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

const NewTaskForm = ({ project }: Props) => {
	const columnTitles = project.kanban.map(column => column.title);

	const formik = useFormik({
		initialValues: {
			taskTitle: '',
			taskDescription: '',
			taskPriority: '',
            taskColumn: 0,
		},
		validationSchema: Yup.object({
			taskTitle: Yup.string().min(4, 'Project name must have atleast 4 characters!').required('This field is required!'),
		}),
		onSubmit: values => {
			console.log(values.taskTitle, values.taskDescription, values.taskPriority, values.taskColumn);
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

			{/* ################################################### */}

			{/* TODO: MAKE CUSTOM DROPDOWN */}

			<div>
				<select name='taskPriority' id='taskPriority' onChange={formik.handleChange} value={formik.values.taskPriority}>
					<option value='high'>high</option>
					<option value='medium'>medium</option>
					<option value='low'>low</option>
				</select>
			</div>

			{/* ################################################### */}

			{/* ################################################### */}

			{/* TODO: MAKE CUSTOM DROPDOWN */}

			<div>
				<select name='taskColumn' id='taskColumn' onChange={formik.handleChange} value={formik.values.taskColumn}>

                    {columnTitles.map((title: string, index: number) => <option value={index} key={index}>{title}</option>)}

				</select>
			</div>

			{/* ################################################### */}

			<div className={classes.buttonsContainer}>
				<button type='submit' className={classes.buttonCreate}>
					Create
				</button>
			</div>
		</form>
	);
};

export default NewTaskForm;
