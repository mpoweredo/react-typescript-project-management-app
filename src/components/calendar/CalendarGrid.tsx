import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, parse, parseISO, startOfToday, startOfWeek } from 'date-fns';
import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Days from './Days';
import Cell from './Cell';
import Schedule from './Schedule';
import { ProjectData } from '../../store/projectContext'
import { Calendar, CalendarEvent } from '../../types/CalendarTypes';
import { fromUnixTime } from 'date-fns/esm';

const classes = {
	calendarContainer: 'w-full max-w-[380px] xs:max-w-[450px] mx-auto lg:mx-0',
	calendarHeader: 'flex gap-3 text-indigo-400 justify-around items-center w-full',
	daysContainer: 'grid grid-cols-7 mt-2 text-center gap-2 xs:gap-y-5 md:gap-y-5 h-auto',
	contentContainer: 'flex gap-20 h-full xl:justify-between flex-col xl:flex-row',
};


type Props = {
	selectedDay: Date;
	setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
};

const CalendarGrid = ({ selectedDay, setSelectedDay }: Props) => {
	const { project } = ProjectData()

	const today = startOfToday();
	const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
	const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
	const selectedDaySchedule = project && project.calendar.filter((event: CalendarEvent) => isSameDay(fromUnixTime(event.day.seconds), selectedDay)) || [];

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
		setSelectedDay(day);
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
