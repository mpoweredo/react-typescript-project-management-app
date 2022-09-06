import CalendarGrid from '../../components/calendar/CalendarGrid';
import { ProjectData } from '../../store/projectContext';

const classes = {
	calendarContent: 'flex flex-col w-full h-full bg-[#1B1D1F] lg:rounded-2xl px-7 py-5',
	kanbanHeader: 'mb-5 flex h-auto w-full justify-between',
	projectName: 'text-indigo-400 text-3xl font-semibold',
};

const Calendar = () => {
	const { project } = ProjectData();

	return (
		<div>
			<header className={classes.kanbanHeader}>
				{project && <h3 className={classes.projectName}>/{project.name}</h3>}
				<div className='flex gap-2 items-center'></div>
			</header>
			<CalendarGrid />
		</div>
	);
};

export default Calendar;
