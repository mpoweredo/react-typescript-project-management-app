import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import NavbarDesktop from '../../components/layout/NavbarDesktop';
import NavbarMobile from '../../components/layout/NavbarMobile';
import useProject from '../../hooks/useProject';

const classes = {
	dashboard: 'flex flex-col lg:grid lg:grid-cols-[224px_minmax(700px,_1fr)] w-full min-h-screen',
	container: 'w-full h-full lg:p-8',
	spinnerContainer: 'w-full h-full flex justify-center items-center',
	errorMessage: 'text-red-400 font-semibold text-center m-2'
};

const Dashboard = () => {
	const { projectId } = useParams();
	const { project, error, loading } = useProject(projectId!);

	return (
		<div className={classes.dashboard}>
			<div className='block lg:hidden'>
				<NavbarMobile />
			</div>
			<div className='hidden lg:block'>
				<NavbarDesktop />
			</div>
			<main className={classes.container}>
				<div className='w-full bg-[#26292c] h-full rounded-2xl'>
					{loading && (
						<div className={classes.spinnerContainer}>
							<CircularProgress />
						</div>
					)}
					{error && (
						<div className={classes.spinnerContainer}>
							<h5 className={classes.errorMessage}>Something went wrong... Try to check your internet connection!</h5>
						</div>
					)}
				</div>
			</main>
		</div>
	);
};

export default Dashboard;
