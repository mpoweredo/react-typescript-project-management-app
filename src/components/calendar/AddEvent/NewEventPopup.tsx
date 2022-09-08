import ReactDom from 'react-dom';
import Backdrop from '../../UI/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';
import NewEventForm from './NewEventForm';

const classes = {
	header: 'w-full flex justify-between items-start mb-4 md:mb-8',
	title: 'text-3xl font-bold text-indigo-300',
	content: 'w-full max-h-[90vh] h-auto overflow-auto bg-[#1a1b1f] rounded flex flex-col p-5 md:w-[700px] md:h-auto md:p-8 vertical-scroll',
	formContainer: 'w-full',
	buttonClose: 'w-8 h-8 rounded font-semibold justify-start bg-[#151619] text-[#bdbdbf] hover:bg-[#1d1f24]',
	selectedDay: 'font-medium text-[#8c8e92] text-xl',
};

type Props = {
	isOpen: boolean;
	closePopup: React.Dispatch<React.SetStateAction<boolean>>;
	selectedDay: Date;
};

const NewEventPopup = ({ closePopup, isOpen, selectedDay }: Props) => {
	const closePopupHandler = () => {
		closePopup(false);
	};

	return ReactDom.createPortal(
		<>
			{isOpen && (
				<Backdrop passedCloseHandler={closePopupHandler}>
					<div className={classes.content} onClick={e => e.stopPropagation()}>
						<header className={classes.header}>
							<h6 className={classes.title}>Creating Event</h6>
							<button className={classes.buttonClose} onClick={closePopupHandler}>
								<CloseIcon />
							</button>
						</header>
						<div className='w-full'>
							<div className={classes.formContainer}>
								<p className={classes.selectedDay}>
									Selected day: <span className='text-indigo-400 font-semibold'>{format(selectedDay, 'MMMM dd')}</span>
								</p>
                                <NewEventForm closePopup={closePopupHandler} selectedDay={selectedDay} />
							</div>
						</div>
					</div>
				</Backdrop>
			)}
		</>,
		document.getElementById('new-event') as HTMLElement
	);
};

export default NewEventPopup;
