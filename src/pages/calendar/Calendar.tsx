import NewEvent from 'calendar/Schedule/Event/AddEvent/NewEvent';
import CalendarGrid from 'calendar/CalendarGrid';
import { startOfToday } from 'date-fns';
import { useState } from 'react';
import { ProjectData } from 'store/projectContext';

const classes = {
	calendarContent: 'flex flex-col h-full',
	kanbanHeader: 'mb-5 flex w-full justify-between',
	projectName: 'text-indigo-400 text-3xl h-[40px] font-semibold',
};

const Calendar = () => {
	const { project } = ProjectData();
	const [selectedDay, setSelectedDay] = useState(startOfToday());

	return (
		<div className={classes.calendarContent}>
			<header className={classes.kanbanHeader}>
				{project && <h3 className={classes.projectName}>/{project.name}</h3>}
				<NewEvent selectedDay={selectedDay} />
			</header>
			<CalendarGrid selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
		</div>
	);
};

export default Calendar;
