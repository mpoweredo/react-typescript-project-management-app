import { UserAuth } from '../../store/authContext';
import ProjectList from './ProjectList';

const classes = {
	container: 'w-full flex flex-col p-4 lg:p-8',
	greetingText: 'text-4xl text-white font-semibold mt-7 text-center lg:text-left',
	projectsContainer: 'flex flex-col',
	selectText: 'mb-6 text-gray-500 text-lg font-medium mt-5 text-center lg:text-left',
	projectsList: 'flex flex-col gap-4',
	logoutButton: 'w-36 h-11 font-semibold rounded bg-gray-500 text-gray-200 hover:bg-gray-600 self-center lg:self-start mt-5'
};

const Projects = () => {
	const { user, logout } = UserAuth();

	return (
		<div className={classes.container}>
			<div>
				<h1 className={classes.greetingText}>
					Welcome <span className='text-indigo-500'>{user && user.name}</span>
				</h1>
			</div>
			<div className={classes.projectsContainer}>
				<h4 className={classes.selectText}>Select project you wanna work with</h4>
				<ProjectList />
				<button onClick={() => logout()} className={classes.logoutButton}>Logout</button>
			</div>
		</div>
	);
};

export default Projects;
