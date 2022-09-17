import { ChartData } from 'types/ChartTypes';
import { Project } from 'types/KanbanTypes';

const calculateColumnsItems = (project: Project) => {
	const data = project?.kanban.reduce((acc: ChartData, item) => {
		let key = item['type'];

		if (key !== undefined) {
			acc.push({
				title: item.title,
				name: key,
				value: item.tasks.length,
				color: item.color!,
			});
		}

		return acc;
	}, []);
	return data
};

export { calculateColumnsItems };
