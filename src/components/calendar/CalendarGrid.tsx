import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, isEqual, isSameMonth, isToday, parse, startOfMonth, startOfToday } from 'date-fns';
import { useState } from 'react';

const classes = {
	day: 'w-full h-full bg-[#212325] text-slate-100 text-center',
};

const CalendarGrid = () => {
	const today = startOfToday();
	const [selectedDay, setSelecteDay] = useState(today);
	const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
	const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

	console.log(firstDayCurrentMonth);

    // TODO: 11:40 

	const days = eachDayOfInterval({ start: startOfMonth(today), end: endOfWeek(endOfMonth(today)) });

	const nextMonth = () => {
		const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
		setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
	};

	return (
		<div className='w-3/5 h-full '>
			<div className='flex justify-between'>
				<h1 className='text-white'>{format(firstDayCurrentMonth, 'MMM yyyy')}</h1>
				<div className='flex gap-3 text-pink-300'>
					<button>left</button>
					<button onClick={nextMonth}>right</button>
				</div>
			</div>
			<div className='grid grid-cols-7'>
				<div className={classes.day}>M</div>
				<div className={classes.day}>T</div>
				<div className={classes.day}>W</div>
				<div className={classes.day}>T</div>
				<div className={classes.day}>F</div>
				<div className={classes.day}>S</div>
				<div className={classes.day}>S</div>
			</div>
			<div className='grid grid-cols-7 mt-2 text-center gap-y-3'>
				{days.map((day, dayIndex) => (
					<div key={day.toString()}>
						<button
							onClick={() => setSelecteDay(day)}
							className={`${isSameMonth(day, today) ? 'text-gray-100' : 'text-gray-700'} ${
								isEqual(day, selectedDay) && isToday(day) && '!bg-sky-400 px-2 rounded-full'
							} ${isEqual(day, selectedDay) && 'bg-red-500 px-2 rounded-full'}`}>
							<time className={`${isToday(day) && 'text-indigo-600 '}`} dateTime={format(day, 'yyyy-MM-dd')}>
								{format(day, 'd')}
							</time>
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default CalendarGrid;
