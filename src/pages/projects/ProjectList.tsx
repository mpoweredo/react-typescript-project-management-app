import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../data/firebaseConfig';
import { UserAuth } from '../../store/authContext';
import { Project } from '../../types/ProjectsType';
import { CircularProgress } from '@mui/material';
import ProjectItem from './ProjectItem';

const classes = {
	container: 'flex flex-col gap-5 items-center lg:items-start',
	createButton: 'w-36 h-11 font-semibold rounded bg-indigo-500 text-slate-900 hover:bg-indigo-600 self-center lg:self-start',
	messageContent: 'text-md text-red-300 text-center mb-8',
	projectListWrapper: 'flex flex-col items-center lg:items-start lg:justify-start w-full gap-8',
};

const ProjectList = () => {
	const { user } = UserAuth();
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchProjects = async () => {
			if (user) {
				setLoading(true);
				const docRef = doc(db, 'users', user.uid);
				const docSnap = await getDoc(docRef);
				const fetchedUserData = await docSnap.data();
				const fetchedProjects = fetchedUserData?.projects as Project[];
				if (fetchedProjects) {
					setProjects(fetchedProjects);
				}
				setLoading(false);
			}
		};

		fetchProjects();
	}, []);

	const anyProjectMessageContent = (
		<div className='w-full h-auto flex items-center flex-col lg:items-start'>
			<h2 className={classes.messageContent}>It looks like you have not any projects yet</h2>
			<button className={classes.createButton}>Create project</button>
		</div>
	);

	const projectsContent = (
		<div className={classes.projectListWrapper}>
			<ul className='flex flex-col lg:flex-row gap-5'>
				{projects.map((projectItem: Project) => (
					<ProjectItem name={projectItem.name} />
				))}
			</ul>
			<button className={classes.createButton}>Create project</button>
		</div>
	);

	return (
		<div className={classes.container}>
			{projects.length === 0 && !loading ? anyProjectMessageContent : projectsContent}
			{loading && (
				<div className='w-full h-screen flex items-center justify-center'>
					<CircularProgress />
				</div>
			)}
		</div>
	);
};

export default ProjectList;
