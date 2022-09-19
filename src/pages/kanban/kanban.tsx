import { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Column from 'kanban/Column/Column';
import { Column as ColumnType, Option, Project } from 'types/KanbanTypes';
import { dragBetweenColumns, dragBetweenRows, dragColumns } from 'helpers/dragDrop';
import NewTask from 'kanban/Task/NewTask/NewTask';
import { ProjectData } from 'store/projectContext';
import NewColumn from 'kanban/Column/NewColumn/NewColumn';
import CustomSelect from 'UI/CustomSelect';
import { sortOptions } from 'data/selectOptions';
import { filterBySelectStyles } from 'data/selectStyles';
import { PriorityOptions } from 'types/KanbanTypes';

const classes = {
	kanbanHeader: 'mb-5 flex h-auto w-full justify-between',
	spinnerContainer: 'w-full h-full flex justify-center items-center',
	errorMessage: 'text-red-400 font-semibold text-center m-2',
	projectName: 'text-indigo-400 text-3xl font-semibold',
	columnsContainer: 'flex h-full w-full overflow-auto py-2 px-1',
};

const Kanban = () => {
	const { project, updateProject, getUpdatedProject } = ProjectData();
	const [filterBy, setFilterBy] = useState<PriorityOptions | 'all'>('all');

	const handleDragEnd = async (result: DropResult) => {
		if (!result.destination) return;
		const { source, destination } = result;

		if (result.type === 'task') {
			if (source.droppableId !== destination.droppableId) {
				const updatedData = dragBetweenColumns(result, project!.kanban);
				updateProject(getUpdatedProject({ kanban: updatedData }));

				return;
			}

			if (source.droppableId === destination.droppableId) {
				const updatedData = dragBetweenRows(result, project!.kanban);
				updateProject(getUpdatedProject({ kanban: updatedData }));

				return;
			}
		} else {
			const updatedData = dragColumns(result, project!.kanban);
			updateProject(getUpdatedProject({ kanban: updatedData }));

			return;
		}
	};

	return (
		<div className='flex flex-col h-full'>
			<header className={classes.kanbanHeader}>
				{project && <h3 className={classes.projectName}>/{project.name}</h3>}
				<div className='flex gap-2 items-center'>
					{project && (
						<div className='hidden md:block'>
							<CustomSelect
								onChange={(value: Option) => {
									setFilterBy(value.value as PriorityOptions);
								}}
								options={sortOptions}
								passedStyles={filterBySelectStyles}
							/>
						</div>
					)}
					{project && <NewTask project={project} />}
				</div>
			</header>
			<div className='h-full'>
				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable type='column' droppableId='columns' direction='horizontal'>
						{provided => (
							<div {...provided.droppableProps} ref={provided.innerRef} className='h-full'>
								<div className={`${classes.columnsContainer} columns-container`}>
									{project?.kanban.map((column: ColumnType, index: number) => {
										return (
											<Column
												filter={filterBy}
												key={column.id}
												id={column.id}
												title={column.title}
												type={column.type}
												index={index}
												tasks={column.tasks}
											/>
										);
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
	);
};

export default Kanban;
