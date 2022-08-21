import { useState } from 'react';
import { Project } from '../../../types/KanbanTypes';
import NewTaskPopup from './NewTaskPopup';

const classes = {
	addNewTask: 'bg-violet-300 text-slate-900 w-24 h-10 rounded-sm font-medium cursor-pointer',
};

type Props = {
	project: Project
}

const NewTask = ({project}: Props) => {
	const [open, setOpen] = useState<boolean>(false);

	const toggleNewTask = () => {
		setOpen(prevState => !prevState);
	};


	return (
		<>
			<button className={classes.addNewTask} onClick={toggleNewTask}>
				Add task
			</button>
			<NewTaskPopup project={project} isOpen={open} closePopUp={toggleNewTask} />
		</>
	);
};

export default NewTask;
