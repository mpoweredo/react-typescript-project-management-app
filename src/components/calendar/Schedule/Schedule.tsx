import { format, fromUnixTime } from 'date-fns';
import { CalendarEvent } from '../../../types/CalendarTypes';
import Event from './ScheduleItem';

const classes = {
	scheduleContainer: 'xl:max-w-[600px] lg:max-w-[450px] w-full flex h-full flex-col p-6 bg-[#17181b] rounded-lg',
	scheduleText: 'font-semibold text-indigo-300 text-2xl mb-5',
	scheduleList: 'flex flex-col gap-3 w-full h-full',
};

type Props = {
	selectedDaySchedule: CalendarEvent[];
	selectedDay: Date;
};

const Schedule = ({ selectedDaySchedule, selectedDay }: Props) => {
	return (
		<div className={classes.scheduleContainer}>
			<h5 className={classes.scheduleText}>Schedule for {format(selectedDay, 'MMMM dd')}</h5>
			<ul className={classes.scheduleList}>
				{selectedDaySchedule.map(event => (
					<Event event={event} key={event.id} />
				))}
			</ul>
		</div>
	);
};

export default Schedule;
