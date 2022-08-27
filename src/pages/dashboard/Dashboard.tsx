import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { CircularProgress } from '@mui/material';
import Column from '../../components/kanban/Column';
import NavbarDesktop from '../../components/layout/NavbarDesktop';
import NavbarMobile from '../../components/layout/NavbarMobile';
import { Column as ColumnType, Project } from '../../types/KanbanTypes';
import { dragBetweenColumns, dragBetweenRows, dragColumns } from '../../helpers/dragDrop';
import NewTask from '../../components/kanban/NewTask/NewTask';
import { ProjectData } from '../../store/projectContext';
import NewColumn from '../../components/kanban/NewColumn/NewColumn';

const classes = {
	dashboard: 'lg:grid lg:grid-cols-[224px_minmax(700px,_1fr)] w-full lg:min-h-screen',
	container: 'w-full h-full lg:p-8',
	kanbanContent: 'flex flex-col w-full h-full bg-[#1B1D1F] lg:rounded-2xl px-7 py-5',
	kanbanHeader: 'mb-5 flex h-auto w-full justify-between',
	spinnerContainer: 'w-full h-full flex justify-center items-center',
	errorMessage: 'text-red-400 font-semibold text-center m-2',
	projectName: 'text-indigo-400 text-3xl font-semibold',
	columnsContainer: 'flex h-full w-full overflow-auto py-2 px-1',
};

const Dashboard = () => {
	const { project, updateProject, loading, error } = ProjectData();

	const handleDragEnd = async (result: DropResult) => {
		if (!result.destination) return;
		const { source, destination } = result;

		if (result.type === 'task') {
			if (source.droppableId !== destination.droppableId) {
				const updatedData = dragBetweenColumns(result, project!.kanban);
				const newData = {
					...project,
					kanban: updatedData,
				} as Project;

				updateProject(newData);
				return;
			}

			if (source.droppableId === destination.droppableId) {
				const updatedData = dragBetweenRows(result, project!.kanban);
				const newData = {
					...project,
					kanban: updatedData,
				} as Project;

				updateProject(newData);
				return;
			}
		} else {
			const updatedData = dragColumns(result, project!.kanban);

			const newData = {
				...project,
				kanban: updatedData,
			} as Project;

			updateProject(newData);
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
					<header className={classes.kanbanHeader}>
						{project && <h3 className={classes.projectName}>/{project.name}</h3>}
						{project && <NewTask project={project} />}
					</header>
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
					<div className='h-full'>
						<DragDropContext onDragEnd={handleDragEnd}>
							<Droppable type='column' droppableId='columns' direction='horizontal'>
								{provided => (
									<div {...provided.droppableProps} ref={provided.innerRef} className='h-full'>
										<div className={`${classes.columnsContainer} columns-container`}>
											{project?.kanban.map((column: ColumnType, index: number) => {
												return <Column key={column.id} id={column.id} title={column.title} index={index} tasks={column.tasks} />;
											})}
											{provided.placeholder}
											<NewColumn />
										</div>
									</div>
								)}
							</Droppable>
						</DragDropContext>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Dashboard;
