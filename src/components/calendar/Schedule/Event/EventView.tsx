import ReactDom from 'react-dom';
import * as Yup from 'yup';
import Backdrop from '../../../UI/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomSelect from '../../../UI/CustomSelect';
import { Option } from '../../../../types/KanbanTypes';
import { hoursSelectStyles } from '../../../../data/selectStyles';
import { hourOptions, minuteOptions } from '../../../../data/selectOptions';
import { CalendarEvent } from '../../../../types/CalendarTypes';
import { ProjectData } from '../../../../store/projectContext';

const classes = {
	header: 'w-full flex justify-between items-start mb-4 md:mb-8',
	title: 'text-3xl hover:bg-[#212428] w-full font-bold bg-transparent text-indigo-300 cursor-pointer',
	input: 'rounded focus:outline focus:outline-indigo-500 duration-500',
	description:
		'w-full bg-[#212428] p-3 rounded text-[#bdbdbf] vertical-scroll focus:outline focus:outline-indigo-500 resize-none max-h-[300px] overflow-y-auto',
	content: 'w-full max-h-[90vh] h-auto overflow-auto bg-[#1a1b1f] rounded flex flex-col p-5 md:w-[700px] md:h-auto md:p-8 vertical-scroll',
	formContainer: 'w-full flex flex-col gap-2',
	buttonClose: 'w-8 h-8 ml-2 rounded font-semibold justify-start bg-[#151619] text-[#bdbdbf] hover:bg-[#1d1f24]',
	buttonDelete: 'w-8 h-8 ml-2 rounded font-semibold justify-start bg-[#151619] text-red-400 hover:bg-[#1d1f24]',
	closeDescriptionButton: 'w-14 h-8 rounded font-semibold justify-start bg-indigo-700 text-[#bdbdbf] hover:bg-indigo-600 mt-1',
	buttonChange: 'w-full h-11 mt-4 rounded font-semibold bg-[#0d0e10] text-[#bdbdbf] hover:bg-[#101114]',
	buttonContainer: 'flex w-full gap-2',
	label: 'font-semibold text-[#8c8e92] text-2xl',
};

type Props = {
	isOpen: boolean;
	toggleHandler: () => void;
	event: CalendarEvent;
};

const EventView = ({ isOpen, toggleHandler, event }: Props) => {
	const { updateEvent } = ProjectData();

	const formik = useFormik({
		initialValues: {
			eventTitle: event.eventTitle,
			eventDescription: event.eventDescription,
			startTimeHour: hourOptions[+event.startTime.startTimeHour].value,
			startTimeMinute: minuteOptions[+event.startTime.startTimeMinute].value,
			endTimeHour: hourOptions[+event.endTime.endTimeHour].value,
			endTimeMinute: minuteOptions[+event.endTime.endTimeMinute].value,
		},
		validationSchema: Yup.object({
			eventTitle: Yup.string().min(4, 'Title name must have atleast 4 characters!').required('This field is required!'),
		}),
		onSubmit: values => {
			const updatedEvent: CalendarEvent = {
				...event,
				eventTitle: values.eventTitle,
				startTime: {
					startTimeHour: values.startTimeHour as string,
					startTimeMinute: values.startTimeMinute as string,
				},
				endTime: {
					endTimeHour: values.endTimeHour as string,
					endTimeMinute: values.endTimeMinute as string,
				},
				eventDescription: values.eventDescription,
			};
            updateEvent(updatedEvent)
            toggleHandler()
		},
	});

	return ReactDom.createPortal(
		<>
			{isOpen && (
				<Backdrop passedCloseHandler={toggleHandler}>
					<div className={classes.content} onClick={e => e.stopPropagation()}>
						<form autoComplete='off' onSubmit={formik.handleSubmit}>
							<header className={classes.header}>
								<input
									spellCheck='false'
									onChange={formik.handleChange}
									className={`${classes.title} ${classes.input} px-2 py-1`}
									name='eventTitle'
									id='eventTitle'
									value={formik.values.eventTitle}
								/>
								<button type='button' className={classes.buttonDelete}>
									<DeleteIcon />
								</button>
								<button type='button' className={classes.buttonClose} onClick={toggleHandler}>
									<CloseIcon />
								</button>
							</header>
							<div>
								<textarea
									placeholder={formik.values.eventDescription || 'Click here to add description!'}
									name='eventDescription'
									id='eventDescription'
									spellCheck='false'
									className={`${classes.description}`}
									value={formik.values.eventDescription}
									onChange={formik.handleChange}
								/>
							</div>
							<div>
								<label className={classes.label}>Event start time</label>
								<div className='flex gap-3 mt-2'>
									<div>
										<p className='text-indigo-200'>Hour</p>
										<CustomSelect
											onChange={(value: Option) => {
												formik.setFieldValue('startTimeHour', value.value);
												value.value === '24' && formik.setFieldValue('startTimeMinute', 0);
											}}
											options={hourOptions}
											passedStyles={hoursSelectStyles}
											PassedDefaultValue={hourOptions[+formik.values.startTimeHour]}
										/>
									</div>
									<div>
										<p className='text-indigo-200'>Minute</p>
										<CustomSelect
											onChange={(value: Option) => formik.setFieldValue('startTimeMinute', value.value)}
											options={minuteOptions}
											passedStyles={hoursSelectStyles}
											isDisabled={formik.values.startTimeHour === '24'}
											PassedDefaultValue={hourOptions[+formik.values.startTimeMinute]}
										/>
									</div>
								</div>
								<div className='mt-2'>
									<label className={classes.label}>Event end time</label>
									<div className='flex gap-3 mt-2'>
										<div>
											<p className='text-indigo-200'>Hour</p>
											<CustomSelect
												onChange={(value: Option) => {
													formik.setFieldValue('endTimeHour', value.value);
													value.value === '24' && formik.setFieldValue('endTimeMinute', 0);
												}}
												options={hourOptions}
												passedStyles={hoursSelectStyles}
												PassedDefaultValue={hourOptions[+formik.values.endTimeHour]}
											/>
										</div>
										<div>
											<p className='text-indigo-200'>Minute</p>
											<CustomSelect
												onChange={(value: Option) => formik.setFieldValue('endTimeMinute', value.value)}
												options={minuteOptions}
												passedStyles={hoursSelectStyles}
												isDisabled={formik.values.endTimeHour === '24'}
												PassedDefaultValue={hourOptions[+formik.values.endTimeMinute]}
											/>
										</div>
									</div>
								</div>
							</div>
							{(event.eventTitle !== formik.values.eventTitle ||
								event.eventDescription !== formik.values.eventDescription ||
								event.startTime.startTimeHour !== formik.values.startTimeHour ||
								event.startTime.startTimeMinute !== formik.values.startTimeMinute ||
								event.endTime.endTimeHour !== formik.values.endTimeHour ||
								event.endTime.endTimeMinute !== formik.values.endTimeMinute) && (
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
		document.getElementById('event-details') as HTMLElement
	);
};

export default EventView;
