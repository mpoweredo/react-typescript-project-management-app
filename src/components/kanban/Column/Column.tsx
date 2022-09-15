import { Column as ColumnType, Task as TaskType } from '../../../types/KanbanTypes';
import Task from '../Task/Task';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProjectData } from '../../../store/projectContext';

const classes = {
	column: 'w-[260px] h-full bg-[#11111388] rounded-md px-4 py-4 flex flex-col mr-5',
	columnHeaderContainer: 'w-full h-auto bg-[#474DA1] rounded-sm p-3 text-indigo-200 font-semibold flex justify-between items-center',
	deleteColumn: 'bg-indigo-500 hover:bg-indigo-400 p-1 rounded h-full text-indigo-300 hover:text-indigo-200',
	tasksContainer: 'max-h-[370px] lg:max-h-[510px] overflow-y-auto no-scroll',
};

const Column = ({ tasks, index, id, title, filter, type }: ColumnType) => {
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
								{!type && (
									<button onClick={deleteHandler} className={classes.deleteColumn}>
										<DeleteIcon />
									</button>
								)}
							</header>
							<Droppable type='task' droppableId={index.toString()}>
								{provided => (
									<div {...provided.droppableProps} ref={provided.innerRef}>
										<ul className={classes.tasksContainer}>
											<div className='h-1'></div>
											<>
												{/* I had to make the code like this below because when I try to first filter tasks using .filter() then .map() i got */}
												{/* error with drag drop because index changed when filtering array first  */}
												{tasks.map((task: TaskType, index: number) => {
													if (filter === 'all') return <Task columnId={id} key={task.id} taskData={task} index={index} />;
													if (filter === task.priority) return <Task columnId={id} key={task.id} taskData={task} index={index} />;
												})}
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
