import { collection, collectionGroup, doc, getDoc, getDocs } from 'firebase/firestore';
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
	projectList: 'flex flex-col lg:flex-row gap-5',
};

const ProjectList = () => {
	const { user } = UserAuth();
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchProjects = async () => {
			if (user) {
				let data = [] as Project[];
				setLoading(true);
				const docRef = collection(db, `users/${user.uid}/projects`);
				const docSnap = await getDocs(docRef);
				docSnap.forEach(doc => {
					const item = {
						projectId: doc.id,
						...doc.data(),
					};

					data.push(item as Project);
				});
				if (data) {
					console.log(data);
					setProjects(data);
				}
				setLoading(false);
			}
		};

		fetchProjects();
	}, []);

	const anyProjectMessageContent = (
		<div className='w-full h-auto flex items-center flex-col lg:items-start'>
			<h2 className={classes.messageContent}>It looks like you have not any projects yet</h2>
		</div>
	);

	const projectsContent = (
		<div className={classes.projectListWrapper}>
			<ul className={classes.projectList}>
				{projects.map((projectItem: Project) => (
					<ProjectItem key={projectItem.projectId} name={projectItem.name} />
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
