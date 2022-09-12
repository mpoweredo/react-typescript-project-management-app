type ChartItem = {
	name: 'todo' | 'inProgress' | 'done';
	value: number;
	color: string;
    title: string;
};

type ChartData = ChartItem[];

export type { ChartItem, ChartData };
