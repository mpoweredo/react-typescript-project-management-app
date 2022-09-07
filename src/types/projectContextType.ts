import { NewTaskData, Project } from './KanbanTypes';

type ProjectContextType = {
	project: Project | null;
	error: null | {};
    loading: boolean;
    updateProject: (arg0: Project) => void
    addNewTask: (NewTaskData: NewTaskData) => void,
    addNewColumn: (arg0: string) => void,
    deleteColumn: (index: number) => void,
    deleteTask: (taskId: string, columnIndex: number) => void
    updateTask: (NewTaskData: NewTaskData) => void,
};

export type { ProjectContextType };
