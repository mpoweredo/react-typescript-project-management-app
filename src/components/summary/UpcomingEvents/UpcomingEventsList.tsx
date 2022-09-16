import { fromUnixTime, isPast, isToday } from 'date-fns';
import { classNames } from 'react-select/dist/declarations/src/utils';
import { ProjectData } from 'store/projectContext';
import UpcomingEventItem from './UpcomingEventItem';

const classes = {
	list: 'flex flex-col gap-3 max-h-[300px] overflow-auto vertical-scroll pr-2',
	text: 'text-2xl font-semibold text-white',
};

const UpcomingEventsList = () => {
	const { project } = ProjectData();

	const upcomingEvents = project?.calendar
		.filter(({ day }) => !isPast(fromUnixTime(day.seconds)) || isToday(fromUnixTime(day.seconds)))
		.sort((a, b) => a.day.seconds - b.day.seconds);

	return (
		<div className='flex gap-5 flex-col'>
			<p className={classes.text}>Upcoming Events</p>
			<ul className={classes.list}>
				{upcomingEvents?.map(event => (
					<UpcomingEventItem key={event.id} event={event} />
				))}
			</ul>
		</div>
	);
};

export default UpcomingEventsList;
