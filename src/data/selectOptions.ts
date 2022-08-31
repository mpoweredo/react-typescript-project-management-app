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

export { priorityOptions, sortOptions };
