import { format, fromUnixTime } from 'date-fns';
import { CalendarEvent } from '../../types/CalendarTypes';

const classes = {
	scheduleContainer: 'xl:max-w-[600px] lg:max-w-[450px] w-full flex h-full flex-col p-6 bg-[#17181b] rounded-lg',
	scheduleText: 'font-semibold text-indigo-300 text-2xl mb-5',
	scheduleList: 'flex flex-col gap-3 w-full h-full',
	scheduleItem: 'min-h-18 h-auto max-h-40 text-white w-full bg-[#25272c] rounded p-3 shadow-md'

}

type Props = {
	selectedDaySchedule: CalendarEvent[];
	selectedDay: Date;
}

const Schedule = ({ selectedDaySchedule, selectedDay }: Props) => {
	return (
		<div className={classes.scheduleContainer}>
			<h5 className={classes.scheduleText}>Schedule for {format(selectedDay, 'MMMM dd')}</h5>
			<ul className={classes.scheduleList}>
				{selectedDaySchedule.map(event => (
					<li key={event.id} className={classes.scheduleItem}>
						<header>
							<p className='text-xl font-semibold text-indigo-50'>{event.eventTitle}</p>
						</header>
						<section>
							<div className='flex flex-col gap-3'>
								<p className='text-gray-400'>{event.startTime.startTimeHour}:{event.startTime.startTimeMinute} - {event.endTime.endTimeHour}:{event.endTime.endTimeMinute}</p>
								<p className='text-gray-200'>{event.eventDescription}</p>
							</div>
						</section>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Schedule;
