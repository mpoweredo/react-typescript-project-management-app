import { format } from 'date-fns';

const classes = {
    scheduleContainer: 'xl:max-w-[600px] lg:max-w-[450px] w-full flex h-full flex-col p-6 bg-[#17181b] rounded-lg',
    scheduleText: 'font-semibold text-indigo-300 text-2xl mb-5',
    scheduleList: 'flex flex-col gap-3 w-full h-full',
    scheduleItem: 'h-16 text-white w-full bg-[#25272c] rounded p-3 shadow-md'

}

const Schedule = ({ selectedDaySchedule, selectedDay }) => {
	return (
		<div className={classes.scheduleContainer}>
			<h5 className={classes.scheduleText}>Schedule for {format(selectedDay, 'MMMM dd')}</h5>
			<ul className={classes.scheduleList}>
				{selectedDaySchedule.map(item => (
					<li key={item.id} className={classes.scheduleItem}>
						{item.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Schedule;
