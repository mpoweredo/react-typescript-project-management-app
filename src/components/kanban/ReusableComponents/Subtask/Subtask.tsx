import { useFormik } from 'formik';
import { ProjectData } from '../../../../store/projectContext';
import { Project, Subtask as SubtaskType } from '../../../../types/KanbanTypes';

const classes = {
	subtaskContainer: 'w-full bg-[#1D2024] py-3 px-2 mt-3 flex gap-2',
};

type Props = {
	columnIndex: number;
	subtask: SubtaskType;
	taskIndex: number;
};

const Subtask = ({ subtask, columnIndex, taskIndex }: Props) => {
	const { project, updateProject } = ProjectData();

	const subtaskIndex = project?.kanban[columnIndex].tasks[taskIndex].subtasks.findIndex(({ id }) => id === subtask.id) as number;

	const formik = useFormik({
		initialValues: {
			isTaskCompleted: subtask.isCompleted,
			taskTitle: subtask.title,
		},
		onSubmit: values => {
			console.log(values);
		},
	});

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		formik.handleChange(e);
		const updatedData = project?.kanban;

		console.log(columnIndex, taskIndex);

        console.log(formik.values.isTaskCompleted);
		updatedData![columnIndex].tasks[taskIndex].subtasks[subtaskIndex].isCompleted = !formik.values.isTaskCompleted

        const newData = {
            ...project,
            kanban: updatedData
        } as Project

        updateProject(newData)
	};

	return (
		<div className={classes.subtaskContainer}>
			<input type='checkbox' checked={formik.values.isTaskCompleted} onChange={changeHandler} name='isTaskCompleted' id={subtask.id} />
			<label htmlFor={subtask.id}>{subtask.title}</label>
		</div>
	);
};

export default Subtask;
