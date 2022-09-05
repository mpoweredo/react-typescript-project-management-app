import { ProjectData } from '../../store/projectContext';

const classes = {
	container: 'w-full h-full lg:p-8',
	calendarContent: 'flex flex-col w-full h-full bg-[#1B1D1F] lg:rounded-2xl px-7 py-5',
	kanbanHeader: 'mb-5 flex h-auto w-full justify-between',
	projectName: 'text-indigo-400 text-3xl font-semibold',
};

const Calendar = () => {
	const { project } = ProjectData();

	return (
		<main className={classes.container}>
			<div className={classes.calendarContent}>
				<header className={classes.kanbanHeader}>
					{project && <h3 className={classes.projectName}>/{project.name}</h3>}
					<div className='flex gap-2 items-center'></div>
				</header>
			</div>
		</main>
	);
};

export default Calendar;
