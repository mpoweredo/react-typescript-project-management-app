import { ErrorMessage, Field, Form, Formik } from 'formik';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import remarkGfm from 'remark-gfm';
import { priorityOptions } from 'data/selectOptions';
import { columnSelectStyles, prioritySelectStyles } from 'data/selectStyles';
import { ProjectData } from 'store/projectContext';
import { NewTaskData, Option, Project } from 'types/KanbanTypes';
import CustomSelect from 'UI/CustomSelect';
import { newTaskSchema } from 'data/formikValidationSchemas';

const classes = {
	label: 'font-semibold text-[#8c8e92] text-2xl',
	form: 'flex flex-col gap-5',
	input: 'bg-[#212428] w-full h-10 rounded px-3 focus:outline focus:outline-indigo-500 duration-500 hover:bg-[#2d3137] text-gray-300 mt-2',
	error: 'text-red-400 mt-2',
	buttonCreate: 'w-full h-11 mt-4 rounded font-semibold bg-[#0d0e10] text-[#bdbdbf] hover:bg-[#101114]',
	buttonContainer: 'flex w-full gap-2',
	description: 'bg-[#212428] w-full rounded p-3 focus:outline focus:outline-indigo-500 duration-500 text-gray-300 mt-2 resize-none vertical-scroll',
};

type Props = {
	project: Project;
	closePopUp: () => void;
};

const NewTaskForm = ({ project, closePopUp }: Props) => {
	const columnOptions: Option[] = project.kanban.map(column => column.title).map((title, index) => ({ value: index, label: title }));
	const { addNewTask } = ProjectData();

	return (
		<Formik
			initialValues={{
				taskTitle: '',
				taskDescription: '',
				taskPriority: 'high',
				taskColumn: 0,
			}}
			validationSchema={newTaskSchema}
			onSubmit={(values: NewTaskData) => {
				addNewTask(values);
				closePopUp();
			}}>
			{({ errors, touched, values, setFieldValue }) => (
				<Form className={classes.form}>
					<div>
						<label htmlFor='taskTitle' className={classes.label}>
							Title
						</label>
						<Field
							type='text'
							id='taskTitle'
							name='taskTitle'
							autoComplete='off'
							spellCheck='false'
							className={`${classes.input} ${touched.taskTitle && errors.taskTitle && 'outline outline-1 !outline-red-400'}`}
						/>
						<ErrorMessage name='taskTitle'>{msg => <p className={classes.error}>{msg}</p>}</ErrorMessage>
					</div>
					<div>
						<label htmlFor='taskDescription' className={classes.label}>
							Description
						</label>
						<Field id='taskDescription' name='taskDescription' className={`${classes.description} hover:bg-[#2d3137] h-32`} as='textarea' />
						{values.taskDescription.trim().length > 0 && (
							<div>
								{' '}
								<p className={`${classes.label} mt-2 mb-1`}>Live preview</p>
								<div className={classes.description}>
									<ReactMarkdown remarkPlugins={[gfm, remarkGfm]} children={values.taskDescription} />
								</div>
							</div>
						)}
					</div>
					<div>
						<label htmlFor='taskDescription' className={classes.label}>
							Select column
						</label>
						<CustomSelect
							onChange={(value: Option) => setFieldValue('taskColumn', value.value)}
							options={columnOptions}
							passedStyles={columnSelectStyles}
						/>
					</div>
					<div>
						<label htmlFor='taskDescription' className={classes.label}>
							Select task priority
						</label>
						<CustomSelect
							onChange={(value: Option) => setFieldValue('taskPriority', value.value)}
							options={priorityOptions}
							passedStyles={prioritySelectStyles}
						/>
					</div>
					<div className={classes.buttonContainer}>
						<button type='submit' className={classes.buttonCreate}>
							Create
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default NewTaskForm;
