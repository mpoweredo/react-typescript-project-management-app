import { startOfToday } from 'date-fns';
import { useState } from 'react';
import NewEvent from '../../components/calendar/AddEvent/NewEvent';
import CalendarGrid from '../../components/calendar/CalendarGrid';
import { ProjectData } from '../../store/projectContext';

const classes = {
	calendarContent: 'flex flex-col w-full h-full bg-[#1B1D1F] lg:rounded-2xl px-7 py-5',
	kanbanHeader: 'mb-5 flex h-auto w-full justify-between',
	projectName: 'text-indigo-400 text-3xl font-semibold',
};

const Calendar = () => {
	const { project } = ProjectData();
	const [selectedDay, setSelectedDay] = useState(startOfToday());

	return (
		<div className='h-full flex flex-col'>
			<header className={classes.kanbanHeader}>
				{project && <h3 className={classes.projectName}>/{project.name}</h3>}
				<NewEvent selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
			</header>
			<CalendarGrid selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
		</div>
	);
};

export default Calendar;
