import { DropResult } from 'react-beautiful-dnd';
import { Kanban } from 'types/KanbanTypes';

const dragBetweenColumns = ({ source, destination }: DropResult, data: Kanban): Kanban => {
	const sourceDroppableId: number = +source.droppableId;
	const destinationDroppableId: number = +destination!.droppableId;

	const updatedData = [...data]

	const sourceCol = updatedData[sourceDroppableId];
	const destinationCol = updatedData[destinationDroppableId];

	const sourceTask = [...sourceCol.tasks];
	const destinationTask = [...destinationCol.tasks];

	const [removed] = sourceTask.splice(source.index, 1);
	removed && destinationTask.splice(destination!.index, 0, removed);

	updatedData[sourceDroppableId].tasks = sourceTask;
	updatedData[destinationDroppableId].tasks = destinationTask;

	return updatedData;
};

const dragBetweenRows = ({ source, destination }: DropResult, data: Kanban): Kanban => {
	const sourceDroppableId: number = +source.droppableId;
	const updatedData = [...data];

	const tasks = Array.from(updatedData[sourceDroppableId].tasks);

	const toBeMoved = tasks[source.index];

	tasks.splice(source.index, 1);
	tasks.splice(destination!.index, 0, toBeMoved);

	updatedData[sourceDroppableId].tasks = tasks;

	return updatedData
};

const dragColumns = ({ source, destination }: DropResult, data: Kanban): Kanban => {
	const sourceDroppableId: number = +source.index;
	const updatedData = [...data];
	const toBeMoved = updatedData[source.index];

	updatedData.splice(source.index, 1);
	updatedData.splice(destination!.index, 0, toBeMoved);

	return updatedData
}

export { dragBetweenColumns, dragBetweenRows, dragColumns };