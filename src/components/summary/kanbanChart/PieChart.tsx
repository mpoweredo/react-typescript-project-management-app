import { useState, useEffect, useCallback } from 'react';
import { PieChart as Chart, Pie, Cell, Sector } from 'recharts';
import { calculateColumnsItems } from '../../../helpers/calculateColumnItems';
import { ProjectData } from '../../../store/projectContext';
import { ChartData } from '../../../types/ChartTypes';
import ColumnListData from './ColumnListData';

const classes = {
	chartDataContainer: 'w-full flex gap-10 flex-col xs:flex-row items-center',
};

const PieChart = () => {
	const [chartData, setChartData] = useState<ChartData>([]);
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const { project } = ProjectData();

	useEffect(() => {
		if (project) {
			const data = calculateColumnsItems(project);
			setChartData(data);
		}
	}, [project]);

	const onPieEnter = useCallback((_: any, index: number) => setActiveIndex(index), [setActiveIndex]);

	const renderActiveShape = ({ cx, cy, fill, percent, innerRadius, outerRadius, startAngle, endAngle }: any) => {
		const completePercent = percent * 100;

		return (
			<g>
				<text
					className={`font-extrabold text-xl`}
					style={{ textShadow: `${fill} 0px 0px 18px` }}
					x={cx}
					y={cy}
					dy={8}
					textAnchor='middle'
					fill={fill}>
					{completePercent.toFixed()}%
				</text>
				<Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
			</g>
		);
	};

	return (
		<div className={classes.chartDataContainer}>
			<div>
				<Chart width={160} height={160}>
					<Pie
						isAnimationActive={false}
						activeIndex={activeIndex}
						activeShape={renderActiveShape}
						stroke='none'
						data={chartData}
						innerRadius={40}
						outerRadius={80}
						fill='#8884d8'
						dataKey='value'
						onMouseEnter={onPieEnter}>
						{chartData.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>
				</Chart>
			</div>
			<div className='flex w-full'>{<ColumnListData chartData={chartData} />}</div>
		</div>
	);
};

export default PieChart;
