import { ChartData } from '../../../types/ChartTypes';

type Props = {
	chartData: ChartData;
};

const classes = {
	kanbanColumnsList: 'w-full flex flex-col gap-5',
	itemTitle: 'text-gray-50 font-semibold text-lg',
	itemValue: 'text-indigo-300 font-semibold text-lg',
	itemDataContainer: 'flex items-center justify-between w-full',
};

const ColumnListData = ({ chartData }: Props) => {
	return (
		<ul className={classes.kanbanColumnsList}>
			{chartData.map((item, index) => (
				<li key={`item-${index}`} className='flex gap-3 items-center w-full'>
					<div className='w-5 h-5 rounded-sm' style={{ backgroundColor: item.color }}></div>
					<div className={classes.itemDataContainer}>
						<p className={classes.itemTitle}>{item.title}</p>
						<p className={classes.itemValue}>{item.value}</p>
					</div>
				</li>
			))}
		</ul>
	);
};

export default ColumnListData;
