import { Subtask } from '../types/KanbanTypes';

const calculateProgress = (subtasks: Subtask[]) => {
	const subtasksLength = subtasks.length;
	const completedSubtasksLength = subtasks.filter(({ isCompleted }) => isCompleted).length;
	const percent = (Math.floor((completedSubtasksLength / subtasksLength) * 100)) || 0

	return {
		subtasksLength,
		completedSubtasksLength,
		percent,
	};
};

export { calculateProgress };
