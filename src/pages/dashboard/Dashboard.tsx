import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavbarDesktop from '../../components/layout/NavbarDesktop';
import NavbarMobile from '../../components/layout/NavbarMobile';
import { db } from '../../data/firebaseConfig';
import { UserAuth } from '../../store/authContext';

const classes = {
	dashboard: 'flex flex-col lg:grid lg:grid-cols-[224px_minmax(700px,_1fr)] w-full min-h-screen',
	container: 'w-full h-full lg:p-8',
};

const Dashboard = () => {
	const { projectId } = useParams();
	const { user } = UserAuth();

	//TODO: MAKE CUSTOM HOOK FOR THIS

	useEffect(() => {
		const fetchProjects = async () => {
			console.log('xd')
			if (user) {
				const docRef = doc(db, `users/${user.uid}/projects/${projectId}`);
				const docSnap = await getDoc(docRef);
				console.log(docSnap.data())
			}
		};

		fetchProjects();
	}, []);

	return (
		<div className={classes.dashboard}>
			<div className='block lg:hidden'>
				<NavbarMobile />
			</div>
			<div className='hidden lg:block'>
				<NavbarDesktop />
			</div>
			<main className={classes.container}>
				<div className='w-full bg-[#26292c]  h-full rounded-2xl'></div>
			</main>
		</div>
	);
};

export default Dashboard;
