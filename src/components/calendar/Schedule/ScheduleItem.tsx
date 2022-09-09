import { CalendarEvent } from '../../../types/CalendarTypes';

type Props = {
	event: CalendarEvent;
};

const classes = {
	eventTitle: 'text-xl font-semibold text-indigo-50',
	eventCard: 'min-h-18 h-auto max-h-40 text-white w-full bg-[#25272c] hover:bg-[#202226] cursor-pointer rounded-md p-3 shadow-md',
};

const Event = ({ event }: Props) => {
	return (
		<li className={classes.eventCard}>
			<header>
				<p className={classes.eventTitle}>{event.eventTitle}</p>
			</header>
			<section>
				<div className='flex flex-col gap-3'>
					<p className='text-gray-400'>
						{event.startTime.startTimeHour}:{event.startTime.startTimeMinute} - {event.endTime.endTimeHour}:{event.endTime.endTimeMinute}
					</p>
					<p className='text-gray-200'>{event.eventDescription}</p>
				</div>
			</section>
		</li>
	);
};

export default Event;
