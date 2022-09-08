import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, parse, parseISO, startOfToday, startOfWeek } from 'date-fns';
import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Days from './Days';
import Cell from './Cell';
import Schedule from './Schedule';

const classes = {
	calendarContainer: 'w-full max-w-[380px] xs:max-w-[450px] mx-auto lg:mx-0',
	calendarHeader: 'flex gap-3 text-indigo-400 justify-around items-center w-full',
	daysContainer: 'grid grid-cols-7 mt-2 text-center gap-2 xs:gap-y-5 md:gap-y-5 h-auto',
	contentContainer: 'flex gap-20 h-full xl:justify-between flex-col xl:flex-row',
};

const meetings = [
	{
		id: 1,
		name: 'Leslie Alexander',
		imageUrl:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		startDatetime: '2022-09-11T13:00',
		endDatetime: '2022-09-11T14:30',
	},
	{
		id: 2,
		name: 'Michael Foster',
		imageUrl:
			'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		startDatetime: '2022-09-20T09:00',
		endDatetime: '2022-09-20T11:30',
	},
	{
		id: 3,
		name: 'Dries Vincent',
		imageUrl:
			'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		startDatetime: '2022-09-20T17:00',
		endDatetime: '2022-09-20T18:30',
	},
	{
		id: 4,
		name: 'Leslie Alexander',
		imageUrl:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		startDatetime: '2022-09-09T13:00',
		endDatetime: '2022-09-09T14:30',
	},
	{
		id: 5,
		name: 'Michael Foster',
		imageUrl:
			'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		startDatetime: '2022-09-13T14:00',
		endDatetime: '2022-09-13T14:30',
	},
];

const CalendarGrid = () => {
	const today = startOfToday();
	const [selectedDay, setSelecteDay] = useState(today);
	const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
	const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
	const selectedDaySchedule = meetings.filter(meeting => isSameDay(parseISO(meeting.startDatetime), selectedDay));

	const days = eachDayOfInterval({
		start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
		end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
	});
	const nextMonth = () => {
		const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
		setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
	};

	const prevMonth = () => {
		const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
		setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
	};

	const selectDayHandler = (day: Date) => {
		setSelecteDay(day);
	};

	return (
		<div className={classes.contentContainer}>
			<div className={classes.calendarContainer}>
				<div className='flex justify-between'>
					<header className={classes.calendarHeader}>
						<button onClick={prevMonth}>
							<ChevronLeftIcon fontSize='large' />
						</button>
						<h1 className='text-white'>{format(firstDayCurrentMonth, 'MMM yyyy')}</h1>
						<button onClick={nextMonth}>
							<ChevronRightIcon fontSize='large' />
						</button>
					</header>
				</div>
				<div className='grid grid-cols-7 mt-3'>
					<Days />
				</div>
				<div className={classes.daysContainer}>
					{days.map((day, dayIndex) => (
						<Cell
							key={dayIndex}
							day={day}
							dayIndex={dayIndex}
							selectedDay={selectedDay}
							firstDayCurrentMonth={firstDayCurrentMonth}
							selectDay={selectDayHandler}
						/>
					))}
				</div>
			</div>
			<Schedule selectedDaySchedule={selectedDaySchedule} selectedDay={selectedDay} />
		</div>
	);
};

export default CalendarGrid;
