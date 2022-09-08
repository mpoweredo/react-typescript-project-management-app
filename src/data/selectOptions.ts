import { Option } from '../types/KanbanTypes';

const priorityOptions: Option[] = [
	{
		value: 'high',
		label: 'High',
		color: '#FB8585',
	},
	{
		value: 'medium',
		label: 'Medium',
		color: '#fbbf24',
	},
	{
		value: 'low',
		label: 'Low',
		color: '#4ade80',
	},
];

const sortOptions: Option[] = [
	{
		value: 'all',
		label: 'All',
		color: '#fff',
	},
	{
		value: 'high',
		label: 'High',
		color: '#FB8585',
	},
	{
		value: 'medium',
		label: 'Medium',
		color: '#fbbf24',
	},
	{
		value: 'low',
		label: 'Low',
		color: '#4ade80',
	},
];

const hourOptions: Option[] = Array.from(
	{
		length: 25,
	},
	(element, index) => ({
		value: index.toString().padStart(2, '0'),
		label: index.toString().padStart(2, '0'),
	})
);
const minuteOptions: Option[] = Array.from(
	{
		length: 61,
	},
	(element, index) => ({
		value: index.toString().padStart(2, '0'),
		label: index.toString().padStart(2, '0'),
	})
);

export { priorityOptions, sortOptions, hourOptions, minuteOptions };
