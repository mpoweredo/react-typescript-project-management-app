import { getUnixTime } from 'date-fns';
import { Field, Form, Formik } from 'formik';
import { hourOptions, minuteOptions } from 'data/selectOptions';
import { hoursSelectStyles } from 'data/selectStyles';
import { NewCalendarEvent } from 'types/CalendarTypes';
import { Option } from 'types/KanbanTypes';
import CustomSelect from 'UI/CustomSelect';
import { ProjectData } from 'store/projectContext';
import { eventTitleSchema } from 'data/formikValidationSchemas';

const classes = {
	form: 'flex flex-col gap-5 mt-3',
	label: 'font-semibold text-[#8c8e92] text-2xl',
	input: 'bg-[#212428] w-full h-10 rounded px-3 focus:outline focus:outline-indigo-500 duration-500 hover:bg-[#2d3137] text-gray-300 mt-2',
	error: 'text-red-400 mt-2',
	description: 'bg-[#212428] w-full rounded p-3 focus:outline focus:outline-indigo-500 duration-500 text-gray-300 mt-2 resize-none vertical-scroll',
	buttonCreate: 'w-full h-11 mt-4 rounded font-semibold bg-[#0d0e10] text-[#bdbdbf] hover:bg-[#101114]',
	buttonContainer: 'flex w-full gap-2',
};

type Props = {
	closePopup: () => void;
	selectedDay: Date;
};

const NewEventForm = ({ closePopup, selectedDay }: Props) => {
	const { addNewEvent } = ProjectData();

	const initialValues: NewCalendarEvent = {
		day: selectedDay,
		eventTitle: '',
		startTime: {
			startTimeHour: hourOptions[12].value,
			startTimeMinute: minuteOptions[0].value,
		},
		endTime: {
			endTimeHour: hourOptions[13].value,
			endTimeMinute: minuteOptions[0].value,
		},
		eventDescription: '',
	};

	const submitHandler = (values: NewCalendarEvent) => {
		closePopup();

		const newEvent: NewCalendarEvent = {
			day: { seconds: getUnixTime(selectedDay), nanoseconds: 0 },
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

		addNewEvent(newEvent);
	};

	return (
		<div>
			<Formik initialValues={initialValues} validationSchema={eventTitleSchema} onSubmit={submitHandler}>
				{({ touched, errors, setFieldValue, values }) => (
					<Form className={classes.form}>
						<div>
							<label htmlFor='eventTitle' className={classes.label}>
								Event title
							</label>
							<Field
								type='text'
								id='eventTitle'
								name='eventTitle'
								autoComplete='off'
								spellCheck='false'
								className={`${classes.input} ${touched.eventTitle && errors.eventTitle && 'outline outline-1 !outline-red-400'}`}
							/>
							{touched.eventTitle && errors.eventTitle ? <p className={classes.error}>{errors.eventTitle}</p> : null}
						</div>
						<div>
							<label className={classes.label}>Select event start time</label>
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
										PassedDefaultValue={hourOptions[12]}
									/>
								</div>
								<div>
									<p className='text-indigo-200'>Minute</p>
									<CustomSelect
										onChange={(value: Option) => setFieldValue('startTime.startTimeMinute', value.value)}
										options={minuteOptions}
										passedStyles={hoursSelectStyles}
										isDisabled={values.startTime.startTimeHour === '24'}
									/>
								</div>
							</div>
						</div>
						<div>
							<label className={classes.label}>Select event end time</label>
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
										PassedDefaultValue={hourOptions[13]}
									/>
								</div>
								<div>
									<p className='text-indigo-200'>Minute</p>
									<CustomSelect
										onChange={(value: Option) => setFieldValue('endTime.endTimeMinute', value.value)}
										options={minuteOptions}
										passedStyles={hoursSelectStyles}
										isDisabled={values.endTime.endTimeHour === '24'}
									/>
								</div>
							</div>
						</div>
						<div>
							<label htmlFor='eventDescription' className={classes.label}>
								Description
							</label>
							<Field
								as='textarea'
								spellCheck='false'
								autoComplete='off'
								id='eventDescription'
								name='eventDescription'
								className={`${classes.description} hover:bg-[#2d3137] h-32`}
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
		</div>
	);
};

export default NewEventForm;
