import { useState } from 'react';
import { Project } from '../../../types/KanbanTypes';
import NewTaskPopup from './NewTaskPopup';
import AddIcon from '@mui/icons-material/Add';

const classes = {
	addNewTask: 'bg-violet-300 text-slate-900 md:w-24 md:h-10 w-10 h-10 rounded-3xl md:rounded-sm font-medium cursor-pointer',
	buttonsContainer: 'md:relative fixed right-5 bottom-5 md:right-0 md:bottom-0 z-20',
};

type Props = {
	project: Project;
};

const NewTask = ({ project }: Props) => {
	const [open, setOpen] = useState<boolean>(false);

	const toggleNewTask = () => {
		setOpen(prevState => !prevState);
	};

	return (
		<div className={classes.buttonsContainer}>
			{/* /// FOR DESKTOP */}

			<div className='md:flex hidden'>
				<button className={classes.addNewTask} onClick={toggleNewTask}>
					Add task
				</button>
			</div>

			{/* /// FOR MOBILE */}

			<div className='md:hidden block'>
				<button className={classes.addNewTask} onClick={toggleNewTask}>
					<AddIcon />
				</button>
			</div>
			<NewTaskPopup project={project} isOpen={open} closePopUp={toggleNewTask} />
		</div>
	);
};

export default NewTask;
