import { Project } from 'types/KanbanTypes';
import { CircularProgress } from '@mui/material';
import ProjectItem from './ProjectItem';

const classes = {
	container: 'flex flex-col gap-5 items-center lg:items-start',
	messageContent: 'text-md text-red-300 text-center mb-8',
	projectListWrapper: 'flex flex-col items-center lg:items-start lg:justify-start w-full gap-8',
	projectList: 'flex flex-col lg:flex-row lg:flex-wrap gap-5',
	noProjectsMessageContainer: 'w-full h-auto flex items-center flex-col lg:items-start',
};

type Props = {
	error: Error | null;
	isLoading: boolean;
	projects: Project[];
	deleteProject: (id: string) => void;
};

const ProjectList = ({ error, isLoading, projects, deleteProject }: Props) => {
	const anyProjectMessageContent = (
		<div className={classes.noProjectsMessageContainer}>
			<h2 className={classes.messageContent}>It looks like you have not any projects yet</h2>
		</div>
	);

	const projectsContent = (
		<div className={classes.projectListWrapper}>
			<ul className={classes.projectList}>
				{error && <p className='text-red-400'>Something went wrong... Try again later!</p>}
				{projects.map((projectItem: Project) => (
					<ProjectItem key={projectItem.projectId} id={projectItem.projectId!} name={projectItem.name} deleteProject={deleteProject} />
				))}
			</ul>
		</div>
	);

	return (
		<div className={classes.container}>
			{projects.length === 0 && !isLoading ? anyProjectMessageContent : projectsContent}
			{isLoading && !error && (
				<div className='w-full h-full flex items-center justify-center'>
					<CircularProgress />
				</div>
			)}
		</div>
	);
};

export default ProjectList;
