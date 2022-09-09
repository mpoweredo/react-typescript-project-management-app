import { getUnixTime } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { hourOptions, minuteOptions } from '../../../data/selectOptions';
import { hoursSelectStyles } from '../../../data/selectStyles';
import { CalendarEvent } from '../../../types/CalendarTypes';
import { Option } from '../../../types/KanbanTypes';
import CustomSelect from '../../UI/CustomSelect';
import { v4 as uuidv4 } from 'uuid';
import { ProjectData } from '../../../store/projectContext';

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

	const formik = useFormik({
		initialValues: {
			day: selectedDay,
			eventTitle: '',
			startTimeHour: hourOptions[12].value,
			startTimeMinute: minuteOptions[0].value,
			endTimeHour: hourOptions[13].value,
			endTimeMinute: minuteOptions[0].value,
			eventDescription: '',
		},
		validationSchema: Yup.object({
			eventTitle: Yup.string().min(4, 'Title must have atleast 4 characters!').required('This field is required!'),
		}),
		onSubmit: values => {
			closePopup();

			const newEvent: CalendarEvent = {
				id: uuidv4(),
				day: { seconds: getUnixTime(selectedDay), nanoseconds: 0 },
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

			addNewEvent(newEvent);
		},
	});

	return (
		<div>
			<form onSubmit={formik.handleSubmit} className={classes.form}>
				<div>
					<label htmlFor='eventTitle' className={classes.label}>
						Event title
					</label>
					<input
						type='text'
						id='eventTitle'
						name='eventTitle'
						autoComplete='off'
						spellCheck='false'
						className={`${classes.input} ${formik.touched.eventTitle && formik.errors.eventTitle && 'outline outline-1 !outline-red-400'}`}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.eventTitle}
					/>
					{formik.touched.eventTitle && formik.errors.eventTitle ? <p className={classes.error}>{formik.errors.eventTitle}</p> : null}
				</div>
				<div>
					<label htmlFor='taskDescription' className={classes.label}>
						Select event start time
					</label>
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
								PassedDefaultValue={hourOptions[12]}
							/>
						</div>
						<div>
							<p className='text-indigo-200'>Minute</p>
							<CustomSelect
								onChange={(value: Option) => formik.setFieldValue('startTimeMinute', value.value)}
								options={minuteOptions}
								passedStyles={hoursSelectStyles}
								isDisabled={formik.values.startTimeHour === '24'}
							/>
						</div>
					</div>
				</div>
				<div>
					<label htmlFor='taskDescription' className={classes.label}>
						Select event end time
					</label>
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
								PassedDefaultValue={hourOptions[13]}
							/>
						</div>
						<div>
							<p className='text-indigo-200'>Minute</p>
							<CustomSelect
								onChange={(value: Option) => formik.setFieldValue('endTimeMinute', value.value)}
								options={minuteOptions}
								passedStyles={hoursSelectStyles}
								isDisabled={formik.values.endTimeHour === '24'}
							/>
						</div>
					</div>
				</div>
				<div>
					<label htmlFor='eventDescription' className={classes.label}>
						Description
					</label>
					<textarea
						spellCheck='false'
						autoComplete='off'
						id='eventDescription'
						name='eventDescription'
						onChange={formik.handleChange}
						value={formik.values.eventDescription}
						className={`${classes.description} hover:bg-[#2d3137] h-32`}
					/>
				</div>
				<div className={classes.buttonContainer}>
					<button type='submit' className={classes.buttonCreate}>
						Create
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewEventForm;
