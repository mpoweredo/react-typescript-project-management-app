import ReactDom from 'react-dom';
import NewTaskForm from './NewTaskForm';
import CloseIcon from '@mui/icons-material/Close';
import { Project } from '../../../../types/KanbanTypes';
import Backdrop from '../../../UI/Backdrop';

const classes = {
	header: 'w-full flex justify-between items-start mb-4 md:mb-8',
	title: 'text-3xl font-bold text-indigo-300',
	backdrop: 'absolute w-screen h-screen bg-[#00000073] top-0 left-0 z-50 p-4 flex items-center justify-center',
	content: 'w-full max-h-[720px] h-auto overflow-auto bg-[#1a1b1f] rounded flex flex-col p-5 md:w-[700px] md:h-auto md:p-8 vertical-scroll',
	formContainer: 'w-full',
	buttonClose: 'w-8 h-8 rounded font-semibold justify-start bg-[#151619] text-[#bdbdbf] hover:bg-[#1d1f24]',
};

type Props = {
	isOpen: boolean;
	closePopUp: () => void;
	project: Project;
};

const NewTaskPopup = ({ isOpen, closePopUp, project }: Props) => {
	const closePopUpHandler = () => {
		closePopUp();
	};

	return ReactDom.createPortal(
		<>
			{isOpen && (
				<Backdrop passedCloseHandler={closePopUpHandler}>
					<div className={classes.content} onClick={e => e.stopPropagation()}>
						<header className={classes.header}>
							<h6 className={classes.title}>Creating task</h6>
							<button className={classes.buttonClose} onClick={closePopUpHandler}>
								<CloseIcon />
							</button>
						</header>
						<div className='w-full'>
							<div className={classes.formContainer}>
								<NewTaskForm closePopUp={closePopUp} project={project} />
							</div>
						</div>
					</div>
				</Backdrop>
			)}
		</>,
		document.getElementById('new-task') as HTMLElement
	);
};

export default NewTaskPopup;
