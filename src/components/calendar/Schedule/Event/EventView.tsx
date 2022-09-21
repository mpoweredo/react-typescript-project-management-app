import ReactDom from 'react-dom';
import Backdrop from 'UI/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import { Field, Form, Formik, useFormik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomSelect from 'UI/CustomSelect';
import { Option } from 'types/KanbanTypes';
import { hoursSelectStyles } from 'data/selectStyles';
import { hourOptions, minuteOptions } from 'data/selectOptions';
import { CalendarEvent, NewCalendarEvent } from 'types/CalendarTypes';
import { ProjectData } from 'store/projectContext';
import { eventTitleSchema } from 'data/formikValidationSchemas';

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
	const { updateEvent, deleteEvent } = ProjectData();

	const deleteHandler = () => deleteEvent(event.id);

	const initialValues: NewCalendarEvent = {
		eventTitle: event.eventTitle,
		eventDescription: event.eventDescription,
		startTime: {
			startTimeHour: hourOptions[+event.startTime.startTimeHour].value,
			startTimeMinute: minuteOptions[+event.startTime.startTimeMinute].value,
		},
		endTime: {
			endTimeHour: hourOptions[+event.endTime.endTimeHour].value,
			endTimeMinute: minuteOptions[+event.endTime.endTimeMinute].value,
		},
	};

	const submitHandler = (values: NewCalendarEvent) => {
		{
			const updatedEvent: CalendarEvent = {
				...event,
				eventTitle: values.eventTitle,
				startTime: {
					startTimeHour: values.startTime.startTimeHour as string,
					startTimeMinute: values.startTime.startTimeMinute as string,
				},
				endTime: {
					endTimeHour: values.endTime.endTimeHour as string,
					endTimeMinute: values.endTime.endTimeMinute as string,
				},
				eventDescription: values.eventDescription,
			};
			updateEvent(updatedEvent);
			toggleHandler();
		}
	};

	return ReactDom.createPortal(
		<>
			{isOpen && (
				<Backdrop passedCloseHandler={toggleHandler}>
					<div className={classes.content} onClick={e => e.stopPropagation()}>
						<Formik initialValues={initialValues} validationSchema={eventTitleSchema} onSubmit={submitHandler}>
							{({ values, setFieldValue }) => (
								<Form autoComplete='off'>
									<header className={classes.header}>
										<Field
											spellCheck='false'
											className={`${classes.title} ${classes.input} px-2 py-1`}
											name='eventTitle'
											id='eventTitle'
											value={values.eventTitle}
										/>
										<button type='button' className={classes.buttonDelete} onClick={deleteHandler}>
											<DeleteIcon />
										</button>
										<button type='button' className={classes.buttonClose} onClick={toggleHandler}>
											<CloseIcon />
										</button>
									</header>
									<div>
										<Field
											as='textarea'
											placeholder={values.eventDescription || 'Click here to add description!'}
											name='eventDescription'
											id='eventDescription'
											spellCheck='false'
											className={`${classes.description}`}
											value={values.eventDescription}
										/>
									</div>
									<div>
										<label className={classes.label}>Event start time</label>
										<div className='flex gap-3 mt-2'>
											<div>
												<p className='text-indigo-200'>Hour</p>
												<CustomSelect
													onChange={(value: Option) => {
														setFieldValue('startTime.startTimeHour', value.value);
														value.value === '24' && setFieldValue('startTime.startTimeMinute', 0);
													}}
													options={hourOptions}
													passedStyles={hoursSelectStyles}
													PassedDefaultValue={hourOptions[+values.startTime.startTimeHour]}
												/>
											</div>
											<div>
												<p className='text-indigo-200'>Minute</p>
												<CustomSelect
													onChange={(value: Option) => setFieldValue('startTime.startTimeMinute', value.value)}
													options={minuteOptions}
													passedStyles={hoursSelectStyles}
													isDisabled={values.startTime.startTimeHour === '24'}
													PassedDefaultValue={hourOptions[+values.startTime.startTimeMinute]}
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
															setFieldValue('endTime.endTimeHour', value.value);
															value.value === '24' && setFieldValue('endTime.endTimeMinute', 0);
														}}
														options={hourOptions}
														passedStyles={hoursSelectStyles}
														PassedDefaultValue={hourOptions[+values.endTime.endTimeHour]}
													/>
												</div>
												<div>
													<p className='text-indigo-200'>Minute</p>
													<CustomSelect
														onChange={(value: Option) => setFieldValue('endTime.endTimeMinute', value.value)}
														options={minuteOptions}
														passedStyles={hoursSelectStyles}
														isDisabled={values.endTime.endTimeHour === '24'}
														PassedDefaultValue={hourOptions[+values.endTime.endTimeMinute]}
													/>
												</div>
											</div>
										</div>
									</div>
									{(event.eventTitle !== values.eventTitle ||
										event.eventDescription !== values.eventDescription ||
										event.startTime.startTimeHour !== values.startTime.startTimeHour ||
										event.startTime.startTimeMinute !== values.startTime.startTimeMinute ||
										event.endTime.endTimeHour !== values.endTime.endTimeHour ||
										event.endTime.endTimeMinute !== values.endTime.endTimeMinute) && (
										<div className={classes.buttonContainer}>
											<button type='submit' className={classes.buttonChange}>
												Change
											</button>
										</div>
									)}
								</Form>
							)}
						</Formik>
					</div>
				</Backdrop>
			)}
		</>,
		document.getElementById('event-details') as HTMLElement
	);
};

export default EventView;
