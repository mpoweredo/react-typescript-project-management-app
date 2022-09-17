import { differenceInCalendarDays, fromUnixTime, startOfToday } from 'date-fns';
import { CalendarEvent } from 'types/CalendarTypes';

type Props = {
	event: CalendarEvent;
};

const classes = {
	itemContainer: 'flex text-gray-100 p-3 bg-[#1a1b1d] h-auto rounded justify-between items-center',
	daysLeftText: 'text-md text-[#44474d] italic break-words',
	daysLeft: 'text-indigo-400',
	today: '!text-red-400 font-semibold !not-italic',
};

const UpcomingEventItem = ({ event }: Props) => {
	const daysLeft = differenceInCalendarDays(fromUnixTime(event.day.seconds), startOfToday()) || 'today';

	return (
		<li className={classes.itemContainer}>
			<p>{event.eventTitle}</p>
			<div>
				<p className={classes.daysLeftText}>
					{daysLeft > 0 && 'days left:  '} <span className={`${classes.daysLeft} ${daysLeft === 'today' && classes.today}`}>{daysLeft}</span>
				</p>
			</div>
		</li>
	);
};

export default UpcomingEventItem;
