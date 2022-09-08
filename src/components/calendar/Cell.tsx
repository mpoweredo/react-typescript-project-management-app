import { format, getDay, isEqual, isSameDay, isSameMonth, isToday, parseISO } from 'date-fns';

type Props = {
	day: Date;
	dayIndex: number;
	selectedDay: Date;
	firstDayCurrentMonth: Date;
	selectDay: (day: Date) => void;
};

const classes = {
	colStart: ['', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7'],
	cellContainer: 'h-10 flex items-center justify-center font-semibold',
	cell: ' w-9 h-9 text-[.9rem] xs:text-[1.1rem] xs:w-[2.1rem] xs:h-[2.1rem] xs:w-11 xs:h-11 flex items-center justify-center rounded-[5px]',
	todayAndSelected: '!bg-green-400 text-green-800',
	todayNotSelected: 'bg-red-400 text-red-800',
};

// 16: 00

const Cell = ({ day, dayIndex, selectedDay, firstDayCurrentMonth, selectDay }: Props) => {
	return (
		<div key={day.toString()} className={`${dayIndex === 0 && classes.colStart[getDay(day) - 1]} ${classes.cellContainer}`}>
			<button
				onClick={() => selectDay(day)}
				className={`${isSameMonth(day, firstDayCurrentMonth) ? 'text-gray-50' : 'text-[#292c2f]'} ${
					isEqual(day, selectedDay) && isToday(day) && classes.todayAndSelected
				} ${!isEqual(day, selectedDay) && isToday(day) && classes.todayNotSelected} ${
					isEqual(day, selectedDay) && !isToday(day) && '!bg-indigo-500'
				} ${!isToday(day) && isSameMonth(day, firstDayCurrentMonth) && 'bg-[#292d31]'} ${!isToday(day) && 'hover:bg-[#45494e] hover:!text-white'} ${
					!isSameMonth(day, firstDayCurrentMonth) && !isEqual(day, selectedDay) && 'bg-transparent'
				} ${classes.cell} `}>
				<time className='relative top-[1px]' dateTime={format(day, 'yyyy-MM-dd')}>
					{format(day, 'd')}
				</time>
			</button>
		</div>
	);
};

export default Cell;

// ${meetings.some(meeting => isSameDay(parseISO(meeting.startDatetime), day)) && 'bg-sky-500 hover:bg-sky-600'} 