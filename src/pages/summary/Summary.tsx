import PieChart from 'summary/kanbanChart/PieChart';
import { UserAuth } from 'store/authContext';
import UpcomingEventsList from 'summary/UpcomingEvents/UpcomingEventsList';

const classes = {
	greetingText: 'text-4xl font-semibold text-white',
	userName: 'font-bold text-indigo-500',
	summaryText: 'text-indigo-200 text-lg font-medium mt-1',
	container: 'w-full flex flex-col xl:flex-row gap-10 items-center lg:items-start min-h-0',
	kanbanChartContainer: 'bg-[#242729] max-w-[500px] h-auto flex w-full min-w-[260px] rounded-lg px-5 py-5 mt-5',
	upcomingEventsContainer: 'bg-[#242729] w-full max-w-[500px] min-w-[260px] rounded-lg px-5 py-5 mt-5 min-h-0',
};

const Summary = () => {
	const { user } = UserAuth();

	return (
		<div className='flex flex-col min-h-0'>
			<div>
				<h1 className={classes.greetingText}>
					Hello <span className={classes.userName}>{user && user.name}</span> ☀️
				</h1>
				<p className={classes.summaryText}>Here's summary of your project</p>
			</div>
			<div className={classes.container}>
				<div className={classes.kanbanChartContainer}>
					<PieChart />
				</div>
				<div className={classes.upcomingEventsContainer}>
					<UpcomingEventsList />
				</div>
			</div>
		</div>
	);
};

export default Summary;
