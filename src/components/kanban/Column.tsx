import { Column as ColumnType, Task as TaskType } from '../../types/KanbanTypes';
import Task from './Task';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProjectData } from '../../store/projectContext';

const classes = {
	column: 'w-[260px] h-full bg-[#11111388] rounded-md px-4 py-4 flex flex-col mr-5',
	columnHeaderContainer: 'w-full h-auto bg-[#474DA1] rounded-sm p-3 text-indigo-200 font-semibold flex justify-between items-center',
	deleteColumn: 'bg-indigo-500 hover:bg-indigo-400 p-1 rounded h-full text-indigo-300 hover:text-indigo-200',
};

const Column = ({ tasks, index, id, title }: ColumnType) => {
	const { deleteColumn } = ProjectData();

	const deleteHandler = () => {
		deleteColumn(index);
	};

	return (
		<div>
			<Draggable draggableId={id} index={index as number}>
				{provided => (
					<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
						<div className={classes.column}>
							<header className={classes.columnHeaderContainer}>
								<h5>{title}</h5>
								<button onClick={deleteHandler} className={classes.deleteColumn}>
									<DeleteIcon />
								</button>
							</header>
							<Droppable type='task' droppableId={index.toString()}>
								{provided => (
									<div {...provided.droppableProps} ref={provided.innerRef}>
										<ul>
											<>
												{tasks.map(
													(task: TaskType, index: number) =>
														task && <Task priority={task.priority} key={task.id} id={task.id} title={task.title} index={index} />
												)}
												{provided.placeholder}
											</>
										</ul>
									</div>
								)}
							</Droppable>
						</div>
					</div>
				)}
			</Draggable>
		</div>
	);
};

export default Column;
