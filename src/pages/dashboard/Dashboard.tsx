import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import Column from '../../components/kanban/Column';
import NavbarDesktop from '../../components/layout/NavbarDesktop';
import NavbarMobile from '../../components/layout/NavbarMobile';
import useProject from '../../hooks/useProject';
import { Column as ColumnType } from '../../types/KanbanTypes';
import { dragBetweenColumns, dragBetweenRows } from '../../helpers/dragDrop';

const classes = {
	dashboard: 'flex flex-col lg:grid lg:grid-cols-[224px_minmax(700px,_1fr)] w-full min-h-screen',
	container: 'w-full h-full lg:p-8',
	kanbanContent: 'w-full bg-[#1B1D1F] h-full rounded-2xl px-7 py-5',
	kanbanHeader: 'mb-5',
	spinnerContainer: 'w-full h-full flex justify-center items-center',
	errorMessage: 'text-red-400 font-semibold text-center m-2',
	projectName: 'text-indigo-400 text-3xl font-semibold',
	columnsContainer: 'flex gap-5 flex-wrap',
};

const Dashboard = () => {
	const { projectId } = useParams();
	const { project, error, loading, setProject } = useProject(projectId!);

	const handleDragEnd = async (result: DropResult) => {
		if (!result.destination) return;
		const { source, destination } = result;

		if (source.droppableId !== destination.droppableId) {
			const updatedData = dragBetweenColumns(result, project!.kanban);
			setProject(prevState => prevState && { ...prevState, kanban: updatedData });

		} else if (source.droppableId === destination.droppableId) {
			const updatedData = dragBetweenRows(result, project!.kanban);
			setProject(prevState => prevState && { ...prevState, kanban: updatedData });

		}
	};

	return (
		<div className={classes.dashboard}>
			<div className='block lg:hidden'>
				<NavbarMobile />
			</div>
			<div className='hidden lg:block'>
				<NavbarDesktop />
			</div>
			<main className={classes.container}>
				<div className={classes.kanbanContent}>
					<header className={classes.kanbanHeader}>{project && <h3 className={classes.projectName}>/{project.name}</h3>}</header>
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
					<DragDropContext onDragEnd={handleDragEnd}>
						<div className={classes.columnsContainer}>
							{project?.kanban.map((column: ColumnType, index: number) => {
								return <Column key={column.id} id={column.id} title={column.title} index={index} tasks={column.tasks} />;
							})}
						</div>
					</DragDropContext>
				</div>
			</main>
		</div>
	);
};

export default Dashboard;
