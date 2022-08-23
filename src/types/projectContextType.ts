import { NewTaskData, Project } from './KanbanTypes';

type ProjectContextType = {
	project: Project | null;
	error: null | {};
    loading: boolean;
    updateProject: (arg0: Project) => void
    addNewTask: (NewTaskData: NewTaskData) => void
};

export type { ProjectContextType };
