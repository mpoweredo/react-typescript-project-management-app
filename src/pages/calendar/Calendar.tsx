import { startOfToday } from 'date-fns';
import { useState } from 'react';
import NewEvent from '../../components/calendar/AddEvent/NewEvent';
import CalendarGrid from '../../components/calendar/CalendarGrid';
import { ProjectData } from '../../store/projectContext';

const classes = {
	calendarContent: 'flex flex-col h-full',
	kanbanHeader: 'mb-5 flex h-auto w-full justify-between',
	projectName: 'text-indigo-400 text-3xl font-semibold',
};

const Calendar = () => {
	const { project } = ProjectData();
	console.log(project);
	const [selectedDay, setSelectedDay] = useState(startOfToday());

	return (
		<div className={classes.calendarContent}>
			<header className={classes.kanbanHeader}>
				{project && <h3 className={classes.projectName}>/{project.name}</h3>}
				<NewEvent selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
			</header>
			<CalendarGrid selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
		</div>
	);
};

export default Calendar;
