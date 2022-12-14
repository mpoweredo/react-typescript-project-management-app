import { useState } from 'react';
import { CalendarEvent } from '../../../../types/CalendarTypes';
import EventView from './EventView';

type Props = {
	event: CalendarEvent;
};

const classes = {
	eventTitle: 'text-xl font-semibold text-indigo-50 text-ellipsis whitespace-nowrap overflow-hidden',
	eventCard: 'h-28 text-white w-full bg-[#25272c] hover:bg-[#202226] cursor-pointer rounded-md p-3 shadow-md flex flex-col',
	description: 'text-gray-200 text-ellipsis whitespace-nowrap overflow-hidden',
};

const Event = ({ event }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleHandler = () => setIsOpen(prevState => !prevState);

	return (
		<>
			<li className={classes.eventCard} onClick={toggleHandler}>
				<header>
					<p className={classes.eventTitle}>{event.eventTitle}</p>
				</header>
				<section className='flex flex-col h-full'>
					<div className='flex flex-col justify-between h-full'>
						<p className='text-gray-400'>
							{event.startTime.startTimeHour}:{event.startTime.startTimeMinute} - {event.endTime.endTimeHour}:{event.endTime.endTimeMinute}
						</p>
						<p className={classes.description}>{event.eventDescription}</p>
					</div>
				</section>
			</li>
			<EventView isOpen={isOpen} toggleHandler={toggleHandler} event={event} />
		</>
	);
};

export default Event;
