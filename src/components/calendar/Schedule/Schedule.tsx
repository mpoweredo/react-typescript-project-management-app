import { format } from 'date-fns';
import { CalendarEvent } from '../../../types/CalendarTypes';
import Event from './Event/Event';

const classes = {
	scheduleContainer: 'xl:max-w-[500px] lg:max-w-[450px] w-full h-full p-6 bg-[#17181b] rounded-lg flex flex-col',
	scheduleText: 'font-semibold text-indigo-300 text-2xl mb-5',
	scheduleList: 'flex flex-col gap-2 h-full no-scroll overflow-auto',
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
